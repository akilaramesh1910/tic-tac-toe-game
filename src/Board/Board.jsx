// Board.js
import React, { useState, useEffect, useCallback } from 'react';
import './Board.css';
import Square from '../Square/Square';
import cross from '../Assets/cross.png';
import circle from '../Assets/circle.png';

const Board = () => {
  const [state, setState] = useState(Array(9).fill(null));
  const [isTrue, setIsTrue] = useState(true);
  const [isDraw, setIsDraw] = useState(false);
  const [winner, setWinner] = useState(null);

  const isBoardFull = useCallback(() => {
    return state.every(square => square !== null);
  }, [state]);

  useEffect(() => {
    const checkWinner = () => {
      const logics = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
      for (let logic of logics) {
        const [a, b, c] = logic;
        console.log(a);
        console.log(b);
        console.log(c);
        if (state[a] !== null && state[a] === state[b] && state[a] === state[c]) {
          console.log(state[a]);
          return state[a];
        }
      }
      return null;
    };

    const winner = checkWinner();
    if (winner) {
      setWinner(winner);
    } else if (isBoardFull()) {
      setIsDraw(true);
    }
  }, [state, isBoardFull]);

  const handleClick = (index) => {
    if (state[index] !== null || winner || isDraw) {
      return;
    }
    const new_state = [...state];
    new_state[index] = isTrue ? cross : circle; // Use image URLs instead of strings
    setState(new_state);
    setIsTrue(!isTrue);
  };

  const handleReset = () => {
    setState(Array(9).fill(null));
    setIsTrue(true);
    setIsDraw(false);
    setWinner(null);
  };

  return (
    <div className='container'>
      <h1>Tic Tac Toe Game</h1>
      {winner ? (
        <div className="win">
          <img width="40px" height="40px" src={winner} alt="Winner" /> won the game <button onClick={handleReset}>Play again</button>
        </div>
      ) : isDraw ? (
        <div className="draw">
          <h4>No winner! Please Play Again.</h4>
          <div className='draw-button'>
            <button onClick={handleReset}>Play again</button>
          </div>
        </div>
      ) : (
        <>
          <h4>{isTrue ? <img width="40px" height="40px" src={cross} alt="Cross" /> : <img width="40px" height="40px" src={circle} alt="Circle" />} please move</h4>
          <div className='row'>
            <Square onClick={() => handleClick(0)} value={state[0]} />
            <Square onClick={() => handleClick(1)} value={state[1]} />
            <Square onClick={() => handleClick(2)} value={state[2]} />
          </div>
          <div className='row'>
            <Square onClick={() => handleClick(3)} value={state[3]} />
            <Square onClick={() => handleClick(4)} value={state[4]} />
            <Square onClick={() => handleClick(5)} value={state[5]} />
          </div>
          <div className='row'>
            <Square onClick={() => handleClick(6)} value={state[6]} />
            <Square onClick={() => handleClick(7)} value={state[7]} />
            <Square onClick={() => handleClick(8)} value={state[8]} />
          </div>
        </>
      )}
    </div>
  );
};

export default Board;
