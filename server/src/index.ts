import cors, { CorsOptions } from 'cors';
import express from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { LobbySettings, TimerValue, lobbyStore } from './lobbyStore';

const app = express();
const port = Number(process.env.PORT) || 3001;

const allowedOrigins = (process.env.CORS_ALLOWED_ORIGINS || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    // Allow non-browser requests or when no Origin header is sent (e.g. health checks)
    if (!origin) {
      return callback(null, true);
    }

    const defaultAllowedOrigins = [
      'https://lockpick.co',
      'https://www.lockpick.co',
      'http://localhost:5173',
      'http://localhost:4173',
    ];

    const whitelist = allowedOrigins.length > 0 ? allowedOrigins : defaultAllowedOrigins;

    callback(null, whitelist.includes(origin));
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.post('/api/lobbies', (req, res) => {
  const { playerName, pinLength, hintsEnabled, timer } = req.body as {
    playerName?: string;
    pinLength?: number;
    hintsEnabled?: boolean;
    timer?: TimerValue;
  };

  if (!playerName) {
    return res.status(400).json({ message: 'Player name is required.' });
  }

  if (!pinLength || ![5, 7, 10].includes(pinLength)) {
    return res.status(400).json({ message: 'Pin length must be 5, 7, or 10.' });
  }

  if (!timer || !['none', '30s', '1m', '3m'].includes(timer)) {
    return res.status(400).json({ message: 'Timer must be one of none, 30s, 1m, or 3m.' });
  }

  const settings: LobbySettings = {
    pinLength,
    hintsEnabled: Boolean(hintsEnabled),
    timer,
  };

  const lobby = lobbyStore.createLobby(settings, playerName);
  res.status(201).json({ lobby });
});

app.post('/api/lobbies/:lobbyId/join', (req, res) => {
  const { lobbyId } = req.params;
  const { playerName } = req.body as { playerName?: string };

  if (!playerName) {
    return res.status(400).json({ message: 'Player name is required.' });
  }

  try {
    const lobby = lobbyStore.joinLobby(lobbyId, playerName);
    res.json({ lobby });
  } catch (error) {
    res.status(404).json({ message: error instanceof Error ? error.message : 'Lobby not found' });
  }
});

app.get('/api/lobbies/:lobbyId', (req, res) => {
  const { lobbyId } = req.params;
  const lobby = lobbyStore.getLobby(lobbyId);

  if (!lobby) {
    return res.status(404).json({ message: 'Lobby not found' });
  }

  res.json({ lobby });
});

const httpServer = http.createServer(app);
const io = new SocketIOServer(httpServer, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  console.log(`Client connected: ${socket.id}`);

  socket.on('lobby:join', ({ lobbyId, playerName }: { lobbyId: string; playerName: string }) => {
    try {
      const lobby = lobbyStore.joinLobby(lobbyId, playerName, socket.id);
      socket.join(lobbyId);
      io.to(lobbyId).emit('lobby:updated', lobby);
    } catch (error) {
      socket.emit('lobby:error', error instanceof Error ? error.message : 'Could not join lobby');
    }
  });

  socket.on('disconnect', (reason) => {
    console.log(`Client disconnected (${socket.id}): ${reason}`);
  });
});

httpServer.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
