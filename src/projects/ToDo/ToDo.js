import React, { useState, useEffect } from "react";
import { useRoutes, usePath, A } from "hookrouter";
import Dropdown from "../../components/Dropdown.js";

const ToDo = () => {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([
    "Laundry",
    "Grocery Shopping",
    "Have a dream"
  ]);
  const [message, setMessage] = useState({});

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  const handleInput = e => {
    const { target } = e;
    setTodo(target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const { target } = e;
    let newMsg;
    if (todo == "" || !todo.trim()) {
      // If ToDo is empty or spaces
      newMsg = { msg: "Empty To-Do!", color: "red" };
      setMessage(newMsg);
    } else {
      setTodoList([...todoList, todo]);
      setTodo("");
      target.parentNode.childNodes[1].value = ""; // reset form
      newMsg = { msg: "To-Do Created!", color: "green" };
      setMessage(newMsg);
    }
  };

  const handleDelete = e => {
    const { target } = e;
    let todoId = target.parentNode.getAttribute("key-id");
    let todoListCopy = [...todoList];
    todoListCopy.splice(todoId, 1);
    setTodoList(todoListCopy);
    let newMsg = { msg: "To-Do Deleted!", color: "red" };
    setMessage(newMsg);
  };

  return (
    <div>
      <h1 className="page-header">To-Do List App</h1>
      <p>
        My implementation of the classic <i>To-Do List</i> app with React Hooks.
      </p>
      <div className="app to-do">
        <form>
          <h3>Create a ToDo:</h3>
          <input
            onChange={handleInput}
            placeholder="What to do...?"
            maxLength="60"
          />
          <button onClick={handleSubmit}>Create</button>
          <div id="to-do-message">
            <p>Output:</p>
            <span id="output-message" style={{ color: message.color }}>
              {message.msg}
            </span>
          </div>
        </form>
        <div className="to-do-board-container">
          <h3>ToDo Board:</h3>
          <div className="to-do-board">
            {todoList.map((atodo, i) => (
              <div className="todo" key={i} key-id={i}>
                <p>{atodo}</p>
                <span onClick={handleDelete}>❌</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <h2>💻 Code:</h2>
      <Dropdown
        extraClass="code-dropdown"
        header={<h3>📄 ToDO.js</h3>}
        body={
          <div>
            <div className="file-name">
              <span>
                <i className="code-icon js-icon">{"JS"} </i>ToDo.js
              </span>
            </div>
            <pre className="line-numbers">
              <code className="language-jsx">
                {`import React, { useState, useEffect } from "react";
import "../styles.scss";

const ToDo = () => {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([
    "Laundry",
    "Grocery Shopping",
    "Have a dream"
  ]);
  const [message, setMessage] = useState({});

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  const handleInput = e => {
    const { target } = e;
    setTodo(target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const { target } = e;
    let newMsg;
    if (todo == "" || !todo.trim()) {
      // If ToDo is empty or spaces
      newMsg = { msg: "Empty To-Do!", color: "red" };
      setMessage(newMsg);
    } else {
      setTodoList([...todoList, todo]);
      setTodo("");
      target.parentNode.childNodes[1].value = ""; // reset form
      newMsg = { msg: "To-Do Created!", color: "green" };
      setMessage(newMsg);
    }
  };

  const handleDelete = e => {
    const { target } = e;
    let todoId = target.parentNode.getAttribute("key-id");
    let todoListCopy = [...todoList];
    todoListCopy.splice(todoId, 1);
    setTodoList(todoListCopy);
    let newMsg = { msg: "To-Do Deleted!", color: "red" };
    setMessage(newMsg);
  };

  return (
    <div>
      <div className="app to-do">
        <form>
          <h3>Create a ToDo:</h3>
          <input
            onChange={handleInput}
            placeholder="What to do...?"
            maxLength="60"
          />
          <button onClick={handleSubmit}>Create</button>
          <div id="to-do-message">
            <p>Output:</p>
            <span id="output-message" style={{ color: message.color }}>
              {message.msg}
            </span>
          </div>
        </form>
        <div className="to-do-board-container">
          <h3>ToDo Board:</h3>
          <div className="to-do-board">
            {todoList.map((atodo, i) => (
              <div className="todo" key={i} key-id={i}>
                <p>{atodo}</p>
                <span onClick={handleDelete}>❌</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToDo;
`}
              </code>
            </pre>
          </div>
        }
      ></Dropdown>

      <Dropdown
        extraClass="code-dropdown"
        header={<h3>📄 styles.css</h3>}
        body={
          <div>
            <div className="file-name">
              <span>
                <i className="code-icon css-icon">{"#"} </i>styles.css
              </span>
            </div>

            <pre className="line-numbers">
              <code className="language-css">
                {`@import url("https://fonts.googleapis.com/css?family=Indie+Flower&display=swap");
.to-do {
  display: flex;

  * {
    font-family: "Indie Flower";
    font-size: 18px;
    color: black;
  }

  h3 {
    font-size: 26px;
    margin-bottom: 10px;
  }

  form {
    flex: 0 0 200px;
    padding: 12px;
    border: 1px solid black;
    border-right: none;
    text-align: center;
    background-color: #eee;

    input {
      width: 100%;
      max-width: 180px;
      padding: 8px;
      border: 1px solid darkgray;
      border-radius: 5px;
      color: rgb(77, 77, 77);

      &::placeholder {
        color: silver;
      }
    }

    button {
      display: block;
      margin: 10px auto 0px auto;
      padding: 6px 12px;
      text-transform: uppercase;
      border-radius: 5px;
      transition: 0.3s ease;
      background-color: #ddd;

      &:hover {
        cursor: pointer;
        background-color: silver;
      }
    }

    #to-do-message {
      height: 100px;
      width: 180px;
      margin: 40px auto 0px auto;
      padding: 7px;
      border: 1px solid blue;

      p {
        color: #79cbc5;
      }

      span {
        border-radius: 5px;
        font-size: 20px;
        opacity: 1;
      }
    }
  }  

  .to-do-board-container {
    flex: 1 1 auto;
    min-height: 440px;
    padding: 13px;
    border: 1px solid black;
    background-image: url("/projects/ToDo/cork-board.jpg");
    background-size: cover;
    background-position: center;

    .to-do-board {
      display: flex;
      flex-wrap: wrap;

      .todo {
        flex: 1 1 168px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        max-width: 168px;
        min-height: 168px;
        margin: 1%;
        padding: 20px 6px 0px 6px;
        border: 1px solid black;
        text-align: center;
        position: relative;

        &:nth-of-type(4n) {
          background-color: #ffff97;
        }

        &:nth-of-type(4n-1) {
          background-color: #fbae4a;
        }

        &:nth-of-type(4n + 2) {
          background-color: #f275ad;
        }

        &:nth-of-type(4n + 1) {
          background-color: #79cbc5;
        }

        p {
          width: 100%;
          margin-bottom: 0px;
          font-size: 20px;
          overflow-wrap: break-word; // new way to wrap word
        }

        span {
          position: absolute;
          top: 2px;
          right: 4px;

          &:hover {
            cursor: pointer;
          }
        }
      }
    }
  }  
}
`}
              </code>
            </pre>
          </div>
        }
      ></Dropdown>

      <A href="/work" className="back-link">
        Back to Work
      </A>
    </div>
  );
};

export default ToDo;
