import React, { useState, useEffect } from "react";
import { useRoutes, usePath, A } from "hookrouter";

const Header = (props) => {
  const path = usePath();
  const [drawer, setDrawer] = useState(false);
  const [theme, setTheme] = useState(false);
  const headerLinks = document.querySelectorAll("#header-nav nav a");
  const mobileLinks = document.querySelectorAll(
    "#mobile-header-nav .drawer nav a"
  );
  const themeSwitch = document.querySelectorAll(".theme-switch");

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [mobileView, setMobileView] = useState(false);

  useEffect(() => {
    if (windowWidth < 700) {
      setMobileView(true);
    } else {
      setMobileView(false);
    }
  }, [windowWidth]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  // FUNCTIONS
  const setActiveLinks = () => {
    // Set Active Link class
    for (let i = 0; i < headerLinks.length; i++) {
      headerLinks[i].classList = "";
      let linkPath = headerLinks[i].getAttribute("href");
      if (path == linkPath) {
        headerLinks[i].classList.add("active-link");
      }
    }
    // if page width is < when drawer goes
    for (let i = 0; i < mobileLinks.length; i++) {
      mobileLinks[i].classList = "";
      let linkPath = mobileLinks[i].getAttribute("href");
      if (path == linkPath) {
        mobileLinks[i].classList.add("active-link");
      }
    }
  };

  const openDrawer = () => {
    setDrawer(!drawer);
  };

  const handleThemeSelect = () => {
    setTheme(!theme);
  };

  // EFFECTS
  useEffect(() => {
    setActiveLinks();
  }, []);

  useEffect(() => {
    setActiveLinks();
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    return () => {
      console.log(`Cleaning up ${path}`);
    };
  }, [path]);

  useEffect(() => {
    let AppContainer = document.getElementById("App");
    if (theme) {
      AppContainer.classList.add("theme-light");
    } else {
      AppContainer.classList.remove("theme-light");
    }
  }, [theme]);

  useEffect(() => {
    let hamburger = document.getElementById("hamburger");
    if (drawer) {
      hamburger.classList.add("active");
    } else {
      hamburger.classList.remove("active");
    }
  }, [drawer]);

  return (
    <header>
      <div className="banner-bg">
        <a
          href="https://www.alexgrey.com/art/paintings/soul/alex_grey_net_of_being"
          target="_blank"
        >
          [<i>Net of Being</i>, Alex Grey]
        </a>
      </div>
      <div id="header-nav">
        <nav>
          <A href="/" className="name-link">
            Stefan_Bobrowski
          </A>
          <A href="/work">Work</A>
          <A href="/learn">Learn</A>
          <A href="/personal">Personal</A>
          <A href="/contact">Contact</A>
        </nav>
      </div>

      <div id="mobile-header-nav">
        <div id="hamburger" className="not" onClick={openDrawer}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        {drawer ? (
          <div className="drawer">
            {/* <h3>Stefan_Bobrowski</h3> */}
            <nav>
              <A href="/">Home</A>
              <A href="/work">Work</A>
              <A href="/learn">Learn</A>
              <A href="/personal">Personal</A>
              <A href="/contact">Contact</A>
            </nav>
          </div>
        ) : (
          <div></div>
        )}
      </div>

      <div className="theme-switch-container">
        <span className={`${!theme ? "active" : ""}`}>Dark</span>
        <div className="selection-container" onClick={handleThemeSelect}>
          <div className={`theme-switch ${theme ? "on" : ""}`}></div>
        </div>
        <span className={`${theme ? "active" : ""}`}>Light</span>
      </div>

      <div className="window-stats">
        <span>
          Screen Size: {windowWidth}px x {windowHeight}px
        </span>
        <span>Mobile View: {mobileView ? "True" : "False"}</span>
        <span>Theme: {theme ? "Light" : "Dark"}</span>
      </div>
    </header>
  );
};

export default Header;
