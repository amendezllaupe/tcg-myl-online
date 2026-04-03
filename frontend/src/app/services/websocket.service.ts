import { Injectable, signal } from '@angular/core';
import { Client, IPublishParams, IMessage } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

export interface GameRoom {
  roomId: string;
  roomCode: string;
  hostPlayerName: string;
  guestPlayerName?: string;
  status: 'WAITING' | 'READY' | 'IN_GAME' | 'FINISHED';
}

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private client: Client | null = null;
  private currentClientId: string = '';
  private connected = signal(false);
  
  // Track what action we initiated (create or join)
  private initiatedAction: 'create' | 'join' | null = null;
  
  // Current room info
  private _currentRoom = signal<GameRoom | null>(null);
  private _playerId = signal<string>('');
  private _isHost = signal<boolean | null>(null);
  
  readonly isConnected = this.connected.asReadonly();
  readonly currentRoom = this._currentRoom.asReadonly();
  readonly playerId = this._playerId.asReadonly();
  readonly isHost = this._isHost.asReadonly();
  
  // Callbacks
  private onRoomCreated: ((room: GameRoom) => void) | null = null;
  private onRoomJoined: ((room: GameRoom) => void) | null = null;
  private onRoomError: ((error: string) => void) | null = null;
  private onGameStarted: (() => void) | null = null;

  connect(callbacks?: {
    onRoomCreated?: (room: GameRoom) => void;
    onRoomJoined?: (room: GameRoom) => void;
    onRoomError?: (error: string) => void;
    onGameStarted?: () => void;
  }): Promise<void> {
    return new Promise((resolve, reject) => {
      // Always create a new connection with a new client ID
      if (this.client) {
        this.client.deactivate();
        this.client = null;
      }
      
      // Generate a unique session ID for this specific connection
      this.currentClientId = 'session_' + Math.random().toString(36).substring(2, 15) + '_' + Date.now();
      this.initiatedAction = null;
      
      if (callbacks) {
        this.onRoomCreated = callbacks.onRoomCreated || null;
        this.onRoomJoined = callbacks.onRoomJoined || null;
        this.onRoomError = callbacks.onRoomError || null;
        this.onGameStarted = callbacks.onGameStarted || null;
      }
      
      this.client = new Client({
        webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
        connectHeaders: {
          'client-id': this.currentClientId
        },
        onConnect: () => {
          this.connected.set(true);
          this.setupSubscriptions();
          resolve();
        },
        onDisconnect: () => {
          this.connected.set(false);
        },
        onStompError: (frame) => {
          console.error('STOMP error:', frame);
          const errorMessage = frame.headers ? frame.headers['message'] : 'STOMP error';
          reject(new Error(errorMessage || 'STOMP error'));
        }
      });
      
      this.client.activate();
    });
  }
  
  private setupSubscriptions(): void {
    if (!this.client) return;
    
    // Room created response - only for the sender (personal queue)
    this.client.subscribe('/user/queue/room/created', (message: IMessage) => {
      const body = JSON.parse(message.body) as { roomId: string; roomCode: string; hostPlayerName: string; status: string };
      const room: GameRoom = {
        roomId: body.roomId,
        roomCode: body.roomCode,
        hostPlayerName: body.hostPlayerName,
        status: body.status as GameRoom['status']
      };
      this._currentRoom.set(room);
      // WE are the host because we called createRoom()
      this._isHost.set(true);
      this.onRoomCreated?.(room);
    });
    
    // Room joined / player joined - broadcast from topic (both host and guest receive it)
    this.client.subscribe('/topic/room/joined', (message: IMessage) => {
      const body = JSON.parse(message.body) as { 
        error?: string; 
        roomId: string; 
        roomCode: string; 
        hostPlayerName: string; 
        guestPlayerName: string; 
        status: string;
      };
      if (body.error) {
        this.onRoomError?.(body.error);
      } else {
        const room: GameRoom = {
          roomId: body.roomId,
          roomCode: body.roomCode,
          hostPlayerName: body.hostPlayerName,
          guestPlayerName: body.guestPlayerName,
          status: body.status as GameRoom['status']
        };
        this._currentRoom.set(room);
        
        // If we initiated 'create', we ARE the host - we're just being notified someone joined
        // If we initiated 'join', we are NOT the host
        if (this.initiatedAction === 'create') {
          this._isHost.set(true);
        } else {
          this._isHost.set(false);
        }
        
        this.onRoomJoined?.(room);
      }
    });
    
    // Game started - broadcast to all in room
    this.client.subscribe('/topic/room/started', (message: IMessage) => {
      const room = this._currentRoom();
      if (room) {
        this._currentRoom.set({ ...room, status: 'IN_GAME' });
        this.onGameStarted?.();
      }
    });
  }
  
  private publish(destination: string, body: object): void {
    if (this.client?.connected) {
      const params: IPublishParams = {
        destination,
        body: JSON.stringify(body)
      };
      this.client.publish(params);
    }
  }
  
  createRoom(playerName: string): void {
    // Mark that we initiated create - we are the host
    this.initiatedAction = 'create';
    this.publish('/app/room/create', { 
      playerName,
      clientId: this.currentClientId 
    });
  }
  
  joinRoom(roomCode: string, playerName: string): void {
    // Mark that we initiated join - we are NOT the host
    this.initiatedAction = 'join';
    this.publish('/app/room/join', { 
      roomCode, 
      playerName,
      clientId: this.currentClientId 
    });
  }
  
  startGame(): void {
    this.publish('/app/room/start', {});
  }
  
  disconnect(): void {
    if (this.client) {
      this.client.deactivate();
      this.client = null;
    }
    this.connected.set(false);
    this._currentRoom.set(null);
    this._isHost.set(null);
  }
}