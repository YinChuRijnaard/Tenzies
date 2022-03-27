import { nanoid } from "nanoid";

export function generateNewDie() {
  // returns blank screen when it's an arrow function?
  return {
    value: Math.ceil(Math.random() * 6),
    isHeld: false,
    id: nanoid(),
  };
}

export function allNewDice() {
  const newDice = [];

  for (let i = 0; i < 10; i++) {
    newDice.push(generateNewDie());
  }

  return newDice;
}
