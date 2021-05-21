import React, { useState, useEffect } from "react";
import { useRoutes, usePath, A } from "hookrouter";
import regeneratorRuntime from "regenerator-runtime";

const GotVote = () => {
  const [chars, setChars] = useState([]);
  const [favorite, setFavorite] = useState("");

  useEffect(() => {
    Prism.highlightAll();
    getChars();
  }, []);

  const getChars = async () => {
    // async function
    try {
      let response = await fetch("https://api.tvmaze.com/shows/82/cast");
      let chars = await response.json();
      setChars(chars);
    } catch (err) {
      console.log(err);
    }

    /* Old way to fetch data with Promises
    return fetch("https://api.tvmaze.com/shows/82/cast")
      .then(response => response.json())
      .then(response => {
        console.log(response);
        setChars(response);
      });
      */
  };

  const handleFavorite = e => {
    let newFav = e.currentTarget.getAttribute("name");
    setFavorite(newFav);
  };

  return (
    <div>
      <h1 className="page-header">Game of Thrones Vote App</h1>
      <p>
        Fetch data from api with <strike>promises</strike> async/await
      </p>
      <h3>Render:</h3>
      <div className="app got-vote">
        <h2>Game of Thrones Vote</h2>
        <p>
          Images and names fetched from https://api.tvmaze.com/shows/82/cast
        </p>
        <p>
          You're favorite Game of Thrones character is{" "}
          <span className="fav-char">{favorite} </span>!
        </p>
        <div className="fetch-wrapper">
          {chars.map((char, index) => {
            return (
              <div
                key={char.character.id}
                name={char.character.name}
                className={
                  favorite == char.character.name ? "favorite char" : "char"
                }
                onClick={handleFavorite}
              >
                <div>
                  <img src={char.character.image.medium} />
                </div>
                <p>{char.character.name}</p>
                <p>({char.person.name})</p>
              </div>
            );
          })}
        </div>
      </div>
      <h3>💻 Code:</h3>
      <div className="file-name">
        <span>
          <i className="code-icon js-icon">{"JS"} </i>GotVote.js
        </span>
      </div>
      <pre className="line-numbers">
        <code className="language-jsx">
          {`import React, { useState, useEffect } from "react";
import regeneratorRuntime from "regenerator-runtime";
import "../styles.scss";

const GotVote = () => {
  const [chars, setChars] = useState([]);
  const [favorite, setFavorite] = useState("");

  useEffect(() => {
    getChars();
  }, []);

  const getChars = async () => {
    /* Old way to fetch data with Promises
    return fetch("https://api.tvmaze.com/shows/82/cast")
      .then(response => response.json())
      .then(response => {
        console.log(response);
        setChars(response);
      });
      */

    // Async/await
    const response = await fetch("https://api.tvmaze.com/shows/82/cast");
    const chars = await response.json();
    setChars(chars);
  };

  const handleFavorite = e => {
    let newFav = e.currentTarget.getAttribute("name");
    setFavorite(newFav);
  };

return (
  <div className="app got-vote">
    <h2>Game of Thrones Vote</h2>
    <p>Images and names fetched from https://api.tvmaze.com/shows/82/cast</p>
    <p>
      You're favorite Game of Thrones character is{" "}
      <span className="fav-char">{favorite} </span>!
    </p>
    <div className="fetch-wrapper">
      {chars.map((char, index) => {
        return (
          <div
            key={char.character.id}
            name={char.character.name}
            className={
              favorite == char.character.name ? "favorite char" : "char"
            }
            onClick={handleFavorite}
          >
          <div>
            <img src={char.character.image.medium} />
          </div>
          <p>{char.character.name}</p>
          <p>({char.person.name})</p>
        </div>
        );
      })}
    </div>
  </div>
  );
};

export default GotVote;

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
          {`.got-vote {
  .fav-char {
    color: $light-green;
    font-size: 22px;
  }

  .fetch-wrapper {
    display: flex;
    flex-wrap: wrap;
    margin-top: 40px;

    .char {
      width: 78px;
      border: 3px inset #fff;
      margin: 0px 6px 10px 6px;
      transition: 0.3s ease;

      &:hover {
        cursor: pointer;
        transform: scale(1.2);
      }
      img {
        display: block;
        width: 100%;
        margin: 0 auto 7px auto;
      }

      p {
        margin-bottom: 7px;
        font-size: 14px;
        line-height: 1;
        text-align: center;

        &:last-of-type {
          font-size: 10px;
          margin-bottom: 0px;
        }
      }
    }

    .favorite {
      transform: scale(1.2);
      border: 3px inset $light-green;
      background-color: silver;
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

export default GotVote;
