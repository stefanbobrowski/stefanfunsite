import React, { useState, useEffect } from "react";
import { useRoutes, usePath, A } from "hookrouter";
import flame from "../Cinder/assets/flame.png";
import arrow from "../Cinder/assets/arrow.png";
import avatar from "../Cinder/assets/avatar.png";

const Cinder = () => {
  const [state, setState] = useState("");

  useEffect(() => {
    Prism.highlightAll();
    let blipZone = document.getElementById("blip-zone");
    let coin = document.getElementById("coin");
    coin.onclick = createBlip;

    function createBlip() {
      let newBlip = document.createElement("div");
      newBlip.setAttribute("id", "new-blip");
      blipZone.appendChild(newBlip);
      console.log("blip");

      setTimeout(function() {
        document.getElementById("new-blip").remove();
      }, 3000);
    }
  }, []);

  return (
    <div>
      <h1 className="page-header">Cinder App</h1>

      <p>Recreation of Tinder's loading animation.</p>
      <p>This one was written in pure HTML, CSS, and Javascript.</p>
      <h3>Render:</h3>
      <div className="app cinder">
        <div className="title">
          <img src={flame} alt="Cinder Flame" />
          <h2>Cinder</h2>
        </div>
        <section id="blip-zone">
          <div id="coin"></div>
          <div id="blip"></div>
          <div id="blip-2"></div>
          <p className="side-note">
            Click yourself rapidly for more search power.
            <img src={arrow} alt="arrow" />
          </p>
        </section>
        <p className="bottom-note">
          There's no one new around you! Try ditching this app and becoming more
          sociable to meet new people.
        </p>
      </div>
      <h3>💻 Code:</h3>
      <div className="file-name">
        <span>
          <i className="code-icon html-icon">{"<>"}</i> index.html
        </span>
      </div>
      <pre className="line-numbers">
        <code className="language-html">
          {`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Cinder - Stefan Bobrowski</title>
    <script type="text/javascript" src="app.js" defer></script>
    <link type="text/css" rel="stylesheet" href="styles.css">
    <link href="https://fonts.googleapis.com/css?family=Lato:300,400" rel="stylesheet">
</head>
<body>
    <main>
        <h1 class="title"> <img src="flame.png" alt="flame">Cinder</h1>
        <section id="blip-zone">
            <div id="coin"></div>
            <div id="blip"></div>
            <div id="blip-2"></div>
            <p class="side-note">Click yourself rapidly for more search power.
                <img src="arrow.png" alt="arrow">
            </p>            
        </section>
        <p class="bottom-note">    There's no one new around you! Try ditching this app and becoming more
        sociable to meet new people.</p>
    </main>
</body>
</html> 
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
          {`* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    font-family: 'Lato', sans-serif;
    background-color:#fff;
}

main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;    
    width: 100vw;
    height: 100vh;
    padding: 0 10px;
}

.title {
  display: flex;
  align-items: center;
}

#blip-zone {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 550px;
    height: 320px;
    position: relative;
}

#coin {
    display: block;
    width: 70px;
    height: 70px;
    position: absolute;
    z-index: 5;
    border-radius: 50%;
    border: 3px solid white;
    background-image: url('avatar.jpg');
    background-size: cover;
    background-position: center;
}

#blip {
    display: block;
    width: 70px;
    height: 70px;
    position: absolute;
    border-radius: 50%;
    border: 3px solid rgba(256, 125, 145, 0.3);
    background-color: rgba(256, 125, 145, 0.3);
    animation-name: pulse;
    animation-duration: 3s; 
    animation-timing-function: linear; 
    animation-delay: 0s;
    animation-iteration-count: infinite;
    animation-fill-mode: none;
    animation-play-state: running; 
}

#blip-2 {
    display: block;
    width: 70px;
    height: 70px;
    position: absolute;
    border-radius: 50%;
    border: 3px solid rgba(256, 125, 145, 0.3);
    background-color: rgba(256, 125, 145, 0.3);
    animation-name: pulse;
    animation-duration: 3s; 
    animation-timing-function: linear; 
    animation-delay: 1.5s;
    animation-iteration-count: infinite;
    animation-fill-mode: none;
    animation-play-state: running; 
}

#new-blip {
    display: block;
    width: 70px;
    height: 70px;
    position: absolute;
    border-radius: 50%;
    border: 3px solid rgba(256, 125, 145, 0.3);
    background-color: rgba(256, 125, 145, 0.3);
    animation-name: pulse;
    animation-duration: 3s; 
    animation-timing-function: linear; 
    animation-delay: 0s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
    animation-play-state: running; 
}

@keyframes pulse {
    0% {
        width: 70px;
        height: 70px;
    }
    100% {
        width: 420px;
        height: 420px;
        background-color: rgba(256, 125, 145, 0);
        border: 3px solid rgba(256, 125, 145, 0);
    }
}

.side-note {
  width: 120px;
  height: 140px;
  margin: auto;
  position: absolute;
  top: -30px;
  bottom: 0px;
  right: 13%;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
}

.side-note img {
  margin-left: -40px;
  transform: rotate(17deg);
}

.bottom-note {
    width: 370px;
    font-size: 15px;
    line-height: 19px;
    text-align: center;
    color: gray;
}
`}
        </code>
      </pre>
      <div className="file-name">
        <span>
          <i className="code-icon js-icon">{"JS"}</i> cinder.js
        </span>
      </div>
      <pre className="line-numbers">
        <code className="language-javascript">
          {`console.log("Welcome to Cinder");

let blipZone = document.getElementById('blip-zone');
let coin = document.getElementById('coin');
coin.onclick = createBlip;

function createBlip() {
    let newBlip = document.createElement('div');
    newBlip.setAttribute('id', 'new-blip');
    blipZone.appendChild(newBlip);
    console.log('blip');

    setTimeout(function() {
        document.getElementById('new-blip').remove();
    }, 3000);
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

export default Cinder;
