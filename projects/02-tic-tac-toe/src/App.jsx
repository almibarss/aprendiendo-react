import confetti from "canvas-confetti";
import { useState } from "react";
import "./App.css";
import { Square } from "./components/Square";
import { WinnerModal } from "./components/WinnerModal";
import { useEffect } from "react";

const TURNS = {
  X: "❌",
  O: "⚪",
};

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function App() {
  const [board, setBoard] = useState(() => {
    const boardFromLocalStorage = window.localStorage.getItem("board");
    return boardFromLocalStorage ? JSON.parse(boardFromLocalStorage) : Array(9).fill(null);
  });
  const [turn, setTurn] = useState(() => {
    const turnFromLocalStorage = window.localStorage.getItem("turn");
    return turnFromLocalStorage ?? TURNS.X
  });
  const [winner, setWinner] = useState(null);

  function updateBoard(index) {
    if (board[index] || winner) return;

    // props should always be immutable! => render issues
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      confetti();
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
    }
  }

  function checkEndGame(boardToCheck) {
    return boardToCheck.every((square) => square !== null);
  }

  function checkWinner(boardToCheck) {
    for (const [a, b, c] of WINNING_COMBINATIONS) {
      if (boardToCheck[a] && boardToCheck[a] === boardToCheck[b] && boardToCheck[a] === boardToCheck[c]) {
        return boardToCheck[a];
      }
    }
    return null;
  }

  function resetGame() {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
  }

  useEffect(() => {
    window.localStorage.setItem("turn", turn)
  }, [turn]);

  useEffect(() => {
    window.localStorage.setItem("board", JSON.stringify(board))
  }, [board]);

  useEffect(() => {
    window.localStorage.removeItem("board")
    window.localStorage.removeItem("turn")
  }, [winner]);

  return (
    <main className="board">
      <h1>Tic tac toe</h1>
      <button onClick={resetGame}>Empezar de nuevo</button>
      <section className="game">
        {board.map((_, index) => (
          <Square key={index} updateBoard={updateBoard} index={index}>
            {board[index]}
          </Square>
        ))}
      </section>

      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

      <WinnerModal winner={winner} resetGame={resetGame} />
    </main>
  );
}

export default App;
