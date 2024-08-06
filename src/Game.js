import React, { useState, useEffect } from 'react';
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
  const [gameOver, setGameOver] = useState(false);

  const rollDice = () => {
    return Math.floor(Math.random() * 6) + 1;
  };

  const movePlayer = (playerIndex, roll) => {
    setPlayers(prevPlayers => {
      const newPlayers = [...prevPlayers];
      let newPosition = newPlayers[playerIndex].position + roll;
      if (snakesAndLadders.snakes[newPosition]) {
        newPosition = snakesAndLadders.snakes[newPosition];
      } else if (snakesAndLadders.ladders[newPosition]) {
        newPosition = snakesAndLadders.ladders[newPosition];
      }
      newPlayers[playerIndex].position = newPosition;
      newPlayers[playerIndex].scores.push(roll);
      return newPlayers;
    });
  };

  const checkForWin = (position) => {
    if (position >= 100) {
      setGameOver(true);
    }
  };

  const takeTurn = () => {
    if (gameOver) return;
    const roll = rollDice();
    movePlayer(currentPlayerIndex, roll);
    checkForWin(players[currentPlayerIndex].position);
    setCurrentPlayerIndex((prevIndex) => (prevIndex + 1) % players.length);
  };

  useEffect(() => {
    if (!gameOver) {
      setTimeout(takeTurn, 1000);
    }
  }, [currentPlayerIndex, gameOver]);

  return (
    <div>
      <Board players={players} />
      <div>
        {players.map((player, index) => (
          <Player key={index} player={player} />
        ))}
      </div>
      {gameOver && <div>Game Over! {players[currentPlayerIndex].name} wins!</div>}
    </div>
  );
};

export default Game;
