import React, { useState, useEffect } from "react";
import { useRoutes, usePath, A } from "hookrouter";

const Timer = () => {
  const [time, setTime] = useState([0, 0, 0]);
  const [speed, setSpeed] = useState(1);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  let defaultArray = [[1, 2, [3]], 4];

  const flattenArray = arr => {
    if (Array.isArray(arr) && arr.length) {
      let arrNum = 0;
      for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
          arrNum++;
        }
      }

      if (arrNum > 0) {
        let flatterArray = [].concat(...arr);
        return flattenArray(flatterArray);
      } else {
        return arr;
      }
    } else {
      return "Please use a non-empty Array";
    }
  };

  let flattenedArray = flattenArray(defaultArray);
  console.log(flattenedArray);

  // console.log(flattenArray(defaultArray));

  // console.log(defaultArray);
  // let g = flattenArray(defaultArray);
  // console.log(g);

  // console.log(defaultArray);
  // console.log(flattenedArray);

  function toggle() {
    setIsActive(!isActive);
  }

  function reset() {
    setSeconds(0);
    setSpeed(1);
    setIsActive(false);
  }
  function speedDown() {
    setSpeed(speed - 1);
  }
  function speedUp() {
    setSpeed(speed + 1);
  }

  useEffect(() => {
    let interval;
    let intervalSpeed;
    console.log("wat");
    if (speed == 1) {
      intervalSpeed = 1000;
    } else if (speed == 2) {
      intervalSpeed = 700;
    } else if (speed == 3) {
      intervalSpeed = 500;
    } else if (speed == 4) {
      intervalSpeed = 250;
    }

    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, intervalSpeed);
      console.log("wait what");
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  return (
    <div className="app">
      <div>
        <h3>Flatten an array</h3>
      </div>
      <div className="time">{seconds}s</div>
      <div className="row">
        <button
          className={`button button-primary button-primary-${
            isActive ? "active" : "inactive"
          }`}
          onClick={toggle}
        >
          {isActive ? "Pause" : "Start"}
        </button>
        <button className="button" onClick={reset}>
          Reset
        </button>

        <button className="button" onClick={speedDown}>
          Speed Down
        </button>
        <button className="button" onClick={speedUp}>
          Speed Up
        </button>
        <p>Speed: {speed}</p>
      </div>
    </div>
  );
};

export default Timer;
