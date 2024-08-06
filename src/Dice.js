import React from 'react';

const Dice = ({ roll, onRollDice }) => {
  return (
    <div>
      <button onClick={onRollDice}>Roll Dice</button>
      {roll && <div className="dice">{roll}</div>}
    </div>
  );
};

export default Dice;
