import { Routes } from '@angular/router';
import { DeckBuilderComponent } from './components/deck-builder/deck-builder.component';
import { GameRoomComponent } from './components/game-room/game-room.component';

export const routes: Routes = [
  { path: '', redirectTo: '/deck-builder', pathMatch: 'full' },
  { path: 'deck-builder', component: DeckBuilderComponent },
  { path: 'room', component: GameRoomComponent },
];