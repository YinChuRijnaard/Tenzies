import React from "react";

interface Props {
  value: string | number;
  isHeld: boolean;
  holdDice: () => void;
}

const Die: React.FC<Props> = (props: Props) => {
  const styles = {
    backgroundColor: props.isHeld ? "#A3E635" : "#FCD34D",
    // lime-400 : amber-300
  };

  return (
    <div className="flex justify-center">
      <h2
        className="flex h-12 w-12 cursor-pointer select-none items-center justify-center rounded-md bg-amber-300 text-2xl shadow-md shadow-neutral-500 hover:shadow-inner hover:shadow-neutral-500"
        style={styles}
        onClick={props.holdDice}
      >
        {props.value}
      </h2>
    </div>
  );
};

export default Die;
