import React, { useState } from 'react';
import Board from './Board';
import Dice from './Dice';
import Player from './Player';

const snakesAndLadders = {
  snakes: { 17: 7, 54: 34, 62: 19, 98: 79 },
  ladders: { 3: 22, 5: 8, 20: 29, 27: 1, 45: 75, 70: 91, 79: 99 }
};

const Game = () => {
  const [players, setPlayers] = useState([
    { name: 'p1', position: 0, scores: [] },
    { name: 'p2', position: 0, scores: [] },
  ]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [roll, setRoll] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);

  const rollDice = () => {
    if (gameOver) return;  // Prevent further dice rolls if the game is over
    const newRoll = Math.floor(Math.random() * 6) + 1;
    setRoll(newRoll);
    movePlayer(newRoll);
  };

  const movePlayer = (diceRoll) => {
    setPlayers(prevPlayers => {
      const newPlayers = [...prevPlayers];
      let newPosition = newPlayers[currentPlayerIndex].position + diceRoll;
      if (snakesAndLadders.snakes[newPosition]) {
        newPosition = snakesAndLadders.snakes[newPosition];
      } else if (snakesAndLadders.ladders[newPosition]) {
        newPosition = snakesAndLadders.ladders[newPosition];
      }
      newPlayers[currentPlayerIndex].position = newPosition;
      newPlayers[currentPlayerIndex].scores.push(diceRoll);

      if (newPosition >= 100) {
        setGameOver(true);
        setWinner(newPlayers[currentPlayerIndex].name);
      }

      return newPlayers;
    });

    if (!gameOver) {
      setCurrentPlayerIndex((prevIndex) => (prevIndex + 1) % players.length);
    }
  };

  return (
    <div>
      <Board players={players} />
      <div>
        {players.map((player, index) => (
          <Player key={index} player={player} />
        ))}
      </div>
      <Dice roll={roll} onRollDice={rollDice} />
      {gameOver && <div>Game Over! {winner} wins!</div>}
    </div>
  );
};

export default Game;
