package cl.myl.backend.service;

import cl.myl.backend.model.GameRoom;
import org.springframework.stereotype.Service;

import java.util.concurrent.ConcurrentHashMap;
import java.util.Map;

/**
 * Manages game rooms
 */
@Service
public class RoomService {

    private final Map<String, GameRoom> rooms = new ConcurrentHashMap<>();
    private final Map<String, GameRoom> roomsByCode = new ConcurrentHashMap<>();

    /**
     * Create a new room
     */
    public GameRoom createRoom(String playerId, String playerName) {
        GameRoom room = new GameRoom();
        room.setHostPlayerId(playerId);
        room.setHostPlayerName(playerName);
        
        rooms.put(room.getRoomId(), room);
        roomsByCode.put(room.getRoomCode(), room);
        
        return room;
    }

    /**
     * Join an existing room by code
     */
    public GameRoom joinRoom(String roomCode, String playerId, String playerName) {
        GameRoom room = roomsByCode.get(roomCode.toUpperCase());
        
        if (room == null) {
            return null;
        }
        
        if (room.getGuestPlayerId() != null) {
            // Room already has a guest
            return null;
        }
        
        room.setGuestPlayerId(playerId);
        room.setGuestPlayerName(playerName);
        room.setStatus(GameRoom.RoomStatus.READY);
        
        return room;
    }

    /**
     * Get room by ID
     */
    public GameRoom getRoom(String roomId) {
        return rooms.get(roomId);
    }

    /**
     * Get room by code
     */
    public GameRoom getRoomByCode(String roomCode) {
        return roomsByCode.get(roomCode.toUpperCase());
    }

    /**
     * Check if room is ready
     */
    public boolean isRoomReady(String roomId) {
        GameRoom room = rooms.get(roomId);
        return room != null && room.getStatus() == GameRoom.RoomStatus.READY;
    }

    /**
     * Remove a room
     */
    public void removeRoom(String roomId) {
        GameRoom room = rooms.remove(roomId);
        if (room != null) {
            roomsByCode.remove(room.getRoomCode());
        }
    }
}