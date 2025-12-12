import { randomUUID } from 'crypto';

export type TimerValue = 'none' | '30s' | '1m' | '3m';

export interface LobbySettings {
  pinLength: number;
  hintsEnabled: boolean;
  timer: TimerValue;
}

export interface LobbyPlayer {
  id: string;
  name: string;
  joinedAt: number;
}

export interface Lobby {
  id: string;
  hostId: string;
  createdAt: number;
  settings: LobbySettings;
  players: LobbyPlayer[];
}

export class LobbyStore {
  private lobbies = new Map<string, Lobby>();

  createLobby(settings: LobbySettings, hostName: string): Lobby {
    const id = randomUUID();
    const hostId = randomUUID();
    const lobby: Lobby = {
      id,
      hostId,
      createdAt: Date.now(),
      settings,
      players: [this.createPlayer(hostName, hostId)],
    };

    this.lobbies.set(id, lobby);
    return lobby;
  }

  joinLobby(lobbyId: string, name: string, playerId?: string): Lobby {
    const lobby = this.lobbies.get(lobbyId);

    if (!lobby) {
      throw new Error('Lobby not found');
    }

    const id = playerId ?? randomUUID();
    const player = this.createPlayer(name, id);
    const existingIndex = lobby.players.findIndex((member) => member.id === id);

    if (existingIndex >= 0) {
      lobby.players[existingIndex] = player;
    } else {
      lobby.players.push(player);
    }

    return lobby;
  }

  getLobby(lobbyId: string): Lobby | undefined {
    return this.lobbies.get(lobbyId);
  }

  private createPlayer(name: string, id: string): LobbyPlayer {
    return {
      id,
      name,
      joinedAt: Date.now(),
    };
  }
}

export const lobbyStore = new LobbyStore();
