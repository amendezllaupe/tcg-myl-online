import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardService } from '../../services/card.service';
import { DeckService } from '../../services/deck.service';
import { Card } from '../../models/game.model';

@Component({
  selector: 'app-deck-builder',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, InputTextModule],
  templateUrl: './deck-builder.component.html',
  styleUrl: './deck-builder.component.scss'
})
export class DeckBuilderComponent {
  cardService = inject(CardService);
  deckService = inject(DeckService);
  router = inject(Router);
  
  // Filter options
  filterOptions = [
    { label: 'Todas', value: 'all' },
    { label: '👤', value: 'Aliado' },
    { label: '💰', value: 'Oro' },
    { label: '✨', value: 'Talisman' },
    { label: '🏛️', value: 'Totem' },
    { label: '⚔️', value: 'Arma' }
  ];
  
  // Filters
  searchTerm = signal('');
  selectedType = signal<string>('all');
  
  // Computed filtered cards
  filteredCards = computed(() => {
    let cards = this.cardService.cards();
    
    if (this.searchTerm()) {
      const term = this.searchTerm().toLowerCase();
      cards = cards.filter(c => 
        c.name.toLowerCase().includes(term) ||
        c.race.toLowerCase().includes(term)
      );
    }
    
    if (this.selectedType() !== 'all') {
      cards = cards.filter(c => c.type === this.selectedType());
    }
    
    return cards;
  });
  
  // Current deck
  currentDeckCards = this.deckService.currentDeckCards;
  currentDeckSize = this.deckService.currentDeckSize;
  
  // Deck stats
  deckStats = computed(() => {
    const cards = this.currentDeckCards();
    const types = {
      Aliado: 0,
      Oro: 0,
      Talisman: 0,
      Totem: 0,
      Arma: 0
    };
    
    cards.forEach(card => {
      if (types[card.type as keyof typeof types] !== undefined) {
        types[card.type as keyof typeof types]++;
      }
    });
    
    return types;
  });
  
  // Load starter deck
  loadStarterDeck(): void {
    this.deckService.loadStarterDeck(this.cardService.getStarterDeck());
  }
  
  // Add card to deck
  addCard(card: Card): void {
    this.deckService.addCard(card);
  }
  
  // Remove card from deck
  removeCard(index: number): void {
    this.deckService.removeCard(index);
  }
  
  // Save deck
  saveDeck(): void {
    this.deckService.saveDeck();
  }
  
  // New deck
  newDeck(): void {
    this.deckService.createNewDeck('Nuevo Mazo');
  }
  
  // Go to game room
  goToRoom(): void {
    this.router.navigate(['/room']);
  }
  
  // Get card type icon
  getTypeIcon(type: string): string {
    switch (type) {
      case 'Aliado': return '👤';
      case 'Oro': return '💰';
      case 'Talisman': return '✨';
      case 'Totem': return '🏛️';
      case 'Arma': return '⚔️';
      default: return '🃏';
    }
  }
  
  // Get type color class
  getTypeClass(type: string): string {
    switch (type) {
      case 'Aliado': return 'type-ally';
      case 'Oro': return 'type-gold';
      case 'Talisman': return 'type-talisman';
      case 'Totem': return 'type-totem';
      case 'Arma': return 'type-weapon';
      default: return '';
    }
  }
}