import React, { useState, useEffect } from "react";
import { useRoutes, usePath, A } from "hookrouter";

import shuffle1 from "../Blackjack/assets/shuffle.wav";
import shuffle2 from "../Blackjack/assets/bridge.wav";

const Blackjack = () => {
  // -- States --
  const defaultGamePhases = {
    betting: 1,
    dealing: false,
    playerTurn: false,
    dealerTurn: false,
    splitting: false,
    gameOver: false,
    blackjack: false,
    cardsDealt: false,
    playerHit: false,
    playerDoubleDown: false,
    playerCanSplit: false,
    cardsSplit: false
  };
  const [gamePhases, setGamePhases] = useState(defaultGamePhases);
  const defaultDeck = [
    { card: "2", suit: "♠️", val: 2 },
    { card: "5", suit: "♣️", val: 5 },
    { card: "6", suit: "♣️", val: 6 },
    { card: "Q", suit: "♠️", val: 10 },
    { card: "8", suit: "♥️", val: 8 },
    { card: "Q", suit: "♦️", val: 10 },
    { card: "7", suit: "♥️", val: 7 },
    { card: "5", suit: "♠️", val: 5 },
    { card: "6", suit: "♠️", val: 6 },
    { card: "7", suit: "♠️", val: 7 },
    { card: "6", suit: "♥️", val: 6 },

    { card: "8", suit: "♦️", val: 8 },
    { card: "4", suit: "♣️", val: 4 },
    { card: "7", suit: "♣️", val: 7 },
    { card: "2", suit: "♦️", val: 2 },
    { card: "8", suit: "♣️", val: 8 },
    { card: "Q", suit: "♥️", val: 10 },
    { card: "2", suit: "♥️", val: 2 },
    { card: "A", suit: "♠️", val: 1 },
    { card: "A", suit: "♦️", val: 1 },
    { card: "A", suit: "♥️", val: 1 },
    { card: "3", suit: "♠️", val: 3 },
    { card: "2", suit: "♣️", val: 2 },
    { card: "7", suit: "♦️", val: 7 },
    { card: "6", suit: "♦️", val: 6 },
    { card: "8", suit: "♠️", val: 8 },
    { card: "A", suit: "♣️", val: 1 },
    { card: "Q", suit: "♣️", val: 10 }
  ];
  const [deck, setDeck] = useState(defaultDeck);
  const [playerHand, setPlayerHand] = useState([]);
  const [playerValue, setPlayerValue] = useState(0);
  const [dealerHand, setDealerHand] = useState([]);
  const [dealerValue, setDealerValue] = useState(0);
  const [bet, setBet] = useState(0);
  const [betAmount, setBetAmount] = useState(100);
  const [bank, setBank] = useState(1000);
  const [result, setResult] = useState("");

  const [messageLog, setMessageLog] = useState([
    "💬 Welcome to Blackjack!",
    "💬 Place your bets!"
  ]);

  const [hiddenValue, setHiddenValue] = useState(0);

  const [playSound, setPlaySound] = useState(0);

  const [splitHands, setSplitHands] = useState([]);

  //-- Effects --
  useEffect(() => {
    // newGame();
  }, []);
  // gamePhases
  useEffect(() => {
    console.log(gamePhases);
  }, [gamePhases]);
  // betting
  useEffect(() => {}, [gamePhases.betting]);
  // dealing
  useEffect(() => {
    if (gamePhases.dealing == true) {
      dealCards();
    }
  }, [gamePhases.dealing]);
  // cardsDealt
  useEffect(() => {
    if (gamePhases.cardsDealt == true) {
    }
  }, [gamePhases.cardsDealt]);

  // playerTurn
  useEffect(() => {
    // Check for Split
    if (gamePhases.playerTurn == true && gamePhases.playerHit == false) {
      let card1 = playerHand[0].val;
      let card2 = playerHand[1].val;
      if (card1 == card2) {
        setGamePhases({ ...gamePhases, playerCanSplit: true });
        setMessageLog([...messageLog, "💬 Player can Split."]);
      }
    }

    // if (gamePhases.playerTurn == false && gamePhases.cardsDealt == true) {
    //   handleDealerTurn();
    // }
  }, [gamePhases.playerTurn]);

  useEffect(() => {
    // playerDoubleDown
    if (gamePhases.playerDoubleDown == true) {
      setMessageLog([...messageLog, "💬 Player Doubles Down!"]);
    }
  }, [gamePhases.playerDoubleDown]);

  useEffect(() => {
    if (gamePhases.dealerTurn == true) {
      setMessageLog(messageLog => [...messageLog, "💬 Dealer Turn!"]);
      handleDealerTurn();
    }
  }, [gamePhases.dealerTurn]);

  // gameover
  useEffect(() => {
    if (gamePhases.gameOver == true) {
      setBet(0);
    }
  }, [gamePhases.gameOver]);

  // playerHand
  useEffect(() => {
    let playerVal = calculateHandValue(playerHand);
    setPlayerValue(playerVal);
  }, [playerHand]);

  // playerValue
  useEffect(() => {
    if (playerValue > 0) {
      if (playerValue == 21) {
        if (gamePhases.dealing == true) {
          handleBlackjack();
        } else {
          // check player21
          setMessageLog([...messageLog, "💬 Player makes 21!"]);
          setGamePhases({ ...gamePhases, dealerTurn: true });
          // handleDealerTurn();
        }
      } else if (playerValue > 21) {
        handleBust();
      } else if (gamePhases.playerDoubleDown == true) {
        console.log("plauya dubled");
      } else {
        console.log("Start Player Turn");
        handlePlayerTurn();
      }
    }
  }, [playerValue]);

  // dealerHand
  useEffect(() => {
    let dealerVal = calculateHandValue(dealerHand);
    setDealerValue(dealerVal);
  }, [dealerHand]);

  // dealerValue
  useEffect(() => {
    let dealerVal = dealerValue;
    let dealing = gamePhases.dealing;
    let dealerTurn = gamePhases.dealerTurn;

    if (dealing) {
      if (dealerVal == 21) {
        setMessageLog([...messageLog, "💬 Dealer Has Blackjack!"]);
        handleBlackjack();
      }
    }

    if (dealerTurn) {
      setMessageLog([...messageLog, `💬 Dealer turns ${dealerVal}!`]);
      handleDealerTurn();
    }
  }, [dealerValue]);

  useEffect(() => {
    // Message Log
    const msgs = document.getElementById("messages");
    msgs.scrollTop = msgs.scrollHeight;
  }, [messageLog]);

  //-- Functions --
  // dealCards();
  const dealCards = () => {
    let deckCopy = deck;
    for (let i = 0; i < 2; i++) {
      let playerCard = deckCopy.pop();
      let dealerCard = deckCopy.pop();

      if (i == 0) {
        let hiddenVal = 0;
        console.log(dealerCard.val);
        if (dealerCard.val == 1) {
          dealerCard.val = 11;
        }
        hiddenVal = dealerCard.val;
        setHiddenValue(hiddenVal);
      }

      setPlayerHand(playerHand => [...playerHand, playerCard]);
      setDealerHand(dealerHand => [...dealerHand, dealerCard]);
    }
    setDeck(deckCopy);
    setGamePhases({ ...gamePhases, cardsDealt: true });
    setMessageLog([...messageLog, "💬 Cards dealt."]);
  };

  // calculateHandValue(hand);
  const calculateHandValue = hand => {
    let handValue = 0;
    let aceCount = 0;

    for (let i = 0; i < hand.length; i++) {
      let cardValue = hand[i].val;
      handValue += cardValue;
      // Aces check
      if (cardValue == 1) {
        aceCount++;
        if (handValue < 12) {
          handValue += 10;
        }
      }
    }

    if (handValue > 21 && aceCount > 0) {
      // betential Ace Bust
      let lowAceValue = 0;
      for (let i = 0; i < hand.length; i++) {
        let cardValue = hand[i].val;
        lowAceValue += cardValue;
      }
      return lowAceValue;
    } else {
      return handValue;
    }
  };

  // handleBlackjack();
  const handleBlackjack = () => {
    setGamePhases({ ...gamePhases, blackjack: true, gameOver: true });
    let playerVal = playerValue;
    let dealerVal = dealerValue;
    console.log(playerVal);
    console.log(dealerVal);
    if (playerVal == dealerVal) {
      setMessageLog([...messageLog, "Blackjack push! :O"]);
      setResult("Blackjack Push!");
      setBank(bank + bet);
    } else if (playerVal == 21) {
      let winnings = bet * 2.5;
      setMessageLog([...messageLog, "Player Blackjack! :D", `💵 +${winnings}`]);
      setResult(`Player Blackjack! +${winnings}`);
      setBank(bank + bet * 2.5);
    } else if (dealerVal == 21) {
      setMessageLog([...messageLog, "Dealer Blackjack :("]);
      setResult("Dealer Blackjack!");
    }
  };

  // handleBust();
  const handleBust = () => {
    let playerVal = playerValue;
    let dealerVal = dealerValue;
    if (playerVal > 21) {
      setMessageLog([...messageLog, "💬 Player Bust :(!"]);
      setResult("Player Bust!");
    } else if (dealerVal > 21) {
      setMessageLog([...messageLog, "💬 Dealer Busts!", `💵 +${bet * 2}`]);
      setResult("Dealer Bust!");
      setBank(bank + bet * 2);
    }
    setGamePhases({ ...gamePhases, gameOver: true });
  };

  // handleBet();
  const handleBet = () => {
    setPlaySound(0);
    if (bank >= betAmount) {
      setBank(bank - betAmount);
      setBet(bet + betAmount);
      setMessageLog([
        ...messageLog,
        `💵 -${betAmount}`,
        `💬 Player Bets 💵${betAmount}`,
        "💬 Dealing Cards..."
      ]);
      setGamePhases({ ...gamePhases, betting: 0, dealing: true });
    } else {
      setMessageLog([...messageLog, "💬 Not enough cash kid... Scram!"]);
    }
  };

  //handlePlayerTurn();
  const handlePlayerTurn = () => {
    setMessageLog([...messageLog, "💬 Player Turn..."]);
    setGamePhases({ ...gamePhases, dealing: false, playerTurn: true });
  };

  // handleDealerTurn();
  const handleDealerTurn = () => {
    let dealerTurn = gamePhases.dealerTurn;
    if (dealerTurn == false) {
      setGamePhases({ ...gamePhases, dealerTurn: true });
    }

    let dealerVal = dealerValue;

    console.log("dealer Value:");
    console.log(dealerVal);

    if (dealerVal > 21) {
      handleBust();
    } else if (dealerVal == 21 || dealerValue >= 17) {
      setMessageLog([...messageLog, "*Dealer Stands*"]);
      handleShowdown();
    } else if (dealerVal < 17) {
      setMessageLog([...messageLog, "*Dealer Hits*"]);
      let deckCopy = deck;
      let dealerCard = deckCopy.pop();
      setDealerHand(dealerHand => [...dealerHand, dealerCard]);
      setDeck(deckCopy);
    }

    // if (dealerVal > 21) {
    //   handleBust();
    // } else if (dealerVal == 21) {
    //   if (gamePhases.dealing == true) {
    //     // setGamePhases({ ...gamePhases, dealerTurn: true });
    //   } else {
    //     handleShowdown();
    //   }
    // } else if (dealerVal >= 17) {
    //   console.log("dealer has >= 17 or 21 let's go to showdown");
    //   setMessageLog([...messageLog, "💬 Showdown Baby"]);
    //   handleShowdown();
    // } else if (dealerVal < 17 && dealerVal > 0) {
    //   // dealer Hit
    //   console.log("dealer hit");
    //   let deckCopy = deck;
    //   let dealerCard = deckCopy.pop();
    //   setDealerHand(dealerHand => [...dealerHand, dealerCard]);
    //   setDeck(deckCopy);
    // }

    // if (dealerVal >= 17) {
    //   console.log("right here shitta");
    //   setMessageLog([...messageLog, "go fuck ay asd"]);
    //   if (dealerVal > 21) {

    //   } else {
    //     console.log("shodown baby?");
    //     setMessageLog(messageLog => [...messageLog, "💬 Showdown Baby"]);
    //     // Stand/showdown
    //     handleShowdown();
    //   }
    // } else if (dealerVal < 17) {
    //   // dealer Hit
    //   let deckCopy = deck;
    //   let dealerCard = deckCopy.pop();
    //   setDealerHand(dealerHand => [...dealerHand, dealerCard]);
    //   setDeck(deckCopy);
    // }
  };

  // handleHit();
  const handleHit = () => {
    setMessageLog([...messageLog, `💬 Player Hits!`]);
    let deckCopy = deck;
    let playerCard = deckCopy.pop();
    setPlayerHand(playerHand => [...playerHand, playerCard]);
    setDeck(deckCopy);
    if (gamePhases.playerHit == false) {
      setGamePhases({ ...gamePhases, playerHit: true });
    }
  };

  // handleStand();
  const handleStand = () => {
    setGamePhases({ ...gamePhases, playerTurn: false, dealerTurn: true });
    setMessageLog([...messageLog, `💬 Player Stands with ${playerValue}`]);
  };

  // handleDoubleDown();
  const handleDoubleDown = () => {
    setBank(bank - betAmount);
    setMessageLog([
      ...messageLog,
      "💬 Player Doubles Down!",
      `💵 -${betAmount}`
    ]);

    setBet(bet + betAmount);
    let deckCopy = deck;
    let playerCard = deckCopy.pop();
    setPlayerHand(playerHand => [...playerHand, playerCard]);
    setDeck(deckCopy);
    setGamePhases({
      ...gamePhases,
      playerDoubleDown: true,
      playerTurn: false,
      dealerTurn: true
    });
  };

  // handleSplit();
  const handleSplit = () => {
    setMessageLog([...messageLog, "💬 Player Splits!"]);
    console.log("split em up!");
    setGamePhases({ ...gamePhases, splitting: true, playerCanSplit: false });
  };

  // handleShowdown();
  const handleShowdown = () => {
    let playerVal = playerValue;
    let dealerVal = dealerValue;

    if (playerVal == dealerVal) {
      setResult("Push!");
      setBank(bank + bet);
      setMessageLog([...messageLog, "Push!", `💵 +${bet}`]);
    } else if (playerVal > dealerVal) {
      setMessageLog([...messageLog, "Players Wins!", `💵 +${bet * 2}`]);
      setResult(`Player Wins with ${playerVal}!`);
      setBank(bank + bet * 2);
    } else if (playerVal < dealerVal) {
      setMessageLog([...messageLog, "Dealer Wins"]);
      setResult(`Dealer Wins with ${dealerVal}!`);
    }

    setGamePhases({ ...gamePhases, gameOver: true });
  };

  // newGame();
  const newGame = () => {
    setPlaySound(1);
    setGamePhases(defaultGamePhases);
    setBet(0);
    setDeck(defaultDeck.shuffle());
    setPlayerHand([]);
    setDealerHand([]);
    setPlayerValue(0);
    setDealerValue(0);
    setHiddenValue(0);
    setMessageLog([
      ...messageLog,
      "~~~~~~~~~~~~~",
      "*Cards Shuffled*",
      "Place your bets!"
    ]);
  };

  // ARRAY.shuffle()
  Array.prototype.shuffle = function() {
    let m = this.length,
      i;
    while (m) {
      i = (Math.random() * m--) >>> 0;
      [this[m], this[i]] = [this[i], this[m]];
    }
    return this;
  };

  return (
    <div>
      <h1 className="page-header">Blackjack App</h1>
      <p>
        Blackjack app programmed with JavaScript and React. Includes audio! Code
        coming when more polished.
      </p>
      <div className="app blackjack">
        <div className="blackjack-room">
          <div className="debug-console">
            <h2>Debug Console</h2>
            {Object.keys(gamePhases).map((phase, index) => (
              <p key={index}>
                {phase}: {gamePhases[phase].toString()}
              </p>
            ))}
          </div>

          <div>
            <div className="message-log">
              {/* <h2>Message Log:</h2> */}
              <div id="messages">
                {messageLog.map((msg, index) => (
                  <p key={index}>{msg.toString()}</p>
                ))}
              </div>
            </div>
          </div>

          <div className="dealer-avatar">
            <span>🤵🏼‍</span>
          </div>

          <section className="blackjack-table">
            <div className="table-text">
              <h4>Blackjack pays 3 to 2</h4>
              <h5>Dealer draws to 16 and stands on all 17's</h5>
            </div>
            <div className="dealer-hand">
              <div className="hand-value">
                {gamePhases.gameOver ? (
                  <span>{dealerValue}</span>
                ) : (
                  <span>{hiddenValue}</span>
                )}
              </div>

              {/* <p>Dealer: {dealerValue}</p> */}
              {dealerHand.map((card, index) => {
                if (index == 1) {
                  return (
                    <div className={`card ${card.suit}`} key={index}>
                      <div
                        className={
                          gamePhases.dealerTurn || gamePhases.gameOver
                            ? ""
                            : "facedown"
                        }
                      >
                        <span>{card.card}</span>
                        <span>{card.suit}</span>
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div className={`card ${card.suit}`} key={index}>
                      <span>{card.card}</span>
                      <span>{card.suit}</span>
                    </div>
                  );
                }
              })}
            </div>
            <div className="player-hand">
              <div className="hand-value">
                <span>{playerValue}</span>
              </div>
              {playerHand.map((card, index) => (
                <div className={`card ${card.suit}`} key={index}>
                  <span>{card.card}</span>
                  <span>{card.suit}</span>
                </div>
              ))}
            </div>
            <div className="bet-circle">
              <span>Bet: ${bet}</span>

              <div className={`bet ${!gamePhases.betting ? "place-bet" : ""}`}>
                {!gamePhases.betting ? "💵" : null}
              </div>
              <div
                className={`dd ${
                  gamePhases.playerDoubleDown ? "place-dd" : ""
                }`}
              >
                {gamePhases.playerDoubleDown ? "💵" : null}
              </div>
            </div>
          </section>

          <footer>
            <div className="bank">
              <span>Bank: 💵{bank}</span>
            </div>

            <div id="player-controls">
              {gamePhases.gameOver == true ? (
                <div className="results">
                  <p>{result}</p>
                  <button onClick={newGame}>New Game</button>
                </div>
              ) : null}
              <button onClick={handleBet} disabled={!gamePhases.betting}>
                Bet {betAmount}
              </button>
              <button
                onClick={handleHit}
                disabled={!gamePhases.playerTurn || gamePhases.gameOver}
              >
                Hit
              </button>
              <button
                onClick={handleStand}
                disabled={!gamePhases.playerTurn || gamePhases.gameOver}
              >
                Stand
              </button>
              <button
                onClick={handleSplit}
                disabled={!gamePhases.playerCanSplit || gamePhases.playerHit}
              >
                Split
              </button>

              <button
                onClick={handleDoubleDown}
                disabled={!gamePhases.playerTurn || gamePhases.playerHit}
              >
                Double Down
              </button>
              {/* <button
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
          </button> */}
            </div>
          </footer>
        </div>

        {/* <button onClick={() => setPlaySound(!playSound)}>play sound</button> */}
        <div id="audio-container">
          <div>
            {!gamePhases.betting ? <audio src={shuffle2} autoPlay /> : null}
          </div>
          <div>{playSound ? <audio src={shuffle1} autoPlay /> : null}</div>
        </div>
      </div>

      <A href="/work" className="back-link">
        Back to Work
      </A>
    </div>
  );
};

export default Blackjack;
