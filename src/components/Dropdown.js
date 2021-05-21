import React from "react";

const Dropdown = props => {
  const handleDrop = e => {
    let target = e.currentTarget;
    let control = target.querySelector(".drop-control");
    let dd = target.parentNode.querySelector(".dropdown");

    if (control.innerHTML == "➕") {
      control.innerHTML = "➖";
      dd.classList.add("drop");
    } else {
      control.innerHTML = "➕";
      dd.classList.remove("drop");
    }
    // let icon = target.childNodes[2];
    // if (icon.innerHTML == "+") {
    //   target.childNodes[2].innerHTML = "-";
    //   target.parentNode.childNodes[1].classList.add("drop");
    // } else {
    //   target.childNodes[2].innerHTML = "+";
    //   target.parentNode.childNodes[1].classList.remove("drop");
    // }
  };

  return (
    <div className={`dropdown-container ${props.extraClass}`}>
      <header onClick={handleDrop}>
        {props.header} <span className="drop-control">➕</span>
      </header>
      <div className="dropdown">{props.body}</div>
    </div>
  );
};

export default Dropdown;
