# MyL Online - Mitos y Leyendas TCG

Plataforma web para jugar Mitos y Leyendas (TCG chileno) online con amigos.

## 🎯 Estado del Proyecto

**MVP en desarrollo** - Versión inicial con funcionalidades básicas para pruebas.

### Funcionalidades Completadas

- ✅ Constructor de Mazos (Deck Builder)
- ✅ Sala de Juego con código de invitación
- ✅ Soporte multi-jugador (2 jugadores)
- ✅ Navegación a tablero de juego
- ✅ WebSocket con STOMP para tiempo real

### En Desarrollo

- 🛠️ Tablero de juego (interfaz visual)
- 🛠️ Motor de reglas del juego
- 🛠️ Datos de cartas (actualmente ~30 cartas de ejemplo)

---

## 🛠️ Tech Stack

| Capa | Tecnología |
|------|-------------|
| **Frontend** | Angular 21 + Signals + PrimeNG |
| **Backend** | Spring Boot 3.3 + WebSocket (STOMP) |
| **Tiempo Real** | SockJS + STOMP |
| **Build** | Angular CLI + Maven |

---

## 🚀 Getting Started

### Prerrequisitos

- Node.js 18+
- Java 21
- Maven 3.8+

### Instalación

```bash
# Clone el repositorio
git clone https://github.com/amendezllaupe/tcg-myl-online.git
cd tcg-myl-online

# Frontend
cd frontend
npm install
npm start

# Backend (otra terminal)
cd backend
mvn spring-boot:run
```

### Acceso

- **Frontend**: http://localhost:4200
- **Backend**: http://localhost:8080

---

## 📖 Cómo Jugar

### 1. Constructor de Mazos
1. Ve a la página principal
2. Crea tu mazo agregando cartas del panel izquierdo
3. Haz clic en "Mazo Inicial" para cargar un mazo ejemplo
4. Guarda tu mazo

### 2. Sala de Juego
1. Haz clic en "Jugar"
2. Ingresa tu nombre
3. Crea una sala (genera código de 6 caracteres)
4. Comparte el código con tu oponente

### 3. Unirse a una Sala
1. Otro jugador ingresa el código
2. Ambos quedan en "Sala Lista"
3. El host puede iniciar el juego

---

## 📁 Estructura del Proyecto

```
tcg-myl-online/
├── frontend/                 # Angular 21 app
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/   # Componentes UI
│   │   │   ├── models/       # Modelos de datos
│   │   │   └── services/    # Servicios (WebSocket, Cards, Deck)
│   │   └── assets/           # Datos de cartas
│   └── package.json
│
├── backend/                  # Spring Boot app
│   └── src/main/java/cl/myl/
│       └── backend/
│           ├── config/       # WebSocket config
│           ├── model/        # Modelos (GameRoom)
│           ├── service/       # RoomService
│           └── websocket/    # RoomController
│
└── SPEC.md                   # Especificación del proyecto
```

---

## 🎱 Formato-supported

- **Primer Bloque Extendido (PBX)**
- Actualmente con ~30 cartas de ejemplo para pruebas

---

## 🔜 Próximos Pasos

1. Expandir dataset de cartas (scrapear mazos.cl)
2. Implementar interfaz visual del tablero
3. Desarrollar motor de reglas MyL completo
4. Agregar sistema de fases del turno
5. Implementar efectos de cartas (habilidades)

---

## 📝 Licencia

MIT License - Proyecto educativo/demo