import React, { useState, useEffect } from "react";
import { A } from "hookrouter";
import Dropdown from "../../components/Dropdown";

const NewTemplate = () => {
  // State
  const [state, setState] = useState("");

  // Effects
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <div>
      <h1 className="page-header">New Template</h1>
      <main className="app new-template">
        <h2>New Template App</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <Dropdown
          header={<h2>NewTemplate Dropdown</h2>}
          body={
            <div className="custom-class">
              <p>Custom dropdowns</p>
              <p>
                NewTemplate Dropdown has background-color from component prop :O
              </p>
            </div>
          }
          extraClass="new-template-dropdown"
        ></Dropdown>
      </main>

      <h2>💻 Code:</h2>
      <Dropdown
        extraClass="code-dropdown"
        header={<h3>📄 NewTemplate.js</h3>}
        body={
          <div>
            <div className="file-name">
              <span>
                <i className="code-icon js-icon">{"JS"} </i>NewTemplate.js
              </span>
            </div>
            <pre className="line-numbers">
              <code className="language-jsx">
                {`import React, { useState, useEffect } from "react";
import DropDown from "../../components/Dropdown";

const NewTemplate = () => {
  // State
  const [state, setState] = useState("");

  // Effects
  useEffect(() => {
  }, []);

  return (
    <div>
      <h1 className="page-header">New Template</h1>
      <main className="app new-template">
        <h2>New Template App</h2>
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
        header={"New Template Dropdown"}
        body={
          <div>
            <p>Custom dropdowns</p>
            <p>New Template has background-color: red;</p>
          </div>
        }
        extraClass="new-template-dropdown"
      ></DropDown>
      </main>
  </div>
  );
};

export default NewTemplate;

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

export default NewTemplate;
