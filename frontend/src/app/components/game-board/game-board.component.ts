import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { WebSocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-game-board',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="game-board">
      <h1>Tablero de Juego</h1>
      <p>La partida está por comenzar...</p>
      
      <div class="room-info">
        <p>Sala: {{ roomCode }}</p>
      </div>
      
      <button (click)="backToRoom()">Volver a la Sala</button>
    </div>
  `,
  styles: [`
    .game-board {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      background: #1a1a2e;
      color: #fff;
      
      h1 { color: #e94560; }
      
      button {
        margin-top: 2rem;
        padding: 1rem 2rem;
        background: #e94560;
        color: white;
        border: none;
        border-radius: 8px;
        cursor: pointer;
      }
    }
  `]
})
export class GameBoardComponent implements OnInit {
  wsService = inject(WebSocketService);
  router = inject(Router);
  
  roomCode = '';
  
  ngOnInit() {
    const room = this.wsService.currentRoom();
    if (room) {
      this.roomCode = room.roomCode;
    }
  }
  
  backToRoom(): void {
    this.router.navigate(['/room']);
  }
}