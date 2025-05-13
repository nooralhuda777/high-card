// Get a random index ranging from 0 (inclusive) to max (exclusive).
const getRandomIndex = (max) => Math.floor(Math.random() * max);

// Shuffle an array of cards
const shuffleCards = (cards) => {
  // Loop over the card deck array once
  for (let currentIndex = 0; currentIndex < cards.length; currentIndex += 1) {
    // Select a random index in the deck
    const randomIndex = getRandomIndex(cards.length);
    // Select the card that corresponds to randomIndex
    const randomCard = cards[randomIndex];
    // Select the card that corresponds to currentIndex
    const currentCard = cards[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    cards[currentIndex] = randomCard;
    cards[randomIndex] = currentCard;
  }
  // Return the shuffled deck
  return cards;
};

const makeDeck = () => {
  // Initialise an empty deck array
  const newDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  const suits = ["Hearts", "Diamonds", "Clubs", "Spades"];

  // Loop over the suits array
  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    // Store the current suit in a variable
    const currentSuit = suits[suitIndex];

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      // By default, card name and card rank are the same as rankCounter
      let cardName = `${rankCounter}`;
      let cardRank = rankCounter;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName === "1") {
        cardName = "Ace";
        // Ace has higher rank than all other cards
        cardRank = 14;
      } else if (cardName === "11") {
        cardName = "Jack";
      } else if (cardName === "12") {
        cardName = "Queen";
      } else if (cardName === "13") {
        cardName = "King";
      }

      // Create a new card with the current name, suit, and rank
      const card = {
        name: cardName,
        suit: currentSuit,
        rank: cardRank,
      };

      // Add the new card to the deck
      newDeck.push(card);
    }
  }

  // Return the completed card deck
  return newDeck;
};

//NA: takes the shuffled deck as an argument and returns an object with two properties:
const dealCards = (deck) => {
  const player1Card = deck.pop();
  const player2Card = deck.pop();
  return { player1Card, player2Card };
};
const determineWinner = (player1Card, player2Card) => {
  if (player1Card.rank > player2Card.rank) {
    return "Player 1";
  } else if (player2Card.rank > player1Card.rank) {
    return "Player 2";
  } else {
    // Handle tiebreaker logic, e.g., compare suits or use a random winner
    return "Tie";
  }
};
export const playRound = (deck) => {
  const { player1Card, player2Card } = dealCards(deck);
  const winner = determineWinner(player1Card, player2Card);
  const newDeck = [...deck]; // Create a copy of the original deck
  newDeck.pop(); // Remove the top two cards from the deck
  newDeck.pop();
  return { player1Card, player2Card, winner, deck: newDeck }; // Return the new deck
};

// Export functionality to create a shuffled 52-card deck
export const makeShuffledDeck = () => shuffleCards(makeDeck());
//
// Example usage:
const deck = makeShuffledDeck();
const roundResult = playRound(deck);
console.log(
  `Player 1 card: ${roundResult.player1Card.name} of ${roundResult.player1Card.suit}`
);
console.log(
  `Player 2 card: ${roundResult.player2Card.name} of ${roundResult.player2Card.suit}`
);
console.log(`Winner: ${roundResult.winner}`);
