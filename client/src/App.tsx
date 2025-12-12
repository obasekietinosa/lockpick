import { useMemo, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import { CTASection } from './components/CTASection';
import { HeroSection } from './components/HeroSection';
import { HighlightsSection } from './components/HighlightsSection';
import { ModeSection } from './components/ModeSection';
import { RulesModal } from './components/RulesModal';
import { StepsSection } from './components/StepsSection';
import { Topbar } from './components/Topbar';
import { ConfigSection } from './components/config/ConfigSection';
import { JoinForm } from './components/join/JoinForm';
import { API_BASE_URL, TimerValue, rules } from './constants';

type LobbyResponse = {
  lobby: {
    id: string;
    settings: {
      pinLength: number;
      hintsEnabled: boolean;
      timer: TimerValue;
    };
    players: { id: string; name: string }[];
  };
};

function AppRoutes() {
  const [showRules, setShowRules] = useState(false);
  const [playerName, setPlayerName] = useState('Player 1');
  const [pinLength, setPinLength] = useState(5);
  const [timer, setTimer] = useState<TimerValue>('30s');
  const [hintsEnabled, setHintsEnabled] = useState(true);
  const [inviteCode, setInviteCode] = useState('');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [statusTone, setStatusTone] = useState<'success' | 'error' | 'info'>('info');

  const ruleItems = useMemo(() => rules.map((line, index) => `${index + 1}. ${line}`), []);
  const navigate = useNavigate();

  const handleCreateLobby = async () => {
    setStatusMessage(null);
    try {
      const response = await fetch(`${API_BASE_URL}/api/lobbies`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ playerName, pinLength, hintsEnabled, timer }),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        throw new Error(payload?.message || 'Unable to create a lobby right now.');
      }

      const data = (await response.json()) as LobbyResponse;
      setInviteCode(data.lobby.id);
      setStatusTone('success');
      setStatusMessage(`Lobby ready. Share this code to invite a friend: ${data.lobby.id}`);
      navigate('/join');
    } catch (error) {
      setStatusTone('error');
      setStatusMessage(error instanceof Error ? error.message : 'Could not start a game.');
    }
  };

  const handleJoinLobby = async (code: string) => {
    setStatusMessage(null);
    try {
      const response = await fetch(`${API_BASE_URL}/api/lobbies/${code}/join`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ playerName }),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        throw new Error(payload?.message || 'Could not join that lobby.');
      }

      setStatusTone('success');
      setStatusMessage(`Joined lobby ${code} as ${playerName}. Share the code to invite others.`);
    } catch (error) {
      setStatusTone('error');
      setStatusMessage(error instanceof Error ? error.message : 'Could not join that lobby.');
    }
  };

  return (
    <div className="page">
      <div className="glow glow-1" />
      <div className="glow glow-2" />
      <Topbar onShowRules={() => setShowRules(true)} />

      <main>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <HeroSection onShowRules={() => setShowRules(true)} onStartConfig={() => navigate('/config')} />
                <ModeSection />
                <HighlightsSection />
                <StepsSection />
                <CTASection onStartSolo={() => navigate('/config')} onInvite={() => navigate('/join')} />
              </>
            }
          />
          <Route
            path="/config"
            element={
              <div className="section-stack">
                <div className="page-head">
                  <p className="eyebrow">Game configuration</p>
                  <h1>Set your rules before you play</h1>
                  <p className="section-lede">
                    Choose a pin length, decide if you want hints, and pick a timer that matches your pace.
                  </p>
                </div>
                <ConfigSection
                  playerName={playerName}
                  pinLength={pinLength}
                  hintsEnabled={hintsEnabled}
                  timer={timer}
                  onPlayerNameChange={setPlayerName}
                  onPinLengthChange={setPinLength}
                  onHintsChange={setHintsEnabled}
                  onTimerChange={setTimer}
                  onStartGame={handleCreateLobby}
                  onJoinGame={() => navigate('/join')}
                />
              </div>
            }
          />
          <Route
            path="/join"
            element={
              <div className="section-stack">
                <div className="page-head">
                  <p className="eyebrow">Join a lobby</p>
                  <h1>Hop into a shared game</h1>
                  <p className="section-lede">Use your name and an invite code to sync up with friends.</p>
                </div>
                <JoinForm
                  playerName={playerName}
                  inviteCode={inviteCode}
                  statusMessage={statusMessage}
                  statusTone={statusTone}
                  onPlayerNameChange={setPlayerName}
                  onInviteCodeChange={setInviteCode}
                  onJoin={handleJoinLobby}
                />
              </div>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <RulesModal open={showRules} rules={ruleItems} onClose={() => setShowRules(false)} />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
