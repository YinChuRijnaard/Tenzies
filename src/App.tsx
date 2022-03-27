import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { generateNewDie, allNewDice } from "./Helper";
import Die from "./Die";

const App: React.FC = () => {
  // STATE
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState<boolean>(false);
  const [turns, setTurns] = useState<number>(0);
  const [totalTurns, setTotalTurns] = useState<string>("");

  // SIDE EFFECTS
  useEffect(() => {
    const allHeld: boolean = dice.every((die) => die.isHeld);
    const firstValue: number = dice[0].value;
    const allSameValue: boolean = dice.every((die) => firstValue);

    const sentence = `It took you ${turns} turns `;

    const calculateTurns = () =>
      turns < 6
        ? sentence + "🤩"
        : turns < 11
        ? sentence + "🥳"
        : turns < 16
        ? sentence + "😊"
        : turns < 21
        ? sentence + "🤓"
        : sentence + "😅";

    if (allHeld && allSameValue) {
      setTenzies(true);
      setTotalTurns((oldTotalTurns) => calculateTurns());
    } else {
      generateNewDie();
      setTotalTurns("");
    }
  }, [dice, turns]);

  // FUNCTIONS
  const rollDice = () => {
    if (!tenzies) {
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? die : generateNewDie();
        })
      );

      setTurns((oldTurns) => oldTurns + 1);
    } else {
      setTenzies(false);
      setDice(allNewDice);
      setTurns(0);
    }
  };

  const holdDice = (id: string) => {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  };

  // MAPPING
  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));

  return (
    <main className="h-screen w-screen select-none bg-amber-300 p-5 text-center font-sans">
      {tenzies ? <Confetti /> : null}
      <div className="ml-auto mr-auto h-[576px] max-w-3xl bg-sky-300">
        <h1 className="p-4 font-mono text-4xl font-bold">Tenzies</h1>
        <p className="text-sm">
          Roll until all dice are the same. Click or tap each die to freeze it
          at its current value between rolls.
        </p>
        <div className="mt-4 grid grid-cols-5 gap-6 p-4">{diceElements}</div>
        <button
          className="mt-12 rounded-xl bg-amber-300 p-2 pl-12 pr-12 font-mono font-bold hover:bg-black hover:text-amber-300"
          onClick={rollDice}
        >
          {tenzies ? "New game" : "Roll"}
        </button>
        <div className="mt-12 ml-auto mr-auto w-64 border-2 border-black p-2 text-left font-mono">
          <h1 className="w-32">
            <span className="font-bold">Turns: </span>
            {turns}
          </h1>
          <p>{totalTurns}</p>
        </div>
      </div>
    </main>
  );
};

export default App;
