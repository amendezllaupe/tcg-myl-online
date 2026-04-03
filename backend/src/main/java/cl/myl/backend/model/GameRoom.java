package cl.myl.backend.model;

import java.util.UUID;

/**
 * Represents a game room
 */
public class GameRoom {
    private String roomId;
    private String roomCode;
    private String hostPlayerId;
    private String hostPlayerName;
    private String guestPlayerId;
    private String guestPlayerName;
    private RoomStatus status;
    private long createdAt;

    public enum RoomStatus {
        WAITING,      // Waiting for second player
        READY,        // Both players connected, ready to start
        IN_GAME,      // Game in progress
        FINISHED      // Game completed
    }

    public GameRoom() {
        this.roomId = UUID.randomUUID().toString();
        this.roomCode = generateRoomCode();
        this.status = RoomStatus.WAITING;
        this.createdAt = System.currentTimeMillis();
    }

    private String generateRoomCode() {
        // Generate 6-character alphanumeric code
        return UUID.randomUUID().toString().substring(0, 6).toUpperCase();
    }

    // Getters and Setters
    public String getRoomId() { return roomId; }
    public void setRoomId(String roomId) { this.roomId = roomId; }

    public String getRoomCode() { return roomCode; }
    public void setRoomCode(String roomCode) { this.roomCode = roomCode; }

    public String getHostPlayerId() { return hostPlayerId; }
    public void setHostPlayerId(String hostPlayerId) { this.hostPlayerId = hostPlayerId; }

    public String getHostPlayerName() { return hostPlayerName; }
    public void setHostPlayerName(String hostPlayerName) { this.hostPlayerName = hostPlayerName; }

    public String getGuestPlayerId() { return guestPlayerId; }
    public void setGuestPlayerId(String guestPlayerId) { this.guestPlayerId = guestPlayerId; }

    public String getGuestPlayerName() { return guestPlayerName; }
    public void setGuestPlayerName(String guestPlayerName) { this.guestPlayerName = guestPlayerName; }

    public RoomStatus getStatus() { return status; }
    public void setStatus(RoomStatus status) { this.status = status; }

    public long getCreatedAt() { return createdAt; }
    public void setCreatedAt(long createdAt) { this.createdAt = createdAt; }
}