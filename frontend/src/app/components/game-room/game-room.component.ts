import { Component, inject, signal, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { WebSocketService } from '../../services/websocket.service';
import { DeckService } from '../../services/deck.service';

@Component({
  selector: 'app-game-room',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './game-room.component.html',
  styleUrl: './game-room.component.scss'
})
export class GameRoomComponent implements OnInit, OnDestroy {
  wsService = inject(WebSocketService);
  deckService = inject(DeckService);
  router = inject(Router);
  
  // Player name
  playerName = signal('Jugador');
  
  // Room code to join
  joinCode = signal('');
  
  // View state
  view = signal<'home' | 'waiting' | 'lobby' | 'error'>('home');
  
  // Error message
  errorMessage = signal('');
  
  // Current room from websocket
  currentRoom = this.wsService.currentRoom;
  isConnected = this.wsService.isConnected;
  isHost = this.wsService.isHost;
  
  async ngOnInit() {
    try {
      await this.wsService.connect({
        onRoomCreated: (room) => {
          this.view.set('waiting');
        },
        onRoomJoined: (room) => {
          this.view.set('lobby');
        },
        onRoomError: (error) => {
          this.errorMessage.set(error);
          this.view.set('error');
        },
        onGameStarted: () => {
          this.router.navigate(['/game']);
        }
      });
    } catch (error) {
      this.errorMessage.set('No se pudo conectar al servidor');
      this.view.set('error');
    }
  }
  
  ngOnDestroy() {
    this.wsService.disconnect();
  }
  
  // Create new room
  createRoom(): void {
    if (!this.playerName()) return;
    this.wsService.createRoom(this.playerName());
  }
  
  // Join existing room
  joinRoom(): void {
    if (!this.joinCode() || !this.playerName()) return;
    this.wsService.joinRoom(this.joinCode(), this.playerName());
  }
  
  // Start game (host only)
  startGame(): void {
    this.wsService.startGame();
  }
  
  // Leave room
  leaveRoom(): void {
    this.wsService.disconnect();
    this.view.set('home');
  }
  
  // Retry connection
  retry(): void {
    this.view.set('home');
    this.ngOnInit();
  }
}