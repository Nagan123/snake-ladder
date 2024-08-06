import React from 'react';

const Player = ({ player }) => {
  return (
    <div className="player">
      <div>{player.name}</div>
      <div>Position: {player.position}</div>
      <div>Scores: {player.scores.join(', ')}</div>
    </div>
  );
};

export default Player;
