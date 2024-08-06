import React from "react";
import './Board.css'

const Board = ({positions = [],snakes={},ladders={}}) =>{
 const renderSquare = (index) => {
    let className='square';
    if(snakes[index]) className +='snake';
    if(ladders[index]) className +='ladder';
 
    return(
        <div className="{className} key={index}">
            { index }
            {positions && positions.length && positions.map((pos, i) => pos === index && <div key={i} className={`player player-${i + 1}`}></div>)}
        </div>
    );
    };
    return(
        <div className="board">
             { Array.from({length : 100}, (_, i) => renderSquare(100 - i - 1))}
        </div>
    );
};

export default Board;