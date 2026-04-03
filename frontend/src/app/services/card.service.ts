import { Injectable, signal, computed } from '@angular/core';
import { Card, CardType } from '../models/game.model';
import { INITIAL_CARDS, getStarterDeck } from '../../assets/data/cards';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  // Signal for all available cards
  private _cards = signal<Card[]>(INITIAL_CARDS);
  
  // Computed signals for filtering
  readonly cards = this._cards.asReadonly();
  
  readonly allies = computed(() => this._cards().filter(c => c.type === 'Aliado'));
  readonly talismans = computed(() => this._cards().filter(c => c.type === 'Talisman'));
  readonly totems = computed(() => this._cards().filter(c => c.type === 'Totem'));
  readonly armas = computed(() => this._cards().filter(c => c.type === 'Arma'));
  readonly Golds = computed(() => this._cards().filter(c => c.type === 'Oro'));
  
  getCardById(id: string): Card | undefined {
    return this._cards().find(c => c.id === id);
  }
  
  getCardsByType(type: CardType): Card[] {
    return this._cards().filter(c => c.type === type);
  }
  
  getCardsByRace(race: string): Card[] {
    return this._cards().filter(c => c.race === race);
  }
  
  getStarterDeck(): Card[] {
    return getStarterDeck();
  }
  
  // Add new card (for future expansions)
  addCard(card: Card): void {
    this._cards.update(cards => [...cards, card]);
  }
  
  // Get all unique races
  getRaces(): string[] {
    const races = new Set(this._cards().map(c => c.race));
    return Array.from(races);
  }
}