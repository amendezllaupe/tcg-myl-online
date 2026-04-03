# Proposal: MyL Online - MVP Implementation

## Intent

Crear una plataforma web para jugar Mitos y Leyendas (formato Primer Bloque Extendido) online con amigos, ofreciendo una experiencia más cercana al juego físico que la versión oficial de Steam.

## Scope

### In Scope
- **Constructor de Mazos**: Interfaz para crear, editar y guardar mazos con cartas de PBX
- **Sala de Juego**: Sistema de salas con invitación a otros jugadores
- **Tablero de Juego**: Interfaz visual con todas las zonas (mano, líneas de defensa/ataque, reserve/gold paid, cementerio, destierro)
- **Motor de Reglas Básicas**: Fases del turno, ataque, bloqueo, daño al castillo
- **Sincronización en Tiempo Real**: WebSocket para mantener estado sync entre jugadores

### Out of Scope
- Sistema de matchmaking/ranking
- Torneos formales
- Todas las habilidades de cartas (solo subconjunto básico en MVP)
- Modo espectador
- Colección/mercado de cartas (solo mazos predefinidos para MVP)

## Approach

1. **Scraping de datos**: Extraer datos de cartas de mazos.cl o usar fuentes alternativas
2. **Arquitectura cliente-servidor**:
   - Frontend: Angular 21 + Signals + PrimeNG
   - Backend: SpringBoot + WebSocket (STOMP)
   - DB: PostgreSQL para usuarios/mazos/partidas
3. **Fases de desarrollo**:
   - Fase 1: Backend + Datos de cartas + Deck builder
   - Fase 2: Sala de juego + Conexión WebSocket
   - Fase 3: Motor de reglas + Tablero interactivo

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `backend/` | New | SpringBoot app con WebSocket |
| `frontend/` | New | Angular 21 app con Signals |
| `data/` | New | Datos de cartas PBX |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Datos de cartas no disponibles | High | Scraping de mazos.cl + entrada manual |
| Complejidad del motor de reglas | Medium | Empezar con subconjunto y expandir iterativamente |
| Sincronización de estado | Medium | Server como fuente de verdad, validación client-side |

## Rollback Plan

- Revertir a desarrollo local sin WebSocket
- Usar archivos JSON estáticos para datos de cartas

## Dependencies

- Datos de cartas de mazos.cl (scraping o manual)
- Angular CLI y SpringBoot CLI instalados

## Success Criteria

- [ ] Dos jugadores pueden conectarse a una sala
- [ ] Ambos ven el mismo estado del juego en tiempo real
- [ ] Turno completo con fases funciona correctamente
- [ ] Ataque y bloqueo resuelven daño correctamente
- [ ] Mazo de cartas PBX completo disponible en constructor