import React, { useState, useEffect } from "react";
import learnBanner from "../assets/pages/learn/learn-banner.jpg";
import htmlElement from "../assets/pages/learn/html-element.png";
import htmlClass from "../assets/pages/learn/html-class.png";
import tcpIp from "../assets/pages/learn/tcpip.jpg";

const Learn = () => {
  const [section, setSection] = useState(80);

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  useEffect(() => {
    console.log("section changed");
  }, [section]);

  const handleTab = t => {
    const allSections = document.querySelectorAll("section");
    const allTabs = document.querySelectorAll(".section-tabs span");

    allTabs.forEach(tab => {
      tab.classList.remove("active");
    });
    allTabs[t].classList.add("active");

    allSections.forEach(section => {
      section.classList.remove("show");
    });
    allSections[t].classList.add("show");

    setSection(t);

    window.scroll({
      top: 360,
      left: 0,
      behavior: "smooth"
    });
  };

  return (
    <div className="learn-page">
      <h1 className="page-header">Learn</h1>
      <h3>Learn Web Development</h3>
      <h3 className="under-construction">🚧 Under Construction 🚧</h3>
      <h2 className="learn-title">2020 Web Development Guide</h2>

      <div className="learn-banner">
        <img src={learnBanner} />
      </div>

      <div className="section-tabs">
        <span onClick={() => handleTab(0)} className="active">
          Preface
        </span>
        <span onClick={() => handleTab(1)}>I. Intro</span>
        <span onClick={() => handleTab(2)}>II. HTML</span>
        <span onClick={() => handleTab(3)}>III. CSS</span>
        <span onClick={() => handleTab(4)}>IV. Javascript</span>
        <span onClick={() => handleTab(5)}>V. Publishing</span>
        <span onClick={() => handleTab(6)}>VI. Node.js</span>
        <span onClick={() => handleTab(7)}>VII. APIs</span>
        <span onClick={() => handleTab(8)}>VIII. React.js</span>
        <span onClick={() => handleTab(9)}>IX. Express.js</span>
        <span onClick={() => handleTab(10)}>X. MongoDB</span>
        <span onClick={() => handleTab(11)}>XI. The Future</span>
      </div>

      <section className="preface show">
        <div className="authors-note">
          <h2>Preface</h2>
          <h3>👨‍💻 So you want to be a Web Developer?</h3>
          <p>
            {" "}
            Learning Web Development is no easy task. It's a vast and
            complicated subject. If not for the sheer number of technologies
            that comprise it, then for the fact that it is also constantly
            evolving. The modern Web Developer must be constantly aware of how
            the field is developing; often adding a new library, framework, or
            an entirely new protocol to their toolkit.
          </p>

          <p>
            The first lesson for an aspiring web developer to learn is that
            <i> change is the only constant</i>.
          </p>

          <p>
            {" "}
            For the complete <span className="noob">n00b</span> just trying to
            learn how to create their first basic website, it can be a challenge
            getting in the door on google and trying to find a proper learning
            resource. There are a growing number of click-bait articles,
            tutorials, and old forum threads to stumble upon; Some of which can
            lead down a rabbit hole of misinformation or legacy code hell.
          </p>
          <p>
            {" "}
            I recommend the{" "}
            <a href="https://developer.mozilla.org/en-US/" target="_blank">
              Mozilla Developer Network
            </a>{" "}
            for an official resource and documentation, as well as{" "}
            <a href="https://stackoverflow.com/" target="_blank">
              Stack Overflow
            </a>{" "}
            for a community of straight-forward answers and working code
            examples. These sites have been a huge help to me as a Web Developer
            and a major inspiration for writing this guide.
          </p>

          <p>
            The 2020 Web Development Guide also aims to be a trusted learning
            resource. It leverages current web standards and best practices to
            teach you the fundamentals of building in the web, what is working
            at the forefront of innovation today, and what we can expect to use
            in the future.
          </p>

          <p>
            For even starting to read the <i>2020 Web Development Guide</i> I
            commend you! Wherever your learning path leads, take it one step at
            a time, practice regularly, believe in yourself, and soon you too
            will be able to create clean, fast, and modern web applications to
            drive your business or passion. With enough confidence you can use
            your newfound prowess to earn money, land a web-related job, or
            perhaps create something no one has seen before!
          </p>
          <p>
            Thank you and enjoy,
            <br></br> <br></br>- Stefan Bobrowski
          </p>
        </div>

        <div className="index">
          <h2>2020 Web Development Guide</h2>
          <p>
            The 2020 Web Development guide uses{" "}
            <a
              href="https://developer.mozilla.org/en-US/docs/Web/Reference"
              target="_blank"
            >
              MDN Web Docs
            </a>{" "}
            as an official reference. It aims to be as cross-platform and
            non-opinionated as possible but focuses on the following tools and
            technologies:
          </p>

          <div className="web-technologies">
            <p>
              <b>Browser</b>: Chrome, Firefox, or Safari
            </p>
            <p>
              <b>Code Editor</b>: Visual Studio Code -{" "}
              <a href="https://code.visualstudio.com/" target="_blank">
                Download
              </a>
            </p>

            <p>
              <b>Web Technologies</b>: HTML, CSS, Javascript, Web APIs, Node.js,
              React.js, Express.js, MongoDB.{" "}
            </p>
          </div>

          <ul className="index-list">
            <h2>Index</h2>

            <li onClick={() => handleTab(1)}>I. Intro - the Internet</li>
            <li onClick={() => handleTab(2)}>II. HTML - Structuring the Web</li>
            <li onClick={() => handleTab(3)}>III. CSS - Styling the Web</li>
            <li onClick={() => handleTab(4)}>
              IV. Javascript - Client-side Programming
            </li>
            <li onClick={() => handleTab(5)}>V. Publishing - Web Servers</li>
            <li onClick={() => handleTab(6)}>
              VI. Node.js - Server-side Programming
            </li>
            <li onClick={() => handleTab(7)}>
              VII. APIs - Make your virtual life easier
            </li>
            <li onClick={() => handleTab(8)}>
              VIII. React.js - Frontend Javascript Library
            </li>
            <li onClick={() => handleTab(9)}>
              IX. Express.js - Backend Framework
            </li>
            <li onClick={() => handleTab(10)}>X. MongoDB - Database</li>
            <li onClick={() => handleTab(11)}>
              XI. The Future - Machines and AI
            </li>
          </ul>
        </div>

        <p>
          Please use the Index links above or the quick links to the right to
          navigate the guide.
        </p>
      </section>

      <section>
        <h2>I. Introducing The Web</h2>
        <p>What is the World Wide Web?</p>
        <p> What is the Internet? </p>
        <p>
          We use these technologies everyday and yet the answer may not be so
          obvious. Some think they are one and the same.
        </p>
        <h3>Internet</h3>
        <p>
          The Internet is a gigantic system of interconnected computer networks
          that provides billions of users across the globe with information
          resources as well as communication and web services. Some examples are
          File Transfer Protocol (FTP), E-Mail, Chat rooms, and of course the
          World Wide Web.
        </p>

        <h3>The World Wide Web</h3>
        <p>
          The Web is another service the internet provides. It is the largest
          collection of information and media resources in the world. Users with
          a computer, a connection to the internet, and a web browser can access
          web resources via their web address (URL). Such resources include
          document files, audios, images, videos, and most commonly websites
          which can embed any of the above listed resources.
        </p>

        <h3>Website</h3>
        <p>
          Take a look at the very first{" "}
          <a href="http://info.cern.ch/hypertext/WWW/TheProject.html">
            Website
          </a>
        </p>

        <p>
          You can tell this is a very basic textual website. What is does
          contain are hyperlinks, or just links, to other documents or web pages
          on the site. Links are the primary form of navigation on websites.
        </p>

        <h3>How it all works</h3>
        <p>
          Under the hood the Internet is connected through a broad array of
          networking technologies that all share the same Internet Protocol
          Suite (TCP/IP). This protocol specifies how data should be packaged,
          addressed, transmitted, and recieved in different layers.
        </p>

        <p className="side-note">
          A protocol is a system of rules that define how data is exchanged
          between devices.
        </p>
        <h3>The Internet Protocol Suite (TCP/IP)</h3>
        <div>
          <img src={tcpIp} alt="TCP/IP"></img>
        </div>

        <p>
          There is a lot going on here, but we don't have to dig into the inner
          workings of each of these layers to be a Web Developer. Today many of
          these layers and their complexities are abstracted away and you can
          focus on building in the web!
        </p>

        <h3>Building In The Web</h3>
        <p>
          Let focus on building something in the web. What if I said you already
          have everything you need to make your first website?
        </p>

        <p>
          Without any further explanation let's jump right in and create our
          first website!
        </p>
        <p>Download your preferred Code Editor:</p>
        <ul>
          <li>
            1.) Download{" "}
            <a href="https://code.visualstudio.com/" target="_blank">
              VScode
            </a>
          </li>
          <li>2.) Open your editor and create a file named 'index.html'.</li>
          <li>
            3.) Paste in the following code:
            <h3>💻 Code:</h3>
            <div className="coding-example">
              <div className="file-name">
                <span>
                  <i className="code-icon html-icon">{"<>"} </i>index.html
                </span>
              </div>
              <div className="code-block">
                <pre className="line-numbers">
                  <code className="language-html">
                    {`<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>My First Website</title>
  </head>
  <body>
    <h2>My First Website</h2>
    <p>Welcome to my first Website!</p>
    <p>See? Anyone can make their mark on the Worldwide Web.</p>
  </body>
</html>
`}
                  </code>
                </pre>
              </div>
            </div>
            <p>
              Just by naming our file with the .html extension we are creating
              an HTML file! VScode recognizes this filetype and gives us access
              to a whole bunch of useful features inside the editor as we code
              that a normal text editor could not.
            </p>
          </li>
          <li>
            {" "}
            4.) Now locate the <code className="inline-code">
              index.html
            </code>{" "}
            file on your system and open it not with VScode but with a web
            browser!
          </li>
        </ul>
        <div className="live-preview">
          <div className="preview-name">
            <span>🌐 My First Website</span>
          </div>
          <div className="preview">
            <h2>My First Website</h2>
            <p>Welcome to my first Website!</p>
            <p> See? Anyone can make their mark on the Worldwide Web.</p>
          </div>
        </div>
        <p>There it is our first website!</p>
        <p>
          Although it isn't live, it is displayed exactly as it would be in the
          web.
        </p>
        <p className="side-note">
          We have used our web browser to open an HTML file from our local
          computer. This is a local website and is not live on the World Wide
          Web. Just check the the URL in your web browser's address bar; It's
          not your typical URL but rather the filepath to the 'index.html' file
          on your computer! We could make this live by purchasing a domain and
          configuring a Web server to host our file. More on this later.
        </p>
        <p>
          Try to make sense of the HTML code and how it translates to the
          preview. In the next section it will make more sense as we go over the
          HTML essentials line by line.
        </p>
        <p className="next-section" onClick={() => handleTab(2)}>
          Next Section: II. HTML
        </p>
      </section>

      <section sec="2">
        <h2>I. HTML</h2>
        <h4>HTML Essentials</h4>
        <p>
          An HTML document is a plaintext document structured with{" "}
          <b>elements</b>.
        </p>
        <p>
          Elements begin with an opening tag{" "}
          <code className="inline-code">{"< >"}</code> and end with a closing
          tag <code className="inline-code">{"</ >"}</code>
        </p>
        <p>
          For example:
          <img src={htmlElement}></img>
          This image shows a <code className="inline-code">{"<p>"}</code>{" "}
          element which represents a paragraph.
        </p>
        <p>Let's pull up our simple HTML website from the previous section:</p>

        <h3>💻 Code:</h3>
        <div className="file-name">
          <span>
            <i className="code-icon html-icon">{"<>"} </i>index.html
          </span>
        </div>
        <div className="code-block">
          <pre className="line-numbers">
            <code className="language-html">
              {`<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>My First Website</title>
  </head>
  <body>
    <h2>My First Website</h2>
    <p>Welcome to my first Website!</p>
    <p>See? Anyone can make their mark on the Worldwide Web.</p>
  </body>
</html>
`}
            </code>
          </pre>
        </div>
        <p>
          Line 1: <code className="inline-code">{"<!DOCTYPE html>"}</code>{" "}
        </p>
        <p>
          This line of code is the first thing a Web Browser reads and
          interprets when an HTML document is loaded. It tells the browser we
          are dealing with an HTML file.
        </p>
        <p>
          This is a unique element with no closing tag that is only needed once
          per html file. Historically this line has been a bit harder to
          remember and we thank HTML5 for this concise version.
        </p>
        <p>
          Line 2: <code className="inline-code">{"<html>"}</code>
        </p>
        <p>
          {" "}
          <code className="inline-code">{"<html>"}</code> is our first true HTML{" "}
          <i>"tag"</i>. It's closing tag{" "}
          <code className="inline-code">{"</html>"}</code> is on Line 14.
        </p>
        <p>The HTML tag is a mandatory wrapper for our HTML document.</p>
        <p>
          Lines 3 - 8: <code className="inline-code">{"<head>"}</code> and it's
          contents. The head section is where we can set our site's TITLE, add
          META tags (containers for information about the site), and import
          stylesheets and scripts (more on that later).
        </p>
        <p>
          Line 9: <code className="inline-code">{"<body>"}</code> is our BODY
          tag. It is a wrapper for the body of our website and where we can
          start building the visual structure.
        </p>
        <p>
          Lines 10 - 12: The meat of our website is what's inside the BODY tag.{" "}
        </p>
        <p>
          In this example we use a heading{" "}
          <code className="inline-code">{" <h2></h2>"}</code> tag and two
          paragraph <code className="inline-code">{" <p></p>"}</code> tags to
          denote a heading and two paragraphs.
        </p>
        <h4>HTML Elements</h4>
        <h4>Major HTML tags</h4>
        <ul>
          <li>div: generic container element</li>
          <li>br: self-closing tag line break</li>
          <li>
            span: generic container usually denoting a word or words with a
            special style{" "}
          </li>
          <li>b: bold</li>
          <li>i: italic</li>
          <li>a: anchor tag. Used for links </li>
          <li>p: paragraph tag element</li>
          <li>h1: Header 1</li>
          <li>h2</li>
          <li>ul: unordered list</li>
          <li>ol: ordered list</li>
          <li>li: list item</li>
          <li>img: image</li>
          <li>video: video</li>
          <li>table</li>
          <li>td, tr</li>
          <li>form</li>
          <li>input</li>
          <li>textarea</li>
          <li>button</li>
          <h5>HTML5 semantic elements</h5>
          <li>nav</li>
          <li>main</li>
          <li>section</li>
          <li>header</li>
          <li>footer</li>
          <h5>Attributes</h5>
        </ul>
        <h4>Building with HTML</h4>
        <p>Let's build a more complex example utilizing all our tags.</p>
        <div className="coding-example">
          <div className="live-preview">
            <div className="preview-name">
              <span>🌐 My Second Website</span>
            </div>
            <div className="preview">
              <header>
                Header
                <nav>
                  <a href="/">Home</a>
                  <a href="/about">About</a>
                  <a href="/contact">Contact</a>
                </nav>
              </header>
              <main>
                <h1>Header 1</h1>
                <h2>Header 2</h2>
                <h3>Header 3</h3>
                <h4>Header 4</h4>
                <h5>Header 5</h5>
                <h6>Header 6</h6>
                <p>Welcome to my second Website!</p>
                <p>
                  What <span>else</span> can we do with a <i>'p'</i>{" "}
                  <b>element</b>?
                </p>
                <a href="google.com">Google</a>
                <img src="../assets/html-anatomy.png"></img>
                <form>
                  <input />
                  <br />
                  <textarea />
                  <button>Submit</button>
                </form>
              </main>
              <footer>footer</footer>
            </div>
          </div>
        </div>
        <h4>Advanced HTML</h4>
        <h3>Attributes</h3>
      </section>
      <section>
        <h2>III. CSS</h2>
        <p>
          Want to add color to our website? The best way to do that is with
          another type of file called a CSS file. There we can define all sorts
          of styles for our HTML elements.
        </p>
        <p>
          Let's create a new CSS file called "styles.css" to modify the font and
          colors called styles.css. Paste in the following css rules:
        </p>
        <div className="file-name">
          <span>
            <i className="code-icon css-icon">{"#"}</i> styles.css
          </span>
        </div>
        <div className="coding-example">
          <pre className="line-numbers">
            <code className="language-css">
              {`body {
  background-color: green;
}

h2 {
  margin-bottom: 10px;
  font-size: 26px;
  font-weight: bold;
  text-decoration: underline:
  color: navy;
}

p { 
  font-size: 18px;
  color: blue;
}
`}
            </code>
          </pre>
        </div>
        <p>
          As a quick introduction rundown, this stylesheet is providing rules
          for our <code className="inline-code">{"<body>"}</code> tag to have a
          background color of green, our{" "}
          <code className="inline-code">{"<h2>"}</code> tags to have a bottom
          margin of 10 pixels for spacing, font size of 26 pixels, a font weight
          of bold, a text decoration underline, and color navy, and for all of
          our <code className="inline-code">{"<p>"}</code> elements to have a
          font size of 18 pixels and colored blue.
        </p>
        <p>
          We can link our HTML document and an external resource such as a CSS
          stylesheet with the {"<link>"} tag. Seen below on line 7.
        </p>
        <pre className="line-numbers">
          <code className="language-html">
            {`<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link type="text/css" rel="stylesheet" href="styles.css">
    <title>My First Website</title>
  </head>
  <body>
    <h2>My First Website</h2>
    <p>Welcome to my first Website!</p>
    <p>See? Anyone can make their mark on the Worldwide Web.</p>
  </body>
</html>
`}
          </code>
        </pre>

        <p>
          The result? Our page is slightly styled and yet our User Experience is
          already greatly enhanced with improved readability and a more pleasing
          color scheme.
        </p>

        <div className="coding-example">
          <div className="live-preview css-1">
            <div className="preview-name">
              <span>🌐 My First Website</span>
            </div>
            <div className="preview">
              <h2>My First Website</h2>
              <p>Welcome to my first Website!</p>
              <p> See? Anyone can make their mark on the Worldwide Web.</p>
            </div>
          </div>
        </div>
        <h3>Major CSS styles</h3>
        <h3>Basics</h3>

        <h4>Some common CSS styles:</h4>
        <ul>
          <li>display: inline, block, inline-block, flex, grid</li>
          <li>margin, padding, border, outline</li>
          <li>position: relative, absolute, fixed</li>
          <li>top, right, bottom, left:</li>
          <li>z-index: (integer)</li>
          <li>transition: (time) (easing)</li>
          <li>cursor: pointer</li>
          <li>color: name, hex, rgb, rgba</li>
          <li>opacity: (int)</li>
          <li>visibility: visible, hidden</li>
        </ul>

        <h4>Responsive Design</h4>

        <p>
          A serious website in 2020 should look good and be completely usable on
          all popular devices.
        </p>

        <h4>Fluid Width</h4>

        <h4>Media Queries</h4>

        <h4>Flexbox</h4>
        <h4>Grid</h4>
        <h4>Transitions</h4>
        <h4>Animations</h4>
        <h4>SASS</h4>
        <p>
          Sass is a CSS pre-processor that makes CSS more efficient and adds
          more functiionality to standard CSS. Variables, Nesting, Conditionals.
        </p>
        <h4>Custom Reusable CSS Components</h4>
        <p>
          Custom Reusable CSS Components over a framework such as bootstrap.
        </p>
        <p>
          If we are comfortable structuring and styling our app, let's advance
          it further with Javascript!
          <span onClick={() => handleTab(section + 1)}>Prev Section</span>
          <span onClick={() => handleTab(sectoin - 1)}>next Section</span>
        </p>
      </section>

      <section>
        <h2>IV. Javascript</h2>
        <p>What is Javascript? </p>
        <p>
          JavaScript is the programming language of the browser. Fundamentally
          it makes your pages dynamic and allows for sending and getting data.
        </p>
        <p>
          Javascript is the only client side language. It waits to execute code
          until it is on your computer computer browser. Each browser has an
          engine that runs the code. In the past this meant Javascript was a
          slow language but computers are so fast these days that is not the
          case anymore. Modern Javascript can be very fast, but still not as
          fast as a language like C++.
        </p>
        <p>
          One of the easiest ways to see it in action is to use the Console,
          part of any modern browser's development toolset.
        </p>
        <p>
          Open up Chrome for example and press{" "}
          <code className="inline-code">f12</code> on your keyboard to open the
          development window.
        </p>
        <p>
          Click on the <i>Console</i> tab
        </p>
        <p></p>

        <h3>💻 Code:</h3>
        <div className="file-name">
          <span>
            <i className="code-icon js-icon">{"JS"} </i>script.js
          </span>
        </div>
        <pre className="line-numbers">
          <code className="language-jsx">console.log("yea");</code>
        </pre>

        <h4>Fundamentals</h4>
        <h4>Declaring variables:</h4>
        <ul>
          <li>var, let, const</li>
        </ul>
        <h4>Data Types</h4>
        <h4>DOM</h4>
        <h4>Functions</h4>
        <h4>Conditionals</h4>
        <h4>JSON</h4>
        <h4>template literals</h4>
      </section>
      <section>
        <h2>V. Publishing</h2>

        <p>Domain Registration</p>
        <p>Managed Hosting </p>
        <p>Static Hosting</p>
        <p>SSL Certificate</p>
        <p>FTP, SFTP (File Transfer Protocol)</p>
        <p>SSH (Secure Shell)</p>
        <p>CLI &amp; Git</p>

        <h4>Web Server Environment: NGINX, Apache</h4>
        <h4>Web Hosting: Digital Ocean</h4>
      </section>
      <section>
        <h2>VI. Node.js</h2>
        <h4>NPM</h4>
        <p>
          Can use javascript as a server-side language. Node.js is fast,
          asychronous, single-threaded, great for Web apps as long as not CPU
          intensive.{" "}
        </p>
        <h4>Git &amp; Github</h4>
        <p>Version control</p>
        <h4>Parcel (JS Module Bundler)</h4>
      </section>
      <section>
        <h2>VII. APIs</h2>
        <h4>Fetch API</h4>
        <p>API first design</p>
      </section>
      <section>
        <h2>VIII. React.js</h2>
      </section>
      <section>
        <h2>IX. Express.js</h2>
      </section>

      <section>
        <h2>X. MongoDB </h2>
        <h4>Relational Databases - PostgreSQL</h4>
        <p>Been around forever. </p>
        <h4>NoSQL Databases - MongoDB</h4>
        <p>JSON documents. Application level freedom. </p>
        <h4>Cloud Databases - Firebase, Azure Cloud DB, AWS</h4>

        <h4>GraphQL</h4>
        <p>A query language for your API. </p>
      </section>

      <section>
        <h2>XI. The Future - Machines and AI</h2>
        <p>Machine Learning</p>
        <p>A.I.</p>
        <p>Data Mining/User Behavior</p>
        <p>Removing Security Threats</p>
        <h4>Web Assembly</h4>
        <p>
          Use low level languages like C and C++, or Rust which are much faster
          than javascript and would give our web apps the ability to do things
          like run a modern video game or media editing right in the browser.
        </p>
      </section>
    </div>
  );
};

export default Learn;
