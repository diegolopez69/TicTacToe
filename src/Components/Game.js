import Board from "./Board";
import React, { useState } from "react";
import { calculateWinner } from "../util";

const Game = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXisNext] = useState(true);
  const [positionSquares, setPositionSquares] = useState([]);

  const winner = calculateWinner(history[stepNumber]);
  const xO = xIsNext ? "X" : "O";

  const handleClick = (i, col, row) => {
    const historyPoint = history.slice(0, stepNumber + 1);
    const current = historyPoint[stepNumber];
    const squares = [...current];
    
    if (winner || squares[i]) return;
    
    squares[i] = xO;
    const position = `(${col}, ${row})`;
    const oldPosition = [...positionSquares];
    setPositionSquares([...oldPosition, position]);
    setHistory([...historyPoint, squares]);
    setStepNumber(historyPoint.length);
    setXisNext(!xIsNext);
  };

  
  return (
    <>
      <div className="row">
        <div className="display-board">
          <h1 className="title">Tic tac toe</h1>
          <Board
            squares={history[stepNumber]}
            onClick={(i, col, row) => handleClick(i, col, row)}
            winningLine={winner ? winner.winningLine : null}
          />
        </div>

        <div className="historial">
          <h2>
            {winner
              ? "Ganador: " + winner.winningChar
              : history.length === 10
              ? "Ha sido un empate :("
              : "Siguiente jugador: " + xO}
          </h2>
        </div>
      </div>
    </>
  );
};
export default Game;
