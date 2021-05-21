import React, { useState, useEffect } from "react";
import { useRoutes, usePath, A } from "hookrouter";

const DataCenter = () => {
  const [datas, setDatas] = useState([
    { name: "Alice", scores: [72, 64, 76, 80, 43] },
    { name: "Fred", scores: [80, 90, 78, 52, 63] },
    { name: "Zane", scores: [82, 94, 76, 90, 93] },
    { name: "Jim", scores: [50, 60, 70, 80, 90] }
  ]);

  const defaultUser = { name: "", scores: [] };
  const [user, setUser] = useState(defaultUser);

  const handleData = () => {
    let allScores = document.querySelectorAll(".score-card");

    allScores.forEach((card, i) => {
      card.className = "score-card";
      let score = card.getAttribute("score");
      if (score > 89) {
        card.classList.add("legendary-card");
      } else if (score > 79) {
        card.classList.add("epic-card");
      } else if (score > 69) {
        card.classList.add("rare-card");
      } else if (score > 59) {
        card.classList.add("green-card");
      } else if (score > 49) {
        card.classList.add("common-card");
      } else if (score < 50) {
        card.classList.add("trash");
      }
    });
  };

  const handleSort = () => {
    let dataCopy = [...datas];
    dataCopy.forEach((user, i) => {
      user.scores.sort(function(a, b) {
        return a - b;
      });
      setDatas(dataCopy);
    });
  };

  const handleCalculate = () => {
    let dataCopy = [...datas];
    dataCopy.forEach((user, i) => {
      let sum = user.scores.reduce((a, b) => a + b);
      let mean = sum / 5;
      user.sum = sum;
      user.mean = mean;
      setDatas(dataCopy);
    });
  };

  const handleSubmit = e => {
    e.preventDefault(); // stop reload
    let dataCopy = [...datas];
    let scoreArray = user.scores.split(",").map(Number);
    user.scores = scoreArray;
    dataCopy.push(user);
    setDatas(dataCopy);
    e.target.querySelectorAll("input").value = "";
    setUser(defaultUser);
  };

  useEffect(() => {
    Prism.highlightAll();
    handleData();
  }, []);

  useEffect(() => {
    handleData();
  }, [datas]);

  return (
    <div>
      <h1 className="page-header">Data Center App</h1>
      <p>Add new users with data</p>
      <h2 className="under-construction">🚧 UNDER CONSTRUCTION 🚧</h2>
      <h3>Render:</h3>
      <div className="app data-center">
        <div className="title">
          <h2>👨‍💻 Data Center</h2>
        </div>
        <table id="data-table">
          <tbody>
            <tr>
              <td>Name:</td>
              <td>1</td>
              <td>2</td>
              <td>3</td>
              <td>4</td>
              <td>5</td>
              <td>Total:</td>
              <td>Average:</td>
            </tr>
            {datas.map((u, i) => (
              <tr className="user-row" key={i}>
                <td className="user-names">{u.name}:</td>
                {u.scores.map((score, i) => (
                  <td className="score-card" round={i} score={score} key={i}>
                    {score}
                  </td>
                ))}
                <td>{u.sum}</td>
                <td>
                  <b>{u.mean}</b>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={handleSort}>Sort</button>
        <button onClick={handleCalculate}>Calculate</button>

        <form onSubmit={handleSubmit}>
          <h3>Add new user</h3>
          <div className="new-user-box">
            <p>Name: {user.name}</p>
            <p>Scores: [{user.scores}]</p>
          </div>
          <label>Name</label>
          <input
            type="text"
            onInput={() => setUser({ ...user, name: event.target.value })}
          />
          <p>
            Scores enter a comma separated list of 5 values ex: 50, 60, 70, 50,
            65
          </p>
          <label>Scores</label>
          <input
            type="text"
            onInput={() => setUser({ ...user, scores: event.target.value })}
          />
          <br></br>
          <button>Submit</button>
        </form>
      </div>
      <h3>💻 Code:</h3>
      <div className="file-name">
        <span>
          <i className="code-icon js-icon">{"JS"} </i>DataCenter.js
        </span>
      </div>
      <pre className="line-numbers">
        <code className="language-jsx">
          {`import React, { useState, useEffect } from "react";

const DataCenter = () => {
  const [datas, setDatas] = useState([
    { name: "Alice", scores: [72, 64, 76, 80, 43] },
    { name: "Fred", scores: [80, 90, 78, 52, 63] },
    { name: "Zane", scores: [82, 94, 76, 90, 93] },
    { name: "Jim", scores: [50, 60, 70, 80, 90] }
  ]);

  const defaultUser = { name: "", scores: [] };
  const [user, setUser] = useState(defaultUser);

  const handleData = () => {
    let allScores = document.querySelectorAll(".score-card");

    allScores.forEach((card, i) => {
      card.className = "score-card";
      let score = card.getAttribute("score");
      if (score > 89) {
        card.classList.add("legendary-card");
      } else if (score > 79) {
        card.classList.add("epic-card");
      } else if (score > 69) {
        card.classList.add("rare-card");
      } else if (score > 59) {
        card.classList.add("green-card");
      } else if (score > 49) {
        card.classList.add("common-card");
      } else if (score < 50) {
        card.classList.add("trash");
      }
    });
  };

  const handleSort = () => {
    let dataCopy = [...datas];
    dataCopy.forEach((user, i) => {
      user.scores.sort(function(a, b) {
        return a - b;
      });
      setDatas(dataCopy);
    });
  };

  const handleCalculate = () => {
    let dataCopy = [...datas];
    dataCopy.forEach((user, i) => {
      let sum = user.scores.reduce((a, b) => a + b);
      let mean = sum / 5;
      user.sum = sum;
      user.mean = mean;
      setDatas(dataCopy);
    });
  };

  const handleSubmit = e => {
    e.preventDefault(); // stop reload
    let dataCopy = [...datas];
    let scoreArray = user.scores.split(",").map(Number);
    user.scores = scoreArray;
    dataCopy.push(user);
    setDatas(dataCopy);
    e.target.querySelectorAll("input").value = "";
    setUser(defaultUser);
  };

  useEffect(() => {
    Prism.highlightAll();
    handleData();
  }, []);

  useEffect(() => {
    handleData();
  }, [datas]);

  return (
    <div className="app data-center">
    <div className="title">
      <h2>👨‍💻 Data Center</h2>
    </div>
    <table id="data-table">
      <tbody>
        <tr>
          <td>Name:</td>
          <td>1</td>
          <td>2</td>
          <td>3</td>
          <td>4</td>
          <td>5</td>
          <td>Total:</td>
          <td>Average:</td>
        </tr>
        {datas.map((u, i) => (
          <tr className="user-row" key={i}>
            <td className="user-names">{u.name}:</td>
            {u.scores.map((score, i) => (
              <td className="score-card" round={i} score={score} key={i}>
                {score}
              </td>
            ))}
            <td>{u.sum}</td>
            <td>
              <b>{u.mean}</b>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <button onClick={handleSort}>Sort</button>
    <button onClick={handleCalculate}>Calculate</button>
    <form onSubmit={handleSubmit}>
      <h3>Add new user</h3>
      <div className="new-user-box">
        <p>Name: {user.name}</p>
        <p>Scores: [{user.scores}]</p>
      </div>
      <label>Name</label>
      <input
        type="text"
        onInput={() => setUser({ ...user, name: event.target.value })}
      />
      <p>
        Scores enter a comma separated list of 5 values ex: 50, 60, 70, 50,
        65
      </p>
      <label>Scores</label>
      <input
        type="text"
        onInput={() => setUser({ ...user, scores: event.target.value })}
      />
      <button>Submit</button>
    </form>
  </div>
  );
};

export default DataCenter;
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
          {`.data-center {
  #data-table {
    tr {
      td {
        text-align: left;
        outline: 1px solid $green;
        padding: 4px 8px;
      }
    }

    .user-row {
      .score-card {
        border: 1px solid purple;
        padding: 4px;
        background-color: #aaa;
      }
    }
  }

  .trash {
    color: gray;
  }

  .common-card {
    color: #fff;
  }
  .green-card {
    color: green;
  }
  .rare-card {
    color: blue;
  }

  .epic-card {
    color: purple;
  }

  .legendary-card {
    color: orangered;
  }

  .new-user-box {
    width: 300px;
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid green;
  }

  form {
    width: auto;
    margin: 10px 0px;
    padding: 6px;
    border: 1px solid black;
  }
  
  button {
    margin-top: 10px;
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

export default DataCenter;
