import React, {useState} from 'react';
import Board from './Board';
import './Game.css'

const snakes = {17: 7,
    54: 34,
    62: 19,
    98: 79};
const ladders ={ 3: 22,
    5: 8,
    20: 29,
    27: 1,
    45: 75,
    70: 91,
    79: 99};

const Game =() => {
    const [winner,setWinner] = useState(0,0);
    const[currentplayer,setCurrentPlayer] = useState(0);
    const [positions,setPositions] = useState(null);

    const rollDice = () =>{
        if(winner !== null) return;
        const roll =Math.floor(Math.random()*6) + 1;
        let newPos = positions[currentplayer] + roll;
        if(newPos > 100) newPos = positions[currentplayer];
        if(snakes[newPos]) newPos = snakes[newPos];
        if(ladders[newPos]) newPos = ladders[newPos];

        const newPositions = [...positions];
        newPositions[currentplayer] = newPos;

        setPositions(newPositions);

        if(newPos === 100){
            setWinner(currentplayer);
        }else{
            setCurrentPlayer((currentplayer + 1) % 2);
        }
    };

    return(
        <div className='game'>
            <h1>snake laqdder game</h1>
            <Board positions={positions} snakes={snakes} ladders={ladders} />
            {winner !== null ? (
                <h2>player {winner + 1} Wins!</h2>
            ):(
                <div>
                        <h2>player {currentplayer + 1} turn </h2>
                        <button onClick={rollDice}>RollDice</button>
                </div>
                
            )}
        </div>
    );
};


export default Game