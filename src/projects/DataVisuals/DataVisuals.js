import React, { useState, useEffect } from "react";
import { A } from "hookrouter";
import Dropdown from "../../components/Dropdown";

const DataVisuals = () => {
  // State
  const [state, setState] = useState("");

  const defaultData = [
    { name: "example", color: "#00ff00", data: [2000, 666, 1021, 988, 1200] },
    { name: "example2", color: "#0080ff", data: [800, 1826, 810, 900, 1000] }
  ];
  const [dataStore, setDataStore] = useState(defaultData);

  const [graphType, setGraphType] = useState("bar");

  // Effects
  useEffect(() => {
    tester();
    Prism.highlightAll();
  }, []);

  const tester = () => {};

  const handleType = e => {
    let selectedType = e.target.value;
    setGraphType(selectedType);
  };

  const handleSubmit = e => {
    e.preventDefault(); // stop reload
    const { target } = e;
    console.log(target);

    let dataName = target.querySelector('input[name="name"]').value;
    let dataColor = target.querySelector('input[name="color"]').value;
    let dataData = target
      .querySelector('input[name="data"]')
      .value.split(",")
      .map(Number);
    console.log(dataData);

    // let dataStoreCopy = [...data];

    let newDataObject = { name: dataName, color: dataColor, data: dataData };
    console.log(newDataObject);

    // let dataCopy = {...}

    setDataStore([...dataStore, newDataObject]);

    // setDataStore({ ...dataStore });

    // let dataCopy = [...datas];
    // let scoreArray = user.scores.split(",").map(Number);
    // user.scores = scoreArray;
    // dataCopy.push(user);
    // setDatas(dataCopy);
    // e.target.querySelectorAll("input").value = "";
    // setUser(defaultUser);
  };

  useEffect(() => {}, [dataStore]);

  return (
    <div>
      <h1 className="page-header">Data Visuals</h1>
      <main className="app data-visuals">
        <h2>Data Visuals App</h2>

        <section className="data-entry-container">
          <form onSubmit={handleSubmit}>
            <p>Name:</p>
            <input name="name"></input>
            {/* <p>X Range:</p>
            <input name="x-min"></input> - <input name="x-max"></input>
            <p>Y Range</p>
            <input name="y-min"></input> - <input name="y-max"></input> */}
            <p>Color:</p>
            <input name="color" type="color"></input>
            <p>Enter Data:</p>
            <input name="data"></input>
            <button>Submit</button>
          </form>
        </section>

        <section>
          <p>Graph Type:</p>
          <select onChange={handleType}>
            <option value="line">Line</option>
            <option value="bar">Bar</option>
            <option value="pie">Pie</option>
          </select>
        </section>
        <section className="graph-container">
          {/* <div className={`graph ${graphType}`}>
            <div data-value="400">
              <p>Stefan</p>
            </div>
            <div data-value="800" style={{ height: "200px" }}>
              <p>Stefan2</p>
            </div>
            <div data-value="900">
              <p>Stefan3</p>
            </div>
          </div> */}

          {dataStore.map((d, i) => (
            <div className={`graph ${graphType}`} style={{ zIndex: i }}>
              {d.data.map((dd, i) => (
                <div
                  key={i}
                  data-value={dd}
                  style={{ backgroundColor: d.color, height: dd / 10 + "px" }}
                >
                  <p>{dd}</p>
                </div>
              ))}
            </div>
          ))}
        </section>
      </main>

      <h2>💻 Code:</h2>
      <Dropdown
        extraClass="code-dropdown"
        header={<h3>📄 DataVisuals.js</h3>}
        body={
          <div>
            <div className="file-name">
              <span>
                <i className="code-icon js-icon">{"JS"} </i>DataVisuals.js
              </span>
            </div>
            <pre className="line-numbers">
              <code className="language-jsx">
                {`import React, { useState, useEffect } from "react";
import DropDown from "../../components/Dropdown";

const DataVisuals = () => {
  // State
  const [state, setState] = useState("");

  // Effects
  useEffect(() => {
  }, []);

  return (
    <div>
      <h1 className="page-header">Data Visuals</h1>
      <main className="app new-template">
        <h2>Data Visuals App</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <DropDown
        header={"Data Visuals Dropdown"}
        body={
          <div>
            <p>Custom dropdowns</p>
            <p>Data Visuals has background-color: red;</p>
          </div>
        }
        extraClass="new-template-dropdown"
      ></DropDown>
      </main>
  </div>
  );
};

export default DataVisuals;

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

export default DataVisuals;
