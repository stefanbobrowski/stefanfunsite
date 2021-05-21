import React, { useState, useEffect } from "react";
import { useRoutes, usePath, A } from "hookrouter";
import ssjPic from "../assets/pages/home/ssj.png";

const Home = () => {
  const [picPulse, setPicPulse] = useState(false);
  const [hoverOption, setHoverOption] = useState("gloss-effect");

  const handleHoverOption = e => {
    let { target } = e;
    let option = target.getAttribute("effect"); // Get target Hover Option
    let opts = target.parentNode.children; // Get all Hover Options
    for (let i = 0; i < opts.length; i++) {
      opts[i].classList.remove("active"); // Remove all active
    }
    target.classList = "active"; // Set new active

    setHoverOption(option);
  };

  const handleFaceClick = e => {
    let { target } = e;
    console.log(target);
    console.log(target.getAttribute("effect"));
  };

  return (
    <div className="home-page">
      <h1 className="page-header">Home</h1>
      <div className="home-intro">
        <div className="left-col-container">
          <div className="home-left-col">
            <div className="stefan-pic-container">
              <div
                className={`stefan-pic ${hoverOption}`}
                value="true"
                onClick={handleFaceClick}
              >
                <div className="ripple"></div>
                <div className="ripple"></div>
                <div className="ripple"></div>
                <div className="ssj">
                  <img src={ssjPic}></img>
                </div>
              </div>
            </div>

            <div className="titles">
              <h2 className="stefan-name">Stefan Bobrowski</h2>
              <h3 className="stefan-title">Web Developer</h3>
              <h3 className="stefan-skills">
                Front End, UX/UI, React, Node.js, JavaScript, SCSS
              </h3>
            </div>

            <div className="network">
              <h3>Network:</h3>
              <ul>
                <li>
                  <a
                    href="https://www.linkedin.com/in/stefanbobrowski/"
                    target="_blank"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="https://github.com/stefanbobrowski" target="_blank">
                    Github
                  </a>
                </li>
                <li>
                  <a
                    href="https://stackoverflow.com/users/3317728/stefanbob?tab=profile"
                    target="_blank"
                  >
                    Stack Overflow
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/stefanbobrowski/"
                    target="_blank"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="https://codepen.io/StefanBobrowski/" target="_blank">
                    CodePen
                  </a>
                </li>
                <li>
                  <a href="https://www.twitch.tv/sanatoliob/" target="_blank">
                    Twitch
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="hover-options-container">
            <h6>Hovers:</h6>
            <div className="hover-options">
              <span
                className="active"
                effect="gloss-effect"
                onClick={handleHoverOption}
              >
                Gloss
              </span>
              <span effect="ripple-effect" onClick={handleHoverOption}>
                Ripple
              </span>
              <span effect="ssj-effect" onClick={handleHoverOption}>
                SSJ
              </span>
              <span effect="morph-effect" onClick={handleHoverOption}>
                Morph
              </span>
              <span effect="coin-effect" onClick={handleHoverOption}>
                Coin Flip
              </span>
            </div>
          </div>
        </div>

        <div className="home-right-col">
          <div className="home-p-container">
            <div className="home-p">
              <span>👨‍💻</span>
              <div>
                <p>
                  It's me, <A href="/">Stefan_Bobrowski</A>.
                </p>
                <p>
                  I've been coding in the web for over a decade and there is
                  still so much to learn.
                </p>
              </div>
            </div>
            <div className="home-p">
              <span>👨‍💼</span>
              <div>
                <p>What have I done?</p>
                <p>
                  Visit the <A href="/work">work</A> page to see my experience
                  and web app portfolio.
                </p>
              </div>
            </div>
            <div className="home-p">
              <span>💻</span>
              <div>
                <p>Are you interested in Web Development? </p>
                <p>
                  <A href="/learn">Learn</A> how to create modern websites with
                  my <A href="/learn">2020 Web Guide</A>.
                </p>
              </div>
            </div>
            <div className="home-p">
              <span>🏒‍</span>
              <p>
                While I'm mostly a computer nerd, I list my other interests on
                my <A href="/personal"> personal</A> page.
              </p>
            </div>
            <div className="home-p">
              <span>💸</span>
              <p>
                For business and other inquiries please{" "}
                <A href="/contact">contact</A> me.
              </p>
            </div>
            <div className="home-p">
              <span></span>
              <h6 className="signature">- Stefan_Bobrowski</h6>
            </div>
          </div>
        </div>
      </div>

      <section className="featured-projects"></section>
    </div>
  );
};

export default Home;
