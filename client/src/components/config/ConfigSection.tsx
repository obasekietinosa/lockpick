import { TimerValue, timerOptions } from '../../constants';
import { ConfigForm } from './ConfigForm';
import { SummaryPreview } from './SummaryPreview';
import '../../App.css';

type ConfigSectionProps = {
  playerName: string;
  pinLength: number;
  hintsEnabled: boolean;
  timer: TimerValue;
  onPlayerNameChange: (value: string) => void;
  onPinLengthChange: (value: number) => void;
  onHintsChange: (enabled: boolean) => void;
  onTimerChange: (value: TimerValue) => void;
};

export function ConfigSection(props: ConfigSectionProps) {
  const { playerName, pinLength, hintsEnabled, timer } = props;
  const timerCopy = timerOptions.find((option) => option.value === timer);

  return (
    <section className="config" aria-label="Rule configuration">
      <div className="section-head">
        <div>
          <p className="eyebrow">Dial in your rules</p>
          <h2>Configure a match before you play</h2>
        </div>
        <p className="section-lede">
          Choose how many digits to guess, whether to show hint colors, and how long each round should run. Your selections update the
          summary so you can share or save them.
        </p>
      </div>

      <div className="config-grid">
        <ConfigForm {...props} />
        <SummaryPreview
          playerName={playerName}
          pinLength={pinLength}
          hintsEnabled={hintsEnabled}
          timerLabel={timerCopy?.label}
        />
      </div>
    </section>
  );
}
