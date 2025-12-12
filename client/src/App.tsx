import { useMemo, useState } from 'react';
import './App.css';
import { CTASection } from './components/CTASection';
import { HeroSection } from './components/HeroSection';
import { HighlightsSection } from './components/HighlightsSection';
import { ModeSection } from './components/ModeSection';
import { RulesModal } from './components/RulesModal';
import { StepsSection } from './components/StepsSection';
import { Topbar } from './components/Topbar';
import { ConfigSection } from './components/config/ConfigSection';
import { TimerValue, rules } from './constants';

function App() {
  const [showRules, setShowRules] = useState(false);
  const [playerName, setPlayerName] = useState('Player 1');
  const [pinLength, setPinLength] = useState(5);
  const [timer, setTimer] = useState<TimerValue>('30s');
  const [hintsEnabled, setHintsEnabled] = useState(true);

  const ruleItems = useMemo(() => rules.map((line, index) => `${index + 1}. ${line}`), []);

  return (
    <div className="page">
      <div className="glow glow-1" />
      <div className="glow glow-2" />
      <Topbar onShowRules={() => setShowRules(true)} />

      <main>
        <HeroSection onShowRules={() => setShowRules(true)} />
        <ConfigSection
          playerName={playerName}
          pinLength={pinLength}
          hintsEnabled={hintsEnabled}
          timer={timer}
          onPlayerNameChange={setPlayerName}
          onPinLengthChange={setPinLength}
          onHintsChange={setHintsEnabled}
          onTimerChange={setTimer}
        />
        <ModeSection />
        <HighlightsSection />
        <StepsSection />
        <CTASection />
      </main>

      <RulesModal open={showRules} rules={ruleItems} onClose={() => setShowRules(false)} />
    </div>
  );
}

export default App;
