import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { WebSocketService } from '../../services/websocket.service';
import { Card, PlayerZone, GamePhase } from '../../models/game.model';

@Component({
  selector: 'app-game-board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-board.component.html',
  styleUrl: './game-board.component.scss'
})
export class GameBoardComponent implements OnInit {
  wsService = inject(WebSocketService);
  router = inject(Router);
  
  // Current game state
  roomCode = signal('');
  currentPhase = signal<GamePhase>('GROUPING');
  currentTurn = signal(1);
  isMyTurn = signal(true);
  
  // Player's zone (bottom)
  myHand = signal<Card[]>([]);
  myDefenseLine = signal<Card[]>([]);     // Línea de Defensa
  myAttackLine = signal<Card[]>([]);      // Línea de Ataque
  mySupportLine = signal<Card[]>([]);     // Línea de Apoyo (Tótems, Armas)
  myGoldReserve = signal<Card[]>([]);     // Reserva de Oro
  myGoldPaid = signal<Card[]>([]);       // Oro Pagado
  myDeck = signal<Card[]>([]);            // Castillo (Mazo)
  myGraveyard = signal<Card[]>([]);        // Cementerio
  myBanished = signal<Card[]>([]);        // Destierro
  
  // Opponent's zone (top) - limited visibility
  opponentHand = signal<Card[]>([]);
  opponentDefenseLine = signal<Card[]>([]);
  opponentAttackLine = signal<Card[]>([]);
  opponentSupportLine = signal<Card[]>([]);
  opponentDeckCount = signal(0);
  opponentGraveyardCount = signal(0);
  opponentGoldReserve = signal<Card[]>([]);
  opponentGoldPaid = signal<Card[]>([]);
  
  // Player names
  myName = signal('Tú');
  opponentName = signal('Oponente');
  
  ngOnInit() {
    const room = this.wsService.currentRoom();
    if (room) {
      this.roomCode.set(room.roomCode);
    }
    
    // Initialize with starter deck as demo
    this.initializeDemoState();
  }
  
  initializeDemoState() {
    // Demo state - simulate game in progress
    this.currentPhase.set('VIGILANCE');
    
    // My gold (start with some)
    this.myGoldReserve.set([
      { id: 'ORO-001', name: 'Oro', type: 'Oro', cost: 0, race: 'Ninguna', ability: '', edition: 'PBX' },
      { id: 'ORO-002', name: 'Oro', type: 'Oro', cost: 0, race: 'Ninguna', ability: '', edition: 'PBX' },
      { id: 'ORO-003', name: 'Oro', type: 'Oro', cost: 0, race: 'Ninguna', ability: '', edition: 'PBX' },
    ]);
    
    // My hand
    this.myHand.set([
      { id: 'ALI-001', name: 'Guerrero Novato', type: 'Aliado', cost: 1, strength: 1, race: 'Humano', ability: '', edition: 'PBX' },
      { id: 'ALI-002', name: 'Elfo Arquero', type: 'Aliado', cost: 2, strength: 2, race: 'Elfo', ability: '', edition: 'PBX' },
      { id: 'TAL-001', name: 'Flecha Arcana', type: 'Talisman', cost: 1, race: 'Ninguna', ability: '', edition: 'PBX' },
      { id: 'ORO-004', name: 'Oro', type: 'Oro', cost: 0, race: 'Ninguna', ability: '', edition: 'PBX' },
      { id: 'ALI-003', name: 'Caballero de la Luz', type: 'Aliado', cost: 3, strength: 3, race: 'Humano', ability: 'Protección', edition: 'PBX' },
    ]);
    
    // My defense line
    this.myDefenseLine.set([
      { id: 'ALI-004', name: 'Dragón Menor', type: 'Aliado', cost: 4, strength: 4, race: 'Dragón', ability: '', edition: 'PBX' },
    ]);
    
    // My deck (castle) - show card count
    this.myDeck.set(new Array(40).fill(null).map((_, i) => ({ 
      id: `DECK-${i}`, name: 'Carta', type: 'Oro' as any, cost: 0, race: '', ability: '', edition: '' 
    })));
    
    // Opponent's visible cards (back of cards)
    this.opponentDefenseLine.set([
      { id: 'OPP-1', name: '?', type: 'Aliado' as any, cost: 0, race: '', ability: '', edition: '' },
      { id: 'OPP-2', name: '?', type: 'Aliado' as any, cost: 0, race: '', ability: '', edition: '' },
    ]);
    
    this.opponentDeckCount.set(42);
  }
  
  // Get phase display name
  getPhaseName(phase: GamePhase): string {
    const phaseNames: Record<GamePhase, string> = {
      'GROUPING': 'Agrupación',
      'VIGILANCE': 'Vigilia',
      'ATTACK_DECLARATION': 'Declarar Ataque',
      'BLOCK_DECLARATION': 'Declarar Bloqueo',
      'TALISMAN_WAR': 'Guerra de Talismanes',
      'DAMAGE_ASSIGNMENT': 'Asignar Daño',
      'FINAL': 'Final',
      'DRAW': 'Robar'
    };
    return phaseNames[phase];
  }
  
  // Get card type icon
  getTypeIcon(type: string): string {
    const icons: Record<string, string> = {
      'Aliado': '👤',
      'Oro': '💰',
      'Talisman': '✨',
      'Totem': '🏛️',
      'Arma': '⚔️'
    };
    return icons[type] || '🃏';
  }
  
  // Get card type class
  getTypeClass(type: string): string {
    return `type-${type.toLowerCase()}`;
  }
  
  selectCard(card: Card): void {
    // TODO: Implement card selection for actions
    console.log('Selected card:', card.name);
  }
  
  playCard(card: Card): void {
    // TODO: Implement playing a card from hand
    console.log('Playing card:', card.name);
  }
  
  endTurn(): void {
    // TODO: Send end turn action via WebSocket
  }
  
  backToRoom(): void {
    this.router.navigate(['/room']);
  }

  drawCard(): void {
    // TODO: Implement drawing a card from deck
    console.log('Drawing card from deck');
  }
}