/**
 * MyL Online - Initial Card Dataset (MVP)
 * Format: Primer Bloque Extendido (PBX)
 * Total: 30 cards (sufficient for basic gameplay)
 */

export interface Card {
  id: string;
  name: string;
  type: 'Aliado' | 'Totem' | 'Talisman' | 'Arma' | 'Oro';
  cost: number;
  strength?: number;
  race: string;
  ability: string;
  edition: string;
  imageUrl?: string;
}

export const INITIAL_CARDS: Card[] = [
  // === OROS (Resources) ===
  { id: 'ORO-001', name: 'Oro', type: 'Oro', cost: 0, race: 'Ninguna', ability: 'Recurso básico para pagar cartas.', edition: 'PBX' },
  { id: 'ORO-002', name: 'Oro', type: 'Oro', cost: 0, race: 'Ninguna', ability: 'Recurso básico para pagar cartas.', edition: 'PBX' },
  { id: 'ORO-003', name: 'Oro', type: 'Oro', cost: 0, race: 'Ninguna', ability: 'Recurso básico para pagar cartas.', edition: 'PBX' },
  { id: 'ORO-004', name: 'Oro', type: 'Oro', cost: 0, race: 'Ninguna', ability: 'Recurso básico para pagar cartas.', edition: 'PBX' },
  { id: 'ORO-005', name: 'Oro', type: 'Oro', cost: 0, race: 'Ninguna', ability: 'Recurso básico para pagar cartas.', edition: 'PBX' },
  { id: 'ORO-006', name: 'Oro', type: 'Oro', cost: 0, race: 'Ninguna', ability: 'Recurso básico para pagar cartas.', edition: 'PBX' },
  { id: 'ORO-007', name: 'Oro', type: 'Oro', cost: 0, race: 'Ninguna', ability: 'Recurso básico para pagar cartas.', edition: 'PBX' },
  { id: 'ORO-008', name: 'Oro', type: 'Oro', cost: 0, race: 'Ninguna', ability: 'Recurso básico para pagar cartas.', edition: 'PBX' },
  { id: 'ORO-009', name: 'Oro', type: 'Oro', cost: 0, race: 'Ninguna', ability: 'Recurso básico para pagar cartas.', edition: 'PBX' },
  { id: 'ORO-010', name: 'Oro', type: 'Oro', cost: 0, race: 'Ninguna', ability: 'Recurso básico para pagar cartas.', edition: 'PBX' },
  { id: 'ORO-011', name: 'Oro', type: 'Oro', cost: 0, race: 'Ninguna', ability: 'Recurso básico para pagar cartas.', edition: 'PBX' },
  { id: 'ORO-012', name: 'Oro', type: 'Oro', cost: 0, race: 'Ninguna', ability: 'Recurso básico para pagar cartas.', edition: 'PBX' },
  { id: 'ORO-013', name: 'Oro', type: 'Oro', cost: 0, race: 'Ninguna', ability: 'Recurso básico para pagar cartas.', edition: 'PBX' },
  { id: 'ORO-014', name: 'Oro', type: 'Oro', cost: 0, race: 'Ninguna', ability: 'Recurso básico para pagar cartas.', edition: 'PBX' },
  { id: 'ORO-015', name: 'Oro', type: 'Oro', cost: 0, race: 'Ninguna', ability: 'Recurso básico para pagar cartas.', edition: 'PBX' },

  // === ALIADOS ===
  { id: 'ALI-001', name: 'Guerrero Novato', type: 'Aliado', cost: 1, strength: 1, race: 'Humano', ability: '', edition: 'PBX' },
  { id: 'ALI-002', name: 'Elfo Arquero', type: 'Aliado', cost: 2, strength: 2, race: 'Elfo', ability: '', edition: 'PBX' },
  { id: 'ALI-003', name: 'Caballero de la Luz', type: 'Aliado', cost: 3, strength: 3, race: 'Humano', ability: 'Protección: Este aliado no puede ser objetivo de habilidades.', edition: 'PBX' },
  { id: 'ALI-004', name: 'Dragón Menor', type: 'Aliado', cost: 4, strength: 4, race: 'Dragón', ability: '', edition: 'PBX' },
  { id: 'ALI-005', name: 'Elemental de Fuego', type: 'Aliado', cost: 3, strength: 3, race: 'Elemental', ability: 'Rapidez: Puede atacar el turno en que entra en juego.', edition: 'PBX' },
  { id: 'ALI-006', name: 'Golem de Piedra', type: 'Aliado', cost: 4, strength: 5, race: 'Constructo', ability: 'Lento: No puede atacar el turno en que entra en juego.', edition: 'PBX' },
  { id: 'ALI-007', name: 'Lobo Solitario', type: 'Aliado', cost: 2, strength: 2, race: 'Bestia', ability: 'Sigilo: No puede ser bloqueado.', edition: 'PBX' },
  { id: 'ALI-008', name: 'Maga Elemental', type: 'Aliado', cost: 3, strength: 2, race: 'Humano', ability: 'Arcano: Puede usar habilidades de magia.', edition: 'PBX' },
  { id: 'ALI-009', name: 'Orco Berserker', type: 'Aliado', cost: 3, strength: 4, race: 'Orco', ability: 'Furia: +1 de fuerza mientras tenga 3 aliados o menos en juego.', edition: 'PBX' },
  { id: 'ALI-010', name: 'Espía del Reino', type: 'Aliado', cost: 2, strength: 1, race: 'Humano', ability: 'Sigilo. Cuando este aliado causa daño al castillo, roba una carta.', edition: 'PBX' },

  // === TALISMANES (Instant effects) ===
  { id: 'TAL-001', name: 'Flecha Arcana', type: 'Talisman', cost: 1, race: 'Ninguna', ability: 'Destruye un aliado con fuerza 2 o menos.', edition: 'PBX' },
  { id: 'TAL-002', name: 'Escudo Protector', type: 'Talisman', cost: 2, race: 'Ninguna', ability: 'Previene todo el daño que recibiría un aliado o jugador este turno.', edition: 'PBX' },
  { id: 'TAL-003', name: 'Invocación de Fuego', type: 'Talisman', cost: 3, race: 'Ninguna', ability: 'Inflige 3 puntos de daño al castillo del oponente.', edition: 'PBX' },
  { id: 'TAL-004', name: 'Resurrección', type: 'Aliado', cost: 4, strength: 3, race: 'Ninguna', ability: 'Devuelve un aliado de tu cementerio a tu mano.', edition: 'PBX' },

  // === TOTEMS (Persistent effects) ===
  { id: 'TOT-001', name: 'Altar del Guerrero', type: 'Totem', cost: 2, race: 'Ninguna', ability: 'Los aliados que controlas obtienen +1 de fuerza.', edition: 'PBX' },
  { id: 'TOT-002', name: 'Fuente de Mana', type: 'Totem', cost: 3, race: 'Ninguna', ability: 'Al inicio de cada turno,-roba una carta adicional.', edition: 'PBX' },
  { id: 'TOT-003', name: 'Baluarte de Piedra', type: 'Totem', cost: 3, race: 'Ninguna', ability: 'Los aliados que controlas tienen +1 de vida (resistencia).', edition: 'PBX' },

  // === ARMAS (Equipment) ===
  { id: 'ARM-001', name: 'Espada de Acero', type: 'Arma', cost: 2, race: 'Ninguna', ability: 'El aliado que la porta obtiene +2 de fuerza.', edition: 'PBX' },
  { id: 'ARM-002', name: 'Escudo del León', type: 'Arma', cost: 2, race: 'Ninguna', ability: 'El aliado que la porta obtiene +0 de fuerza y Previene el primer daño que reciba.', edition: 'PBX' },
  { id: 'ARM-003', name: 'Arco Largo Élfico', type: 'Arma', cost: 3, race: 'Ninguna', ability: 'El aliado que la porta obtiene +3 de fuerza y Sigilo.', edition: 'PBX' },
];

// Helper function to get starter deck
export function getStarterDeck(): Card[] {
  const deck: Card[] = [];
  
  // Add 15 Golds
  for (let i = 1; i <= 15; i++) {
    deck.push(INITIAL_CARDS.find(c => c.id === `ORO-00${i <= 9 ? '0' + i : i}`)!);
  }
  
  // Add various allies
  const allies = INITIAL_CARDS.filter(c => c.type === 'Aliado');
  const talismans = INITIAL_CARDS.filter(c => c.type === 'Talisman');
  const totems = INITIAL_CARDS.filter(c => c.type === 'Totem');
  const armas = INITIAL_CARDS.filter(c => c.type === 'Arma');
  
  // Fill remaining with allies (basic deck building)
  deck.push(...allies.slice(0, 5));
  deck.push(...talismans.slice(0, 2));
  deck.push(...totems.slice(0, 1));
  deck.push(...armas.slice(0, 2));
  
  return deck;
}