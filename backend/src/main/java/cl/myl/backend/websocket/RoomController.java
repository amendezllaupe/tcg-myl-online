package cl.myl.backend.websocket;

import cl.myl.backend.model.GameRoom;
import cl.myl.backend.service.RoomService;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.stereotype.Controller;

import java.util.Map;
import java.util.UUID;

/**
 * WebSocket controller for room operations
 */
@Controller
public class RoomController {

    private final RoomService roomService;

    public RoomController(RoomService roomService) {
        this.roomService = roomService;
    }

    /**
     * Create a new room - reply only to the sender
     */
    @MessageMapping("/room/create")
    @SendToUser("/queue/room/created")
    public Map<String, Object> createRoom(@Payload Map<String, String> message, SimpMessageHeaderAccessor headerAccessor) {
        String playerName = message.getOrDefault("playerName", "Player");
        String clientId = message.getOrDefault("clientId", headerAccessor.getSessionId());
        
        GameRoom room = roomService.createRoom(clientId, playerName);
        
        // Store room ID in session
        headerAccessor.getSessionAttributes().put("roomId", room.getRoomId());
        headerAccessor.getSessionAttributes().put("clientId", clientId);
        headerAccessor.getSessionAttributes().put("isHost", true);
        
        return Map.of(
            "roomId", room.getRoomId(),
            "roomCode", room.getRoomCode(),
            "hostPlayerName", room.getHostPlayerName(),
            "status", room.getStatus().name(),
            "isHost", true
        );
    }

    /**
     * Join an existing room - reply to both sender and notify host
     */
    @MessageMapping("/room/join")
    @SendTo("/topic/room/joined")
    public Map<String, Object> joinRoom(@Payload Map<String, String> message, SimpMessageHeaderAccessor headerAccessor) {
        String roomCode = message.get("roomCode");
        String playerName = message.getOrDefault("playerName", "Player");
        String clientId = message.getOrDefault("clientId", headerAccessor.getSessionId());
        
        GameRoom room = roomService.joinRoom(roomCode, clientId, playerName);
        
        if (room == null) {
            return Map.of("error", "Room not found or full");
        }
        
        // Store in session
        headerAccessor.getSessionAttributes().put("roomId", room.getRoomId());
        headerAccessor.getSessionAttributes().put("clientId", clientId);
        headerAccessor.getSessionAttributes().put("isHost", false);
        
        // Send to ALL subscribers (both host and guest) - the guest knows they're not host
        return Map.of(
            "roomId", room.getRoomId(),
            "roomCode", room.getRoomCode(),
            "hostPlayerName", room.getHostPlayerName(),
            "guestPlayerName", room.getGuestPlayerName(),
            "status", room.getStatus().name(),
            "isHost", false
        );
    }

    /**
     * Get current room status
     */
    @MessageMapping("/room/status")
    @SendTo("/topic/room/status")
    public Map<String, Object> getRoomStatus(@Payload Map<String, String> message) {
        String roomId = message.get("roomId");
        GameRoom room = roomService.getRoom(roomId);
        
        if (room == null) {
            return Map.of("error", "Room not found");
        }
        
        return Map.of(
            "roomId", room.getRoomId(),
            "roomCode", room.getRoomCode(),
            "hostPlayerName", room.getHostPlayerName(),
            "guestPlayerName", room.getGuestPlayerName() != null ? room.getGuestPlayerName() : "",
            "status", room.getStatus().name()
        );
    }

    /**
     * Start the game
     */
    @MessageMapping("/room/start")
    @SendTo("/topic/room/started")
    public Map<String, Object> startGame(@Payload Map<String, String> message, SimpMessageHeaderAccessor headerAccessor) {
        String roomId = (String) headerAccessor.getSessionAttributes().get("roomId");
        GameRoom room = roomService.getRoom(roomId);
        
        if (room == null) {
            return Map.of("error", "Room not found");
        }
        
        Boolean isHost = (Boolean) headerAccessor.getSessionAttributes().get("isHost");
        if (!Boolean.TRUE.equals(isHost)) {
            return Map.of("error", "Only host can start the game");
        }
        
        if (room.getStatus() != GameRoom.RoomStatus.READY) {
            return Map.of("error", "Room not ready");
        }
        
        room.setStatus(GameRoom.RoomStatus.IN_GAME);
        
        return Map.of(
            "roomId", room.getRoomId(),
            "status", "IN_GAME",
            "message", "Game started!"
        );
    }

    private String getOrCreatePlayerId(SimpMessageHeaderAccessor headerAccessor) {
        String playerId = (String) headerAccessor.getSessionAttributes().get("playerId");
        if (playerId == null) {
            playerId = UUID.randomUUID().toString();
            headerAccessor.getSessionAttributes().put("playerId", playerId);
        }
        return playerId;
    }
}