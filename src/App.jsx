import "./App.css";
import { makeShuffledDeck, playRound } from "./utils.jsx";
import { useState } from "react";

function App(props) {
  // Set default value of card deck to new shuffled deck
  const [cardDeck, setCardDeck] = useState(makeShuffledDeck());
  // currCards holds the cards from the current round
  const [currCards, setCurrCards] = useState([]);

  // const dealCards = () => {
  //   const newCurrCards = [cardDeck.pop(), cardDeck.pop()];
  //   setCurrCards(newCurrCards);
  // };
  //NA

  const [winner, setWinner] = useState(null);
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const dealCards = () => {
    if (cardDeck.length < 2) {
      setGameOver(true);
    } else {
      const roundResult = playRound(cardDeck);
      setCurrCards([roundResult.player1Card, roundResult.player2Card]);
      setWinner(roundResult.winner);
      setCardDeck(roundResult.deck);
      updateScore(roundResult.winner);
    }
  };

  const updateScore = (winner) => {
    if (winner === "Player 1") {
      setPlayer1Score(player1Score + 1);
    } else if (winner === "Player 2") {
      setPlayer2Score(player2Score + 1);
    }
  };
  const restartGame = () => {
    setCardDeck(makeShuffledDeck());
    setCurrCards([]);
    setWinner(null);
    setPlayer1Score(0);
    setPlayer2Score(0);
    setGameOver(false);
  };

  // You can write JavaScript here, just don't try and set your state!

  // You can access your current components state here, as indicated below
  const currCardElems = currCards.map(({ name, suit }) => (
    // Give each list element a unique key
    <div key={`${name}${suit}`}>
      {name} of {suit}
    </div>
  ));

  return (
    <>
      <div className="card">
        <h2>React High Card 🚀</h2>
        {currCardElems}
        {winner && <p>Winner: {winner}</p>}
        {gameOver && (
          <div>
            <p>Game Over!</p>
            <p>Final Score:</p>
            <p>Player 1: {player1Score}</p>
            <p>Player 2: {player2Score}</p>
            {player1Score > player2Score && <p>Player 1 wins!</p>}
            {player2Score > player1Score && <p>Player 2 wins!</p>}
            {player1Score === player2Score && <p>It's a tie!</p>}
            <button onClick={restartGame}>Restart Game</button>
          </div>
        )}
        <br />
        {!gameOver && <button onClick={dealCards}>Deal</button>}
        <p>Player 1 Score: {player1Score}</p>
        <p>Player 2 Score: {player2Score}</p>
      </div>
    </>
  );
}

export default App;
