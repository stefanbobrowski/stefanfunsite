import React, { useState, useEffect } from "react";
import { useRoutes, usePath, A } from "hookrouter";
// import { pseudoRandomBytes } from "crypto";

const BlackJack2 = () => {
  const defaultGameStates = {
    playerBet: false,
    cardsDealt: false,
    playerTurn: false,
    playerHit: false,
    playerStand: false,
    playerDoubleDown: false,
    playerCanSplit: false,
    playerSplit: false,
    dealerTurn: false,
    playerBlackjack: false,
    dealerBlackjack: false,
    player21: false,
    dealer21: false,
    playerBust: false,
    dealerBust: false,
    gameOver: false
  };
  const [gameStates, setGameStates] = useState({});
  const defaultDeck = [
    { card: "2", suit: "♠️", val: 2 },
    { card: "2", suit: "♥️", val: 2 },
    { card: "2", suit: "♦️", val: 2 },
    { card: "2", suit: "♣️", val: 2 },
    { card: "3", suit: "♠️", val: 3 },
    { card: "3", suit: "♥️", val: 3 },
    { card: "3", suit: "♦️", val: 3 },
    { card: "3", suit: "♣️", val: 3 },
    { card: "4", suit: "♠️", val: 4 },
    { card: "4", suit: "♥️", val: 4 },
    { card: "4", suit: "♦️", val: 4 },
    { card: "5", suit: "♥️", val: 5 },
    { card: "5", suit: "♦️", val: 5 },
    { card: "5", suit: "♣️", val: 5 },
    { card: "6", suit: "♣️", val: 6 },
    { card: "Q", suit: "♠️", val: 10 },
    { card: "Q", suit: "♥️", val: 10 },
    { card: "Q", suit: "♦️", val: 10 },
    { card: "7", suit: "♥️", val: 7 },
    { card: "7", suit: "♦️", val: 7 },
    { card: "7", suit: "♣️", val: 7 },
    { card: "8", suit: "♦️", val: 8 },
    { card: "5", suit: "♠️", val: 5 },
    { card: "8", suit: "♣️", val: 8 },
    { card: "6", suit: "♠️", val: 6 },
    { card: "7", suit: "♠️", val: 7 },
    { card: "6", suit: "♥️", val: 6 },
    { card: "8", suit: "♠️", val: 8 },
    { card: "6", suit: "♦️", val: 6 },
    { card: "4", suit: "♣️", val: 4 },
    { card: "A", suit: "♥️", val: 1 },

    { card: "A", suit: "♦️", val: 1 },
    { card: "Q", suit: "♣️", val: 10 },

    { card: "A", suit: "♣️", val: 1 },

    { card: "8", suit: "♥️", val: 8 },
    { card: "A", suit: "♠️", val: 1 }
  ];
  const [deck, setDeck] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);

  const [pot, setPot] = useState(0);
  const [betAmount, SetBetAmount] = useState(100);
  const [bank, setBank] = useState(1000);

  const [playerHandValue, setPlayerHandValue] = useState(0);
  const [dealerHandValue, setDealerHandValue] = useState(0);

  const [splitA, setSplitA] = useState([]);
  const [splitAValue, setSplitAValue] = useState(0);
  const [splitB, setSplitB] = useState([]);
  const [splitBValue, setSplitBValue] = useState(0);
  const [currentSplit, setCurrentSplit] = useState("a");

  // Effects
  useEffect(() => {
    newGame();
  }, []);

  useEffect(() => {
    console.log(gameStates);
  }, [gameStates]);

  useEffect(() => {
    console.log(deck);
  }, [deck]);

  useEffect(() => {
    // playerHand
    if (playerHand.length > 0) {
      let newPlayerHandValue = calculateHandValue(playerHand);
      setPlayerHandValue(newPlayerHandValue);
    }
  }, [playerHand]);

  useEffect(() => {
    // dealerHand
    if (dealerHand.length > 0) {
      let newDealerHandValue = calculateHandValue(dealerHand);
      setDealerHandValue(newDealerHandValue);
    }
  }, [dealerHand]);

  useEffect(() => {
    // playerHandValue
    checkPlayerGameConditions(playerHandValue);
  }, [playerHandValue]);

  useEffect(() => {
    // dealerHandValue
    checkDealerGameConditions(dealerHandValue);
  }, [dealerHandValue]);

  useEffect(() => {
    // splitAHand
    if (splitA.length > 0) {
      let newSplitAValue = calculateHandValue(splitA);
      setSplitAValue(newSplitAValue);
    }
  }, [splitA]);

  useEffect(() => {
    // splitBHand
    if (splitB.length > 0) {
      let newSplitBValue = calculateHandValue(splitB);
      setSplitBValue(newSplitBValue);
    }
  }, [splitB]);

  useEffect(() => {
    // splitAValue
    checkPlayerGameConditions(splitAValue);
  }, [splitAValue]);

  useEffect(() => {
    // splitBValue
    checkPlayerGameConditions(splitBValue);
  }, [splitBValue]);

  useEffect(() => {
    // playerBet
    if (gameStates.playerBet == true) {
      initialDeal();
    }
  }, [gameStates.playerBet]);

  useEffect(() => {
    // playerHit
    if (gameStates.playerHit == true) {
    }
  }, [gameStates.playerHit]);

  useEffect(() => {
    // playerStand
    if (gameStates.playerStand == true) {
      setGameStates({ ...gameStates, playerTurn: false, dealerTurn: true });
    }
  }, [gameStates.playerStand]);

  useEffect(() => {
    // playerDoubleDown
    if (gameStates.playerDoubleDown == true) {
      setGameStates({ ...gameStates, playerTurn: false, dealerTurn: true });
    }
  }, [gameStates.playerDoubleDown]);
  useEffect(() => {
    // playerSplit
    if (gameStates.playerSplit == true) {
      let card1 = playerHand[0];
      let card2 = playerHand[1];
      let deckCopy = deck;
      let aCard = deckCopy.pop();
      let bCard = deckCopy.pop();
      setSplitA([card1, aCard]);
      setSplitB([card2, bCard]);
      setDeck(deckCopy);
      setGameStates({ ...gameStates, playerTurn: false, dealerTurn: true });
    }
  }, [gameStates.playerSplit]);

  useEffect(() => {
    //playerBlackjack
    if (gameStates.playerBlackjack == true) {
      handlePlayerWin();
    }
  }, [gameStates.playerBlackjack]);

  useEffect(() => {
    //player21
    if (gameStates.player21 == true) {
      handlePlayerWin();
    }
  }, [gameStates.player21]);

  useEffect(() => {
    //playerBust
    if (gameStates.playerBust == true) {
      handlePlayerLoss();
    }
  }, [gameStates.playerBust]);

  useEffect(() => {
    //dealerTurn
    if (gameStates.dealerTurn == true) {
      handleDealerTurn();
    }
  }, [gameStates.dealerTurn]);

  // Functions
  Array.prototype.shuffle = function() {
    let m = this.length,
      i;
    while (m) {
      i = (Math.random() * m--) >>> 0;
      [this[m], this[i]] = [this[i], this[m]];
    }
    return this;
  };

  const calculateHandValue = hand => {
    console.log(hand);
    let handValue = 0;
    let aceHighValue = 0;
    let splitValue = 0;

    for (let i = 0; i < hand.length; i++) {
      let cardValue = hand[i].val;
      handValue += cardValue;

      // Split check
      if (gameStates.playerHit == false && cardValue == splitValue) {
        setGameStates({ ...gameStates, playerCanSplit: true });
      } else {
        splitValue = cardValue;
      }

      // Aces check
      if (cardValue == 1) {
        if (aceHighValue == 0) {
          aceHighValue = handValue + 10;
        } else {
          aceHighValue += 1;
        }
      }
    }

    if (aceHighValue > 0 && handValue < 12) {
      // If hand contains Aces and total value < 12, use Ace value of 11, else use default value of 1.
      return aceHighValue;
    } else {
      return handValue;
    }
  };

  const checkPlayerGameConditions = value => {
    let playerBlackJack;
    let playerBust;
    let player21;

    if (value == 21) {
      if (
        gameStates.playerHit == false &&
        gameStates.playerDoubleDown == false
      ) {
        // Player Blackjack (on flop)
        setGameStates({
          ...gameStates,
          playerTurn: false,
          playerBlackjack: true,
          gameOver: true
        });
      } else {
        // Player 21
        setGameStates({
          ...gameStates,
          playerTurn: false,
          player21: true,
          gameOver: true
        });
      }
    } else if (value > 21) {
      // Player Bust
      setGameStates({
        ...gameStates,
        playerTurn: false,
        playerBust: true,
        gameOver: true
      });
    }
  };

  const checkDealerGameConditions = value => {};

  const newGame = () => {
    setGameStates(defaultGameStates);
    setPot(0);
    setDeck(defaultDeck);
    // setDeck(defaultDeck.shuffle());
    setPlayerHand([]);
    setDealerHand([]);
    setPlayerHandValue(0);
    setDealerHandValue(0);
  };

  const initialDeal = () => {
    let deckCopy = deck;
    for (let i = 0; i < 2; i++) {
      let playerCard = deckCopy.pop();
      let dealerCard = deckCopy.pop();
      setPlayerHand(playerHand => [...playerHand, playerCard]);
      setDealerHand(dealerHand => [...dealerHand, dealerCard]);
    }
    setDeck(deckCopy);
    setGameStates({ ...gameStates, cardsDealt: true, playerTurn: true });
  };

  const handlePlayerLoss = () => {
    setPot(0);

    // newGame();
  };

  const handlePlayerWin = () => {
    setBank(bank + pot);
  };

  // Button Handlers

  // Bet
  const handleBet = () => {
    setBank(bank - betAmount);
    setPot(pot + betAmount);
    setGameStates({ ...gameStates, playerBet: true });
    // initialDeal(); Do this function with playerBet effect instead
  };

  // Hit
  const handleHit = () => {
    let deckCopy = deck;
    let playerCard = deckCopy.pop();

    setPlayerHand(playerHand => [...playerHand, playerCard]);
    setDeck(deckCopy);
    setGameStates({ ...gameStates, playerHit: true });
  };

  // Stand
  const handleStand = () => {
    setGameStates({ ...gameStates, playerStand: true });
  };

  // Double Down
  const handleDoubleDown = () => {
    setBank(bank - betAmount);
    setPot(pot + betAmount);
    let deckCopy = deck;
    let playerCard = deckCopy.pop();
    setPlayerHand(playerHand => [...playerHand, playerCard]);
    setDeck(deckCopy);
    setGameStates({ ...gameStates, playerDoubleDown: true });
  };

  // Split
  const handleSplit = () => {
    setGameStates({ ...gameStates, playerSplit: true, playerCanSplit: false });
  };

  // Dealer Turn
  const handleDealerTurn = () => {
    console.log("dealer turn");
  };

  return (
    <div className="app blackjack">
      <div className="blackjack-room">
        <h2>BlackJack 2</h2>
        <p>Deck:</p>
        <div>
          {deck.map(card => (
            <span>{card.card}, </span>
          ))}
        </div>
        <p>Player Hand:</p>
        <div>
          {playerHand.map(card => (
            <span>{card.card}, </span>
          ))}

          {gameStates.playerSplit == true ? (
            <div>
              <p>Split A Hand:</p>
              <div>
                {splitA.map(card => (
                  <span>{card.card}, </span>
                ))}
              </div>
              <p>Split A Value: {splitAValue}</p>
              <p>Split B Hand:</p>
              <div>
                {splitB.map(card => (
                  <span>{card.card}, </span>
                ))}
              </div>
              <p>Split B Value: {splitBValue}</p>
            </div>
          ) : null}
        </div>
        <p>Player Hand Value:</p>
        <div>
          <span>{playerHandValue}</span>
        </div>
        <p>Dealer Hand:</p>
        <div>
          {dealerHand.map(card => (
            <span>{card.card}, </span>
          ))}
        </div>
        <p>Dealer Hand Value:</p>
        <div>
          <span>{dealerHandValue}</span>
        </div>
        <div>
          <p>Bank:</p>
          <span>{bank}</span>
        </div>
        <div>
          <p>Pot:</p>
          <span>{pot}</span>
        </div>

        <div id="player-controls">
          <button onClick={handleBet} disabled={gameStates.playerBet}>
            Bet {betAmount}
          </button>
          <button onClick={handleHit} disabled={!gameStates.playerTurn}>
            Hit
          </button>
          <button onClick={handleStand} disabled={!gameStates.playerTurn}>
            Stand
          </button>
          <button
            onClick={handleDoubleDown}
            disabled={
              !gameStates.playerTurn ||
              gameStates.playerHit ||
              gameStates.playerSplit
            }
          >
            Double Down
          </button>
          <button
            onClick={handleSplit}
            disabled={!gameStates.playerCanSplit || gameStates.playerHit}
          >
            Split
          </button>
        </div>

        <div className="results">
          <p>Result Message:</p>
          {gameStates.playerBlackjack == true ? (
            <p>Player has Blackjack!</p>
          ) : null}

          {gameStates.playerBust == true ? <p>Player has busted!</p> : null}
        </div>
        {gameStates.gameOver == true ? (
          <button onClick={newGame}>Another round?</button>
        ) : null}
      </div>

      <A href="/work" className="back-link">
        Back to Work
      </A>
    </div>
  );
};

export default BlackJack2;
