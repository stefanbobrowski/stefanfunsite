import React, { useState } from "react";
import skypeIcon from "../assets/pages/contact/skype-icon.svg";
import contactMe from "../assets/pages/contact/contact-stefan.png";

const Contact = () => {
  const [phonePower, setPhonePower] = useState(1);

  const handleHomeClick = () => {
    let opp = !phonePower;
    setPhonePower(opp);
  };

  return (
    <div className="contact-page">
      <h1 className="page-header">Contact</h1>
      <h3>Contact me securely via E-mail, Phone, or Skype.</h3>
      <section className="business-card">
        <div className="photo">
          <img src={contactMe} alt="Contact Stefan"></img>
        </div>
        <div>
          <p>Stefan Bobrowski</p>
          <p>Web Developer</p>
        </div>

        <ul>
          <li>Web Development</li>
          <li>React</li>
          <li>JavaScript</li>
          <li>UX/UI</li>
          <li>NPM packages, scripts</li>
          <li>Web Server Hosting</li>
          <li>HTML, CSS</li>
          <li>Responsiveness</li>
        </ul>
      </section>

      <section className="contact-links">
        <p>If you are not a bot and would like to contact me:</p>
        <div className="contact-icons">
          <div className="email-container">
            <div>
              <h3>
                {" "}
                <span>📧</span>Email:
              </h3>
              <a href="mailto:stefanbobrowski1@gmail.com?Subject=Hey%20StefanB">
                stefanbobrowski1@gmail.com
              </a>
            </div>
          </div>

          <div className="phone-container">
            <div className={phonePower ? `phone-screen` : `phone-screen off`}>
              <h3>
                {" "}
                <span>📱</span> Phone:
              </h3>
              <a href="tel:203-395-2674" className="phone-number">
                (203) 395-2674
              </a>
              <p>Please leave a voice message.</p>
            </div>
            <div className="phone-bottom">
              <div className="home-button" onClick={handleHomeClick}></div>
            </div>
          </div>
        </div>

        <div className="skype-container">
          <a href="https://join.skype.com/invite/EuLgIRNJb7Pg" target="_blank">
            <img src={skypeIcon}></img>
          </a>
          <a href="https://join.skype.com/invite/EuLgIRNJb7Pg" target="_blank">
            <span>Skype</span>
          </a>
        </div>
      </section>

      <div className="network">
        <h3>Network:</h3>
        <ul>
          <li>
            <a href="https://www.npmjs.com/~anatolio" target="_blank">
              NPM
            </a>
          </li>
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
  );
};

export default Contact;
