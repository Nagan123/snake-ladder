import React from 'react';

const Board = ({ players }) => {
  const renderCell = (cellNumber) => {
    const player = players.find(player => player.position === cellNumber);
    return <div className="cell">{player ? player.name : cellNumber}</div>;
  };

  const renderBoard = () => {
    let cells = [];
    for (let i = 1; i <= 100; i++) {
      cells.push(renderCell(i));
    }
    return cells;
  };

  return (
    <div className="board">
      {renderBoard()}
    </div>
  );
};

export default Board;
