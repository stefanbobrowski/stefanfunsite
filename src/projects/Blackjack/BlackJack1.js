import React, { useState, useEffect } from "./node_modules/react";
import { useRoutes, usePath, A } from "./node_modules/hookrouter";

const BlackJack = () => {
  const defaultGameStates = {
    bet: 0,
    dealt: 0,
    playerTurn: 0,
    pAces: 0,
    hit: 0,
    stand: 0,
    dd: 0,
    dealerTurn: 0,
    dAces: 0,
    result: 0
  };
  const [gameStates, setGameStates] = useState(defaultGameStates);

  const [gameOver, setGameOver] = useState(0);

  const defaultDeck = [
    { card: "A", suit: "♠️", val: 11 },
    { card: "A", suit: "♥️", val: 11 },
    { card: "A", suit: "♦️", val: 11 },
    { card: "A", suit: "♣️", val: 11 },
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
    { card: "4", suit: "♣️", val: 4 },
    { card: "5", suit: "♠️", val: 5 },
    { card: "5", suit: "♥️", val: 5 },
    { card: "5", suit: "♦️", val: 5 },
    { card: "5", suit: "♣️", val: 5 },
    { card: "6", suit: "♠️", val: 6 },
    { card: "6", suit: "♥️", val: 6 },
    { card: "6", suit: "♦️", val: 6 },
    { card: "6", suit: "♣️", val: 6 },
    { card: "7", suit: "♠️", val: 7 },
    { card: "7", suit: "♥️", val: 7 },
    { card: "7", suit: "♦️", val: 7 },
    { card: "7", suit: "♣️", val: 7 },
    { card: "8", suit: "♠️", val: 8 },
    { card: "8", suit: "♥️", val: 8 },
    { card: "8", suit: "♦️", val: 8 },
    { card: "8", suit: "♣️", val: 8 }
  ];
  const [deck, setDeck] = useState(defaultDeck);

  const [dealerHand, setDealerHand] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerValue, setDealerValue] = useState(0);
  const [playerValue, setPlayerValue] = useState(0);
  const [pAces, setPAces] = useState([]);
  const [dAces, setDAces] = useState([]);
  const [dealerTurn, setDealerTurn] = useState(0);
  const [playerTurn, setPlayerTurn] = useState(0);
  const [bank, setBank] = useState(1000);
  const [pot, setPot] = useState(0);
  const [betAmt, setBetAmt] = useState(100);
  const [bet, setBet] = useState(0);
  const [hit, setHit] = useState(0);
  const [dd, setDd] = useState(0);
  const [stand, setStand] = useState(0);

  const [resultMessage, setResultMessage] = useState({
    result: "",
    message: ""
  });

  const [messageLog, setMessageLog] = useState([
    "Welcome to Blackjack!",
    "Place your bets!"
  ]);

  // Effects
  useEffect(() => {
    newGame();
    // Prism.highlightAll();
  }, []);

  // useEffect(() => {
  //   console.log("deck change");
  // }, [deck]);

  // useEffect(() => {
  //   console.log("table msg changed");
  // }, [tableMsg]);

  // useEffect(() => {
  //   console.log("bet change");
  // }, [bet]);

  // useEffect(() => {
  //   console.log("bank change");
  // }, [bank]);

  useEffect(() => {
    const msgs = document.getElementById("messages");
    msgs.scrollTop = msgs.scrollHeight;
  }, [messageLog]);

  //PLAYER
  useEffect(() => {
    if (playerTurn) {
      let messageLogCopy = messageLog;
      messageLogCopy.push("Player turn!");
      setMessageLog(messageLogCopy);
    }
  }, [playerTurn]);

  useEffect(() => {
    // let handVal = 0;
    // playerHand.forEach(c => {
    //   handVal += c.val;
    // });
    // setPlayerValue(handVal);
    calculateHandValue(playerHand, "player");
  }, [playerHand]);

  useEffect(() => {
    let messageLogCopy = messageLog;
    if (playerValue > 21) {
      if (pAces.length) {
        console.log("high ace value bust");
      } else {
        messageLogCopy.push("Player busts!");
        setMessageLog(messageLogCopy);
        setResultMessage({
          ...resultMessage,
          result: "lose",
          message: "Player Busts"
        });
        handleLose();
      }
    } else if (playerValue === 21) {
      if (hit || dd) {
        messageLogCopy.push("Player has 21!");
      } else {
        messageLogCopy.push("Player has Blackjack!");
      }
      setMessageLog(messageLogCopy);

      setTimeout(() => {
        setPlayerTurn(0);
        setDealerTurn(1);
        handleDealerTurn();
      }, 2000);
    }
  }, [playerValue]);

  // DEALER
  useEffect(() => {
    if (dealerTurn) {
      let messageLogCopy = messageLog;
      messageLogCopy.push("Dealer turn!");
      setMessageLog(messageLogCopy);
    }
  }, [dealerTurn]);

  useEffect(() => {
    calculateHandValue(dealerHand, "dealer");
  }, [dealerHand]);

  useEffect(() => {
    console.log("right here");
    console.log(dealerValue);

    if (dealerValue > 0) {
      if (dealerValue > 21) {
        if (dAces.length) {
          console.log(dAces[0]);
          console.log(dAces[1]);
        } else {
          console.log("dealer bust");
          setResultMessage({
            ...resultMessage,
            result: "win",
            message: "Dealer Busts!!"
          });
          handleWin();
        }
      } else if (dealerValue === 21) {
        console.log("Dealer Blackjack");
        setResultMessage({
          ...resultMessage,
          result: "lose",
          message: "Dealer Blackjack!"
        });
        handleLose();
      } else {
        if (dealerTurn) {
          if (dealerValue >= 17) {
            showDown();
          } else if (dealerValue < 17) {
            deal("dealer");
          }
        }
      }
    }
  }, [dealerValue]);

  // Helper Functions

  // Array Shuffle
  Array.prototype.shuffle = function() {
    let m = this.length,
      i;
    while (m) {
      i = (Math.random() * m--) >>> 0;
      [this[m], this[i]] = [this[i], this[m]];
    }
    return this;
  };

  // New Game
  const newGame = () => {
    console.log("New Game");
    setMessageLog(["New Game!"]);
    setGameOver(0);
    setDealerTurn(0);
    setBet(0);
    setDd(0);
    setDealerValue(0);
    setPlayerValue(0);
    setDealerHand([]);
    setPlayerHand([]);
    setDeck(defaultDeck.shuffle());
    setPlayerTurn(0);
  };

  const calculateHandValue = (hand, owner) => {
    let messageLogCopy = messageLog;
    let playerWin = 0;
    let handVal = 0;
    let aceCount = 0;
    let aces = [];

    for (let i = 0; i < hand.length; i++) {
      let cardVal = hand[i].val;
      if (cardVal === 11) {
        aceCount++;
      }
      handVal += cardVal;
    }

    if (aceCount > 0) {
      if (aceCount === 2) {
        let valA = 12;
        let valB = 2;
        aces.push(valA, valB);
        console.log(`${valA} / ${valB} / ${handVal}`);
      } else if (aceCount === 1) {
        let gr = handVal - 11;
        let valA = 1 + gr;
        aces.push(valA);
        console.log(`${valA} / ${handVal}`);
      }
    }

    if (owner === "player") {
      setPAces(aces);
      setPlayerValue(handVal);
    } else if (owner === "dealer") {
      setDAces(aces);
      if (dealerTurn) {
        setDealerValue(handVal);
      } else {
        if (hand.length) {
          setDealerValue(hand[1].val);
        }
      }
    }
  };

  const deal = target => {
    setGameStates({ ...gameStates, deal: "yup" });
    console.log(gameStates);
    console.log("Dealing Cards!");
    let deckCopy = [...deck];
    let dealerCopy = [...dealerHand];
    let playerCopy = [...playerHand];
    let messageLogCopy = messageLog;

    setTimeout(() => {
      if (target === "initial") {
        for (let i = 0; i < 2; i++) {
          playerCopy.push(deckCopy.pop());
          dealerCopy.push(deckCopy.pop());
        }
        setPlayerHand(playerCopy);
        setDealerHand(dealerCopy);
        setPlayerTurn(1);
      } else if (target === "player") {
        playerCopy.push(deckCopy.pop());
        setPlayerHand(playerCopy);
      } else if (target === "dealer") {
        messageLogCopy.push("Dealer hits!");
        setMessageLog(messageLogCopy);
        dealerCopy.push(deckCopy.pop());
        setDealerHand(dealerCopy);
      }
      setDeck(deckCopy);
    }, 2000);
  };

  const handleBet = e => {
    let messageLogCopy = messageLog;
    messageLogCopy.push(`Player Bets ${betAmt}!`);
    setMessageLog(messageLogCopy);

    setBet(1);
    setBank(bank - betAmt);
    setPot(betAmt);

    messageLogCopy.push("Dealing Cards!");
    setMessageLog(messageLogCopy);
    deal("initial");
  };

  const handleHit = () => {
    let messageLogCopy = [...messageLog];
    messageLogCopy.push("Player Hits!");
    setMessageLog(messageLogCopy);

    setHit(1);
    deal("player");
  };

  const handleStand = () => {
    let messageLogCopy = messageLog;
    messageLogCopy.push("Player Stands!");
    setMessageLog(messageLogCopy);
    setStand(1);

    setTimeout(() => {
      setPlayerTurn(0);
      setDealerTurn(1);
      handleDealerTurn();
    }, 2000);
  };
  const handleDD = () => {
    let messageLogCopy = messageLog;
    messageLogCopy.push("Player Doubles Down!");
    setMessageLog(messageLogCopy);

    setDd(1);
    setPot(betAmt * 2);
    setBank(bank - betAmt);
    deal("player");
    if (!gameOver) {
      setTimeout(() => {
        setPlayerTurn(0);
        setDealerTurn(1);
        handleDealerTurn();
      }, 2000);
    }
  };

  const handleDealerTurn = () => {
    setDealerValue(dealerHand[0].val + dealerHand[1].val);

    if (!gameOver) {
      setTimeout(() => {
        deal("dealer");
      }, 2000);
    }

    // if (dealerVal === 21) {
    //   handleLose();
    // } else if (dealerVal > 21) {
    //   handleWin();
    // } else if (dealerVal >= 17) {
    //   let result = dealerValue > playerValue;
    //   console.log(result);
    // } else {
    // }
  };

  const showDown = () => {
    console.log("SHOWDOWN");

    if (playerValue === dealerValue) {
      console.log("PUSH");

      setResultMessage({
        ...resultMessage,
        result: "push",
        message: "Push!"
      });
    } else {
      let playerWin = playerValue > dealerValue;
      if (playerWin) {
        setResultMessage({
          ...resultMessage,
          result: "win",
          message: "Player Wins!"
        });
        handleWin();
      } else {
        setResultMessage({
          ...resultMessage,
          result: "lose",
          message: "Dealer Wins!"
        });
        handleLose();
      }
    }
  };

  const handleWin = () => {
    let messageLogCopy = [...messageLog];
    messageLogCopy.push("Player Wins!");
    setMessageLog(messageLogCopy);
    setBank(bank + pot * 2);
    setPot(0);
    setGameOver(1);
    setTimeout(() => {
      // newGame();
    }, 3000);
  };

  const handleLose = () => {
    let messageLogCopy = [...messageLog];
    messageLogCopy.push("Player Loses!");
    setMessageLog(messageLogCopy);
    setPot(0);
    setGameOver(1);
    setTimeout(() => {
      // newGame();
    }, 3000);
  };

  const handleNewGame = () => {
    newGame();
  };

  return (
    <div className="app blackjack">
      <div className="blackjack-room">
        <header>
          <h2>Blackjack</h2>
          <h3>By Stefan Bobrowski</h3>
        </header>
        <div className="dealer-avatar">
          <span>🤵🏼‍</span>
        </div>
        <div className="blackjack-table">
          <section className="dealer-hand">
            <div className="hand-value dealer-value">
              {dealerValue} {dAces.length ? `/ ${dAces[0]}` : null}
            </div>
            {dealerHand.map((card, index) => {
              if (index === 0) {
                return (
                  <div className={`card ${card.suit} dealt`} key={index}>
                    <div className={dealerTurn ? "" : "facedown"}>
                      <span>{card.card}</span>
                      <span>{card.suit}</span>
                    </div>
                  </div>
                );
              } else {
                return (
                  <div className={`card ${card.suit} dealt`} key={index}>
                    <span>{card.card}</span>
                    <span>{card.suit}</span>
                  </div>
                );
              }
            })}
          </section>

          <div id="deck">
            {deck.map((card, index) => {
              return (
                <div className={`card ${card.suit}`} key={index}>
                  <div className="facedown">
                    <span>{card.card}</span>
                    <span>{card.suit}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pot">
            <p>💰: ${pot}</p>
            <div className={`bet ${bet ? "place-bet" : ""}`}>
              {bet ? "💵" : null}
            </div>
            <div className={`dd ${dd ? "place-dd" : ""}`}>
              {dd ? "💵" : null}
            </div>
          </div>

          <section className="player-hand">
            <div className="hand-value player-value">
              {" "}
              {playerValue} {pAces.length ? `/ ${pAces[0]}` : null}
            </div>
            {playerHand.map((card, index) => {
              return (
                <div className={`card ${card.suit} dealt`} key={index}>
                  <span>{card.card}</span>
                  <span>{card.suit}</span>
                </div>
              );
            })}
          </section>
        </div>
        <div className="message-log">
          <div id="messages">
            {messageLog.map((msg, i) => {
              return <p key={i}>💬 {msg}</p>;
            })}
          </div>
        </div>

        <div
          className={`results-window ${gameOver ? "show" : ""} ${
            resultMessage.result
          }`}
        >
          <p>You {resultMessage.result}!</p>
          <p>{resultMessage.message}</p>
          <button onClick={handleNewGame}>Okay</button>
        </div>

        <footer>
          <div className="bank">
            <p>Bank: 💵{bank}</p>
          </div>

          <div id="player-controls">
            <button onClick={handleBet} className="bet-control" disabled={bet}>
              Bet {betAmt}
            </button>
            <button
              onClick={handleHit}
              className="hit-control"
              disabled={!playerTurn}
            >
              Hit
            </button>
            <button onClick={handleStand} disabled={!playerTurn}>
              Stand
            </button>
            <button onClick={handleDD} disabled={!playerTurn || hit}>
              Double Down
            </button>
          </div>
        </footer>
      </div>

      <A href="/work" className="back-link">
        Back to Work
      </A>
    </div>
  );
};

export default BlackJack;
