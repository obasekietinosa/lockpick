# pin-guessing-game
Multiplayer number guessing game

## Overview
This is a multiplayer, realtime guessing game. The premise is simple. The opponent chooses a sequence of numbers of length n (e.g 1, 2, 9, 0, 5) and then the player tries to guess each number until they get all the numbers correctly and in the right sequence.

## Game Mechanics
The game can be played in single player or multiplayer mode. It can also be played with multiple different rulesets.

### Rules
#### 1. Length of Pins
Minimum length of pins is 5. There can also be pins of length 7 and 10. Whatever length is chosen must be the same for both players in multiplayer mode.

#### 2. Hint mode
There are different hint modes. To begin, every guess shows an indicator. green 🟩 if correct and grey ⬜️ if incorrect.

As an example, lets say there are 5 digits to guess: [] [] [] [] [] when the player makes no correct guesses, the feedback will show as ⬜️ ⬜️ ⬜️ ⬜️ ⬜️. If they make a correct guess at the third position with all the others wrong, the feedback becomes ⬜️ ⬜️ 🟩 ⬜️ ⬜️. If they had multiple correct guesses (e.g third and fifth) it will show as ⬜️ ⬜️ 🟩 ⬜️ 🟩

With hints enabled, the difference would be that incorrect guesses which would be correct in a different position show as orange 🟧. So, following the previous example if they make a guess with two correct digits and a digit in the first position which is wrong but would be correct in the fourth position, it shows up as 🟧 ⬜️ 🟩 ⬜️ 🟩

#### 4. Timers
Timers can be enabled for each round. The round can last for up to 3 minutes, but can also have timers of 30 secs, 1 minute and 3 minutes.

#### 5. Rounds
Each game will have 3 rounds. A round ends when the timer goes off (if timers are enabled) or when either player correctly guesses the others pin.

A player wins when they win the most rounds.

### Single Player Mode
In single player mode, the player guesses against a set of randomly generated numbers.
They select the length of pins, whether to enable hints or not and how much time per round.

### Multiplayer Mode
In multiplayer mode, there will be two options, playing against a random player and starting a private room that can be joined by someone else (ie with a shared link).

The players need to select the settings they would like and then if a random matchup or a private room. If its a private room, then we start the room and generate the invite link so that they can send it to their desired player. If it is a random matchup, then we generate the room and find another player with the same or similar game settings and pair them up.

Both players need to input their digits (or click a button to allow us randomly generate it for them) and then say they are ready so that the game can start.

## Wireframes and User journeys


## Technology Stack
The entire project will be built on a monorepo with the frontend and backend together. The entire project will use TypeScript end to end. The frontend will be in React + Vite and the backend with be in ExpressJS with Socket.io

### Frontend

### Backend
