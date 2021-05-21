import React, { useState, useEffect } from "react";
import { useRoutes, usePath, A } from "hookrouter";

const CityLife = () => {
  // Rules

  // Connect similar color blocks to combine value

  // Click a block
  // * Assign this as destination block
  // * Check for connected similar color blocks (N, E, S, W)
  // * Combine all values to destination block
  // * Erase all other blocks
  // * Run repopulate blocks

  // Repopulate blocks
  // * Takes erased blocks?
  // * loop through each column for empty blocks
  // * "drop" new random block of low value
  const [city, setCity] = useState([
    [
      { id: 0, value: 0, color: 0 },
      { id: 1, value: 1, color: 1 },
      { id: 2, value: 2, color: 2 },
      { id: 3, value: 3, color: 3 },
      { id: 4, value: 4, color: 4 }
    ],
    [
      { id: 0, value: 0, color: 0 },
      { id: 1, value: 0, color: 0 },
      { id: 2, value: 0, color: 0 },
      { id: 3, value: 0, color: 0 },
      { id: 4, value: 0, color: 0 }
    ],
    [
      { id: 0, value: 0, color: 0 },
      { id: 1, value: 1, color: 1 },
      { id: 2, value: 2, color: 2 },
      { id: 3, value: 3, color: 3 },
      { id: 4, value: 4, color: 4 }
    ],
    [
      { id: 0, value: 2, color: 4 },
      { id: 1, value: 2, color: 1 },
      { id: 2, value: 2, color: 0 },
      { id: 3, value: 2, color: 3 },
      { id: 4, value: 3, color: 2 }
    ],
    [
      { id: 0, value: 4, color: 4 },
      { id: 1, value: 3, color: 3 },
      { id: 2, value: 2, color: 2 },
      { id: 3, value: 1, color: 1 },
      { id: 4, value: 0, color: 0 }
    ]
  ]);
  const valueList = ["", "🌳", "👷", "🏠", "🏘️", "🏢"];
  const colorList = ["dirt", "grass", "nice-grass", "pavement", "brick"];

  const findConnected = () => {};

  const handleBlockClick = block => {
    console.log("city block clicked");
    let { target } = block;

    let cityCol = target.parentNode.getAttribute("col");
    let blockColor = target.getAttribute("color");
    let blockBlock = target.getAttribute("block");

    if (cityCol > 0) {
      let colLeft = city[cityCol - 1];
      let conLeft = colLeft[blockBlock];
      console.log(conLeft);

      let conLeftColor = conLeft.color;
      console.log(conLeftColor);
      if (conLeftColor == blockColor) {
        target.classList.add("con-left");
      }
    }

    // let blockValue = parseInt(block.getAttribute("value"));
    // let blockRow = parseInt(block.getAttribute("row"));
    // let blockColumn = parseInt(block.getAttribute("column"));
    // let blockConnected = block.getAttribute("connected");
    // let gameBoard = document.getElementById("game-board");

    // console.log("blockRow: " + blockRow);
    // console.log("blockCol: " + blockColumn);
    // console.log("Connected?: " + hasConnected);

    // if (hasConnected) {
    //   let hasNorth = block.classList.contains("connected-north");
    //   let hasEast = block.classList.contains("connected-east");
    //   let hasSouth = block.classList.contains("connected-south");
    //   let hasWest = block.classList.contains("connected-west");

    //   console.log("Connected North?: " + hasNorth);
    //   console.log("Connected East?: " + hasEast);
    //   console.log("Connected South?: " + hasSouth);
    //   console.log("Connected West?: " + hasWest);

    //   if (hasEast) {
    //     let connectedBlockRow = blockRow;
    //     let connectedBlockColumn = blockColumn + 1;
    //     console.log("connected Block Column: " + connectedBlockColumn);

    //     let columns = gameBoard.getElementsByClassName("city-column");
    //     let theColumn = columns[connectedBlockColumn];
    //     console.log(theColumn);
    //     let theRows = theColumn.getElementsByClassName("city-block");
    //     console.log(theRows);
    //     let connectedBlock = theRows[connectedBlockRow];
    //     console.log(connectedBlock);

    //     let connectedBlockValue = parseInt(
    //       connectedBlock.getAttribute("value")
    //     );
    //     console.log(blockValue);
    //     console.log(connectedBlockValue);
    //     block.setAttribute("value", blockValue + connectedBlockValue);

    //     connectedBlock.setAttribute("value", 0);
    //     connectedBlock.innerHTML = "";
    //     connectedBlock.classList.remove("connected");
    //   }
    // } else {
    //   console.log("no connections");
    // }
  };

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <div>
      <h1 className="page-header">City Life App</h1>
      <p>Recreation of one of my favorite iOS apps. </p>
      <h2 className="under-construction">🎄🚧 UNDER CONSTRUCTION 🚧🎄</h2>
      <h3>Render:</h3>
      <div className="app city-life">
        <header>
          <div className="menu">Menu</div>
          <div>Population:</div>
          <div>Year:</div>
        </header>
        <div id="game-board">
          {city.map((cityCol, i) => (
            <div className="city-column" col={i}>
              {city[i].map((block, j) => (
                <div
                  className={`city-block ${colorList[block.color]}`}
                  block={j}
                  value={block.value}
                  color={block.color}
                  onClick={handleBlockClick}
                >
                  {valueList[block.value]}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="water"></div>
        <footer></footer>
      </div>
      <A href="/work" className="back-link">
        Back to Work
      </A>
    </div>
  );
};

export default CityLife;
