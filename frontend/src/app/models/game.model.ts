/**
 * Card Model - MyL Online
 * Represents a card in Mitos y Leyendas TCG
 */
export interface Card {
  id: string;
  name: string;
  type: CardType;
  cost: number;
  strength?: number;
  race: string;
  ability: string;
  edition: string;
  imageUrl?: string;
}

export type CardType = 'Aliado' | 'Totem' | 'Talisman' | 'Arma' | 'Oro';

/**
 * Deck Model
 * Represents a player's deck
 */
export interface Deck {
  id: string;
  name: string;
  cards: Card[];
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Player Zone Models
 * Represent the different zones in the game
 */
export interface PlayerZone {
  hand: Card[];
  defenseLine: Card[];    // Línea de Defensa
  attackLine: Card[];     // Línea de Ataque
  goldReserve: Card[];    // Reserva de Oro
  goldPaid: Card[];       // Oro Pagado
  deck: Card[];           // Castillo (Mazo)
  graveyard: Card[];      // Cementerio
  banished: Card[];       // Destierro
}

/**
 * Game State
 * Full state of the game at any moment
 */
export interface GameState {
  gameId: string;
  turn: number;
  activePlayer: string;
  phase: GamePhase;
  player1: PlayerState;
  player2: PlayerState;
}

export interface PlayerState {
  playerId: string;
  name: string;
  zone: PlayerZone;
  health: number;  // Represented by remaining cards in deck
  isActive: boolean;
}

export type GamePhase = 
  | 'GROUPING'     // Fase de Agrupación
  | 'VIGILANCE'    // Fase de Vigilia
  | 'ATTACK_DECLARATION'  // Declaración de Ataque
  | 'BLOCK_DECLARATION'  // Declaración de Bloqueo
  | 'TALISMAN_WAR'       // Guerra de Talismanes
  | 'DAMAGE_ASSIGNMENT'  // Asignación de Daño
  | 'FINAL'         // Fase Final
  | 'DRAW';         // Fase de Robar

/**
 * Game Action
 * Represents an action a player can take
 */
export interface GameAction {
  type: ActionType;
  playerId: string;
  payload?: any;
  timestamp: number;
}

export type ActionType = 
  | 'PLAY_CARD'
  | 'ATTACK'
  | 'BLOCK'
  | 'PASS'
  | 'END_PHASE'
  | 'USE_ABILITY';