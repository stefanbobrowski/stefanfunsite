import React, { useState, useEffect } from "react";
import { useRoutes, usePath, A } from "hookrouter";

const Footer = props => {
  const path = usePath();

  useEffect(() => {
    // Set Active Link class
    let footerLinks = document.querySelectorAll("#footer-nav a");
    for (let i = 0; i < footerLinks.length; i++) {
      footerLinks[i].classList = "";
      let linkPath = footerLinks[i].getAttribute("href");
      if (path == linkPath) {
        footerLinks[i].classList.add("active-link");
      }
    }
  }, [path]);

  return (
    <footer>
      <div className="page-footer-border">
        <div></div>
      </div>
      <div className="back-to-top"></div>
      <nav id="footer-nav">
        <nav>
          <A href="/">Home</A>
          <A href="/work">Work</A>
          <A href="/learn">Learn</A>
          <A href="/personal">Personal</A>
          <A href="/contact">Contact</A>
        </nav>
      </nav>
      <h4>
        <span>&copy;</span> 2019 Stefan_Bobrowski
      </h4>
      <div className="banner-bg"></div>
    </footer>
  );
};

export default Footer;
