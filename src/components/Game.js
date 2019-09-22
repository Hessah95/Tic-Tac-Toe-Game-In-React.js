import React, { Component } from "react";
import Board from "./Board";
import { createSecureContext } from "tls";

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      xIsNext: true,
      stepNumber: 0,
      history: [{ squares: Array(9).fill(null) }]
    };
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0
    });
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const winner = calculateWinner(squares);
    if (winner || squares[i]) {
      // if we have a winner there is no need to continue play
      // of is the square has a letter before ... the next user can not change it
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat({
        squares: squares
      }),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const moves = history.map((step, move) => {
      const desc = move ? "Go to #" + move : "Start the game";
      return (
        <li key={move}>
          <button
            className="button_cont"
            onClick={() => {
              this.jumpTo(move);
            }}
          >
            {desc}
          </button>
        </li>
      );
    });

    let status, win;
    if (winner) {
      win = "Winner is " + winner;
    } else {
      status = "Next player is " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div>
        <div className="title">
          <h1>Tic-Tac-Toe Game</h1>
        </div>

        <div className="game">
          <div className="game-board">
            <Board
              onClick={i => this.handleClick(i)}
              squares={current.squares}
            />
          </div>
          <div className="game-info">
            <div>
              <h3 className="status">{status}</h3>
              <h2 className="win">{win}</h2>
            </div>
            <ul>{moves}</ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Game;

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
      // if there is X or O inside this square
      // and the the three squares have the same letter
      return squares[a];
    }
  }
  return null;
}
