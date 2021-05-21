import React, { useState, useEffect } from "react";
import { useRoutes, usePath, A } from "hookrouter";

import goldenSpiral from "../SacredGeometry/assets/golden-spiral.gif";
import sacredGeo from "../SacredGeometry/assets/sacred-geo.jpg";

import toolGeo from "../SacredGeometry/assets/tool.jpg";

const SacredGeometry = () => {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  const makeHeptagrams = () => {
    makeHeptagram(1);
    makeHeptagram(2);
    makeHeptagram(3);
    makeHeptagram(4);
  };

  const makeHeptagram = v => {
    const angle = (2 * Math.PI) / 7; // 7 points on circle
    const size = 88;
    const heptagrams = document.getElementById("heptagrams");

    if (v == 1) {
      heptagrams.innerHTML = "";
    }
    let heptagram = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    heptagram.setAttribute("class", "heptagram");
    let circle = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );
    circle.setAttribute("r", size);
    circle.setAttribute("cx", size);
    circle.setAttribute("cy", size);
    heptagram.appendChild(circle);

    const drawVertices = vin => {
      let vertices = [];
      for (let i = 0; i < 7; i++) {
        let x = Math.cos(angle * i) * size + size;
        let y = Math.abs(Math.sin(angle * i) * size - size);
        vertices.push({ x, y });
      }
      for (let i = 0; i < vertices.length; i++) {
        let newLine = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "line"
        );
        newLine.setAttribute("x1", vertices[i].x);
        newLine.setAttribute("y1", vertices[i].y);
        newLine.setAttribute("x2", vertices[(i + vin) % vertices.length].x);
        newLine.setAttribute("y2", vertices[(i + vin) % vertices.length].y);
        heptagram.appendChild(newLine);
      }
    };

    if (v === 4) {
      for (let i = 1; i < 4; i++) {
        drawVertices(i);
      }
    } else {
      drawVertices(v);
    }

    heptagrams.appendChild(heptagram);
  };

  return (
    <div>
      <h1 className="page-header">Sacred Geometry</h1>

      <p>Programming Sacred Geometry shapes with SVG path, CSS, Javascript. </p>

      <div className="app sacred-geometry">
        <h3>Sacred Geometry</h3>
        <div className="sacred-examples">
          <div>
            <img src={sacredGeo} />
          </div>
          <div>
            <img src={goldenSpiral} />
          </div>
        </div>

        {/* <section id="spiral">
          <h2>Logarithmic spiral</h2>
          <p>This is an svg element found here</p>
          <button onClick={makeSpiral}>Draw Spiral</button>
          <a
            title="Leafnode [Public domain]"
            href="https://commons.wikimedia.org/wiki/File:Logarithmic_spiral.svg"
          >
            <img
              width="256"
              alt="Logarithmic spiral"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Logarithmic_spiral.svg/256px-Logarithmic_spiral.svg.png"
            />
          </a>
        </section> */}

        <section id="heptagrams-container">
          <h2>Heptagrams</h2>
          <p>
            A heptagram is a seven-pointed star drawn with seven straight
            strokes. There are variations denoted by their Schläfli symbol.
          </p>

          <button onClick={makeHeptagrams}>Draw Heptagrams</button>
          <div className="resp">
            <div className="heptagram-labels">
              <span>{"{7}"}</span>
              <span>{"{7/2}"}</span>
              <span>{"{7/3}"}</span>
              <span>Complete</span>
            </div>
            <div id="heptagrams"></div>
          </div>

          <img src={toolGeo}></img>
        </section>
      </div>
      <h3>💻 Code:</h3>
      <div className="file-name">
        <span>
          <i className="code-icon js-icon">{"JS"} </i>SacredGeometry.js
        </span>
      </div>
      <pre className="line-numbers">
        <code className="language-jsx">
          {`import React, { useState, useEffect } from "react";
import { useRoutes, usePath, A } from "hookrouter";

const SacredGeometry = () => {
  const [shape, setShape] = useState("");

  useEffect(() => {
    makeHeptagram(1);
    makeHeptagram(2);
    makeHeptagram(3);
    makeHeptagram(4);
    Prism.highlightAll();
  }, []);

  const makeHeptagram = v => {
    const angle = (2 * Math.PI) / 7; // 7 points on circle
    const size = 90;
    const heptagrams = document.getElementById("heptagrams-container");
    let heptagram = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    heptagram.setAttribute("class", "heptagram");
    let circle = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );
    circle.setAttribute("r", size);
    circle.setAttribute("cx", size);
    circle.setAttribute("cy", size);
    heptagram.appendChild(circle);

    const drawVertices = vin => {
      let vertices = [];
      for (let i = 0; i < 7; i++) {
        let x = Math.cos(angle * i) * size + size;
        let y = Math.abs(Math.sin(angle * i) * size - size);
        vertices.push({ x, y });
      }
      for (let i = 0; i < vertices.length; i++) {
        let newLine = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "line"
        );
        newLine.setAttribute("x1", vertices[i].x);
        newLine.setAttribute("y1", vertices[i].y);
        newLine.setAttribute("x2", vertices[(i + vin) % vertices.length].x);
        newLine.setAttribute("y2", vertices[(i + vin) % vertices.length].y);
        heptagram.appendChild(newLine);
      }
    };

    if (v === 4) {
      for (let i = 1; i < 4; i++) {
        drawVertices(i);
      }
    } else {
      drawVertices(v);
    }

    heptagrams.appendChild(heptagram);
  };

  return (
    <div>
      <h3>Sacred Geometry</h3>
      <p>A collection of Sacred Geometry pieces made with CSS and SVG</p>
      <div className="app sacred-geometry">
        <section id="heptagrams">
          <h2>Heptagrams</h2>
          <div id="heptagrams-container"></div>
          <div className="heptagram-labels">
            <span>{"{7}"}</span>
            <span>{"{7/2}"}</span>
            <span>{"{7/3}"}</span>
            <span>Complete</span>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SacredGeometry;
`}
        </code>
      </pre>

      <div className="file-name">
        <span>
          <i className="code-icon css-icon">{"#"}</i> styles.css
        </span>
      </div>
      <pre className="line-numbers">
        <code className="language-css">
          {`.sacred-geometry {
  background-color: $light-blue;
  p {
    color: green;
    font-size: 30px;
  }

  #heptagrams {
  }

  #heptagrams-container {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    .heptagram {
      display: block;
      width: 182px;
      height: 182px;
      stroke: silver;
      stroke-width: 1px;
      fill: gray;
      background-color: black;

      line {
        fill: none;
        stroke: white;
        stroke-width: 1px;
        stroke-dasharray: 1000;
        stroke-dashoffset: 1000;
        animation: dash 30s linear forwards;
      }

      @keyframes dash {
        to {
          stroke-dashoffset: 0;
        }
      }
    }
  }

  .heptagram-labels {
    display: flex;

    span {
      flex: 1 0 25%;
      text-align: center;
    }
  }
}
`}
        </code>
      </pre>
      <A href="/work" className="back-link">
        Back to Work
      </A>
    </div>
  );
};

export default SacredGeometry;
