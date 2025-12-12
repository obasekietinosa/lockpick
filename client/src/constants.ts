// Shared configuration data for the landing and configuration flows.

export type TimerValue = 'none' | '30s' | '1m' | '3m';

export const rules = [
  "Guess your opponent's secret pin before the timer hits zero.",
  'Pins can be 5, 7, or 10 digits and each round uses the same length.',
  'Hints show which digits are correct and whether they belong in a different slot.',
  'Rounds last up to 3 minutes; win the most rounds to win the match.',
];

export const modes = [
  {
    title: 'Solo practice',
    description: 'Beat the clock with adaptive difficulty to sharpen your pattern spotting.',
    badge: 'Fast start',
  },
  {
    title: 'Challenge a friend',
    description: 'Create a room and send a link to duel someone you know.',
    badge: 'Head-to-head',
  },
  {
    title: 'Find a rival',
    description: 'Queue up and match with another codebreaker who picked similar rules.',
    badge: 'Realtime',
  },
];

export const highlights = [
  {
    title: 'Realtime multiplayer',
    detail: 'Sockets keep turns perfectly in sync with low-latency updates.',
  },
  {
    title: 'Playful design',
    detail: 'Whimsical gradients, animated locks, and celebratory confetti keep wins memorable.',
  },
  {
    title: 'Accessible on mobile',
    detail: 'Thumb-friendly buttons, large inputs, and layouts that flex down to small screens.',
  },
  {
    title: 'Configurable rounds',
    detail: 'Pick pin lengths, timers, and hint modes before you hit Ready.',
  },
];

export const timerOptions: { value: TimerValue; label: string; detail: string }[] = [
  { value: 'none', label: 'No timer', detail: 'Play at your own pace without a countdown.' },
  { value: '30s', label: '30 seconds', detail: 'Default sprint that keeps the tension high.' },
  { value: '1m', label: '1 minute', detail: 'Balanced window to think and adapt.' },
  { value: '3m', label: '3 minutes', detail: 'Deep-dive rounds for methodical codebreakers.' },
];
