import { Injectable, signal, computed } from '@angular/core';
import { Card, Deck } from '../models/game.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class DeckService {
  // Signal for saved decks
  private _decks = signal<Deck[]>([]);
  
  // Current deck being edited
  private _currentDeck = signal<Deck | null>(null);
  
  readonly decks = this._decks.asReadonly();
  readonly currentDeck = this._currentDeck.asReadonly();
  
  readonly currentDeckCards = computed(() => this._currentDeck()?.cards ?? []);
  readonly currentDeckSize = computed(() => this._currentDeck()?.cards.length ?? 0);
  
  // Create a new empty deck
  createNewDeck(name: string): Deck {
    const deck: Deck = {
      id: uuidv4(),
      name,
      cards: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this._currentDeck.set(deck);
    return deck;
  }
  
  // Load existing deck for editing
  loadDeck(deck: Deck): void {
    this._currentDeck.set({ ...deck, cards: [...deck.cards] });
  }
  
  // Add card to current deck
  addCard(card: Card): void {
    const deck = this._currentDeck();
    if (!deck) return;
    
    const updatedCards = [...deck.cards, card];
    this._currentDeck.set({
      ...deck,
      cards: updatedCards,
      updatedAt: new Date()
    });
  }
  
  // Remove card from current deck
  removeCard(index: number): void {
    const deck = this._currentDeck();
    if (!deck) return;
    
    const updatedCards = deck.cards.filter((_, i) => i !== index);
    this._currentDeck.set({
      ...deck,
      cards: updatedCards,
      updatedAt: new Date()
    });
  }
  
  // Save current deck
  saveDeck(): void {
    const deck = this._currentDeck();
    if (!deck) return;
    
    this._decks.update(decks => {
      const existingIndex = decks.findIndex(d => d.id === deck.id);
      if (existingIndex >= 0) {
        const updatedDecks = [...decks];
        updatedDecks[existingIndex] = { ...deck, updatedAt: new Date() };
        return updatedDecks;
      }
      return [...decks, { ...deck, updatedAt: new Date() }];
    });
  }
  
  // Delete deck
  deleteDeck(deckId: string): void {
    this._decks.update(decks => decks.filter(d => d.id !== deckId));
    if (this._currentDeck()?.id === deckId) {
      this._currentDeck.set(null);
    }
  }
  
  // Clear current deck
  clearCurrentDeck(): void {
    this._currentDeck.set(null);
  }
  
  // Get deck by ID
  getDeckById(id: string): Deck | undefined {
    return this._decks().find(d => d.id === id);
  }
  
  // Load starter deck
  loadStarterDeck(cards: Card[]): void {
    const deck: Deck = {
      id: uuidv4(),
      name: 'Mazo Inicial',
      cards: [...cards],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this._currentDeck.set(deck);
  }
}