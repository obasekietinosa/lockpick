export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

export type TimerValue = 'none' | '30s' | '1m' | '3m';

export const rules = [
  "Guess your opponent's secret pin before the timer hits zero.",
  'Pins can be 5, 7, or 10 digits and each round uses the same length.',
  'Hints show which digits are correct and whether they belong in a different slot.',
  'Rounds last up to 3 minutes; win the most rounds to win the match.',
];

export const pinLengthOptions = [
  { value: 5, label: '5 digits', detail: 'Baseline length for fast-paced rounds.' },
  { value: 7, label: '7 digits', detail: 'More room for patterns and bait.' },
  { value: 10, label: '10 digits', detail: 'Endurance mode for master codebreakers.' },
];

export const timerOptions: { value: TimerValue; label: string; detail: string }[] = [
  { value: 'none', label: 'No timer', detail: 'Play at your own pace without a countdown.' },
  { value: '30s', label: '30 seconds', detail: 'Default sprint that keeps the tension high.' },
  { value: '1m', label: '1 minute', detail: 'Balanced window to think and adapt.' },
  { value: '3m', label: '3 minutes', detail: 'Deep-dive rounds for methodical codebreakers.' },
];

export const highlightCards = [
  {
    title: 'Realtime multiplayer',
    detail: 'Sockets keep turns perfectly in sync with low-latency updates.',
  },
  {
    title: 'Playful design',
    detail: 'Whimsical gradients, animated locks, and celebratory confetti keep wins memorable.',
  },
  {
    title: 'Mobile-first',
    detail: 'Thumb-friendly buttons, large inputs, and layouts that flex down to small screens.',
  },
  {
    title: 'Configurable rounds',
    detail: 'Pick pin lengths, timers, and hint modes before you hit Ready.',
  },
];

export const journeySteps = [
  {
    title: 'Set your rules',
    description: 'Choose pin length, hint mode, and timers before creating a lobby or joining one.',
  },
  {
    title: 'Lock in your pins',
    description: 'Pick three secret combinations up front so each round is ready to roll.',
  },
  {
    title: 'Trade guesses',
    description: 'Input digits quickly; hint indicators show whether a digit is correct or misplaced.',
  },
  {
    title: 'Claim the match',
    description: 'Win the most rounds to secure the victory. A draw is possible when timers expire.',
  },
];
