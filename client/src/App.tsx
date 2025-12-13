import { useEffect, useMemo, useState } from 'react';
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
import { RoundPreview } from './components/play/RoundPreview';
import { PinSelection } from './components/pins/PinSelection';

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

function buildFeedback(guess: string, secret: string, hintsEnabled: boolean): string {
  const feedback = Array.from({ length: guess.length }, () => '⬜️');
  const secretDigits = secret.split('');
  const guessDigits = guess.split('');
  const remaining: Record<string, number> = {};

  guessDigits.forEach((digit, index) => {
    if (digit === secretDigits[index]) {
      feedback[index] = '🟩';
    } else {
      remaining[secretDigits[index]] = (remaining[secretDigits[index]] || 0) + 1;
    }
  });

  if (hintsEnabled) {
    guessDigits.forEach((digit, index) => {
      if (feedback[index] === '🟩') return;
      if (remaining[digit]) {
        feedback[index] = '🟧';
        remaining[digit] -= 1;
      }
    });
  }

  return feedback.join(' ');
}

function AppRoutes() {
  const [showRules, setShowRules] = useState(false);
  const [playerName, setPlayerName] = useState('Player 1');
  const [pinLength, setPinLength] = useState(5);
  const [timer, setTimer] = useState<TimerValue>('30s');
  const [hintsEnabled, setHintsEnabled] = useState(true);
  const [inviteCode, setInviteCode] = useState('');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [statusTone, setStatusTone] = useState<'success' | 'error' | 'info'>('info');
  const [isCreatingLobby, setIsCreatingLobby] = useState(false);
  const [pins, setPins] = useState<string[]>(() => Array(3).fill(''));
  const [rivalPins, setRivalPins] = useState<string[]>(() => Array(3).fill(''));
  const [activeRound, setActiveRound] = useState(1);
  const [guessDigits, setGuessDigits] = useState<string[]>(() => Array(pinLength).fill(''));
  const [guessHistory, setGuessHistory] = useState<{ round: number; guess: string; feedback: string }[]>([]);
  const [playStatus, setPlayStatus] = useState<string | null>(null);
  const [playTone, setPlayTone] = useState<'success' | 'error' | 'info'>('info');

  useEffect(() => {
    setPins(Array(3).fill(''));
    setRivalPins(Array.from({ length: 3 }, () => generatePin(pinLength)));
    setGuessDigits(Array(pinLength).fill(''));
    setGuessHistory([]);
    setActiveRound(1);
  }, [pinLength]);

  const ruleItems = useMemo(() => rules.map((line, index) => `${index + 1}. ${line}`), []);
  const navigate = useNavigate();

  const handleCreateLobby = async () => {
    const trimmedName = playerName.trim();
    if (!trimmedName) {
      setStatusTone('error');
      setStatusMessage('Add your name so we can personalise the lobby.');
      return;
    }

    setStatusMessage(null);
    setIsCreatingLobby(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/lobbies`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ playerName: trimmedName, pinLength, hintsEnabled, timer }),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        throw new Error(payload?.message || 'Unable to create a lobby right now.');
      }

      const data = (await response.json()) as LobbyResponse;
      const lobbyPinLength = data.lobby.settings.pinLength;
      setInviteCode(data.lobby.id);
      setPinLength(lobbyPinLength);
      setHintsEnabled(Boolean(data.lobby.settings.hintsEnabled));
      setTimer(data.lobby.settings.timer);
      setRivalPins((prev) => prev.map((pin) => pin || generatePin(lobbyPinLength)));
      setStatusTone('success');
      setStatusMessage(`Lobby ready. Share this code to invite a friend: ${data.lobby.id}`);
      navigate('/select-pin');
    } catch (error) {
      setStatusTone('error');
      setStatusMessage(error instanceof Error ? error.message : 'Could not start a game.');
    } finally {
      setIsCreatingLobby(false);
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

      const data = (await response.json()) as LobbyResponse;
      const lobbyPinLength = data.lobby.settings.pinLength;
      setPinLength(lobbyPinLength);
      setHintsEnabled(Boolean(data.lobby.settings.hintsEnabled));
      setTimer(data.lobby.settings.timer);
      setInviteCode(data.lobby.id);
      setRivalPins((prev) => prev.map((pin) => pin || generatePin(lobbyPinLength)));
      setStatusTone('success');
      setStatusMessage(`Joined lobby ${code} as ${playerName}. Share the code to invite others.`);
      navigate('/select-pin');
    } catch (error) {
      setStatusTone('error');
      setStatusMessage(error instanceof Error ? error.message : 'Could not join that lobby.');
    }
  };

  const handlePinChange = (roundIndex: number, value: string) => {
    const cleaned = value.replace(/\D/g, '').slice(0, pinLength);
    setPins((prev) => prev.map((pin, index) => (index === roundIndex ? cleaned : pin)));
  };

  const generatePin = (length = pinLength) =>
    Array.from({ length }, () => Math.floor(Math.random() * 10)).join('');

  const handleAutoGenerate = () => {
    setPins(Array.from({ length: 3 }, generatePin));
  };

  const ensureRivalPins = () => {
    setRivalPins((prev) => prev.map((pin) => (pin && pin.length === pinLength ? pin : generatePin())));
  };

  const handleGuessDigitChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, '').slice(0, 1);
    setGuessDigits((prev) => prev.map((existing, idx) => (idx === index ? digit : existing)));
  };

  const currentSecret = rivalPins[activeRound - 1];

  const handleSubmitGuess = () => {
    const guess = guessDigits.join('');

    if (guess.length !== pinLength) {
      setPlayTone('error');
      setPlayStatus('Enter a digit for each slot before submitting.');
      return;
    }

    if (!currentSecret || currentSecret.length !== pinLength) {
      setPlayTone('error');
      setPlayStatus('Waiting on your rival to lock in their pin for this round.');
      return;
    }

    const feedback = buildFeedback(guess, currentSecret, hintsEnabled);
    setGuessHistory((prev) => [...prev, { round: activeRound, guess, feedback }]);
    setGuessDigits(Array(pinLength).fill(''));

    if (guess === currentSecret) {
      const nextRound = Math.min(3, activeRound + 1);
      setActiveRound(nextRound);
      setPlayTone('success');
      setPlayStatus(nextRound > activeRound ? 'Nice crack! Advance to the next round.' : 'You solved every round.');
    } else {
      setPlayTone('info');
      setPlayStatus('Keep iterating—use the hints to adjust your next guess.');
    }
  };

  const handleAdvanceRound = () => {
    setActiveRound((prev) => (prev >= 3 ? 3 : prev + 1));
    setGuessDigits(Array(pinLength).fill(''));
    setPlayStatus(null);
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
                  statusMessage={statusMessage}
                  statusTone={statusTone}
                  isCreatingLobby={isCreatingLobby}
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
          <Route
            path="/select-pin"
            element={
              <div className="section-stack">
                <div className="page-head">
                  <p className="eyebrow">Plan your rounds</p>
                  <h1>Lock in secret pins</h1>
                  <p className="section-lede">Pick the numbers your rival will be trying to guess across all three rounds.</p>
                </div>
                <PinSelection
                  playerName={playerName}
                  pinLength={pinLength}
                  pins={pins}
                  inviteCode={inviteCode}
                  onPinChange={handlePinChange}
                  onAutoGenerate={handleAutoGenerate}
                  onContinue={() => {
                    ensureRivalPins();
                    navigate('/play');
                  }}
                />
              </div>
            }
          />
          <Route
            path="/play"
            element={
              <div className="section-stack">
                <div className="page-head">
                  <p className="eyebrow">Gameplay</p>
                  <h1>Crack the code before the timer ends</h1>
                  <p className="section-lede">
                    Practice the core guessing experience: enter digits, submit, and read the hints to speed-run the round.
                  </p>
                </div>
                <RoundPreview
                  playerName={playerName}
                  pins={pins}
                  rivalPins={rivalPins}
                  pinLength={pinLength}
                  activeRound={activeRound}
                  guessDigits={guessDigits}
                  guessHistory={guessHistory}
                  statusMessage={playStatus}
                  statusTone={playTone}
                  onDigitChange={handleGuessDigitChange}
                  onSubmitGuess={handleSubmitGuess}
                  onAdvanceRound={handleAdvanceRound}
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
