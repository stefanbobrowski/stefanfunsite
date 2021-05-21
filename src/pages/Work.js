import React, { useState, useEffect } from "react";
import { useRoutes, usePath, A } from "hookrouter";
import Dropdown from "../components/Dropdown";
import resume from "../assets/pages/work/SAB Resume.pdf";
import resumePic from "../assets/pages/work/resume-pic.jpg";
import workPic from "../assets/pages/work/work.jpg";

const Work = () => {
  const [state, setState] = useState("");

  return (
    <div className="work-page">
      <h1 className="page-header">Work</h1>
      <h3>Resume, Work Portfolio, Education, and Projects</h3>
      <h3 className="under-construction">🚧 Under Construction 🚧</h3>

      <Dropdown
        extraClass="resume"
        header={<h3>📄 Resume</h3>}
        body={
          <div className="resume-container">
            <div className="resume-pic">
              <img src={resumePic} alt="resume"></img>
            </div>
            <p>
              <a href={resume} target="_blank">
                View/Download Resume
              </a>{" "}
              (.pdf)
            </p>
          </div>
        }
      ></Dropdown>

      <Dropdown
        extraClass="work-portfolio"
        header={<h3>👨‍💼 Work Portfolio</h3>}
        body={
          <div>
            <div className="work-pic">
              <img src={workPic} alt="work"></img>
            </div>
            <p>
              Websites I have worked on through full-time, contract, or
              freelance work.
            </p>
            <div className="work-history">
              <Dropdown
                header={<h3>🏢 Direct Wines, Inc. (2019)</h3>}
                body={
                  <div className="work-links">
                    <a href="https://www.directwinesinc.com/" target="_blank">
                      <span>Direct Wines, Inc.</span>
                    </a>
                    <a href="https://www.wsjwine.com/" target="_blank">
                      <span>WSJ Wine</span>
                    </a>
                    <a href="https://www.macyswinecellar.com/" target="_blank">
                      <span>Macy's Wine Cellar</span>
                    </a>
                  </div>
                }
              ></Dropdown>
              <Dropdown
                header={<h3>🏢 Kathy Kuo Home (2018)</h3>}
                body={
                  <div className="work-links">
                    <a href="https://www.kathykuohome.com/" target="_blank">
                      <span>Kathy Kuo Home</span>
                    </a>
                    <a
                      href="https://www.kathykuohome.com/designbar"
                      target="_blank"
                    >
                      <span>Design Bar</span>
                    </a>
                  </div>
                }
              ></Dropdown>
              <Dropdown
                header={<h3>🏢 ArchiFx (2017)</h3>}
                body={
                  <div className="work-links">
                    <a
                      href="https://www.archifx.com/web-design-portfolio/"
                      target="_blank"
                    >
                      <span>ArchiFX</span>
                    </a>
                  </div>
                }
              ></Dropdown>
              <Dropdown
                header={<h3>🏢 Healthcasts (2017)</h3>}
                body={
                  <div className="work-links">
                    <a href="http://hcp.healthcasts.com/" target="_blank">
                      <span>Healthcasts (2017)</span>
                    </a>
                  </div>
                }
              ></Dropdown>
              <Dropdown
                header={<h3>🏢 Lipovksy Excavation (2017)</h3>}
                body={
                  <div className="work-links">
                    <a href="https://lipovskyexcavation.com/" target="_blank">
                      <span>Lipovsky Excavation</span>
                    </a>
                  </div>
                }
              ></Dropdown>
              <Dropdown
                header={<h3>🏢 Finalsite: (2014 - 2016)</h3>}
                body={
                  <div className="work-links">
                    <a href="https://www.asf.edu.mx/" target="_blank">
                      <span>The American School Foundation</span>
                    </a>
                    <a href="https://www.slshs.org/" target="_blank">
                      <span>Seton LaSalle</span>
                    </a>{" "}
                    <a href="https://www.collingwood.org/" target="_blank">
                      <span>Collingwood</span>
                    </a>
                    <a href="http://www.canacad.ac.jp/" target="_blank">
                      <span>Canadian Academy</span>
                    </a>
                    <a href="https://www.stjames.edu/" target="_blank">
                      <span>Saint James</span>
                    </a>
                    <a href="http://www.desmet.org/" target="_blank">
                      <span> De Smet Jesuit</span>
                    </a>
                    <a href="http://www.village-school.org/" target="_blank">
                      <span>Village School</span>
                    </a>
                    <a href="http://www.cleveland.edu/" target="_blank">
                      <span>Cleveland University</span>
                    </a>
                    <a href="http://www.gosaints.org/" target="_blank">
                      <span> St. Andrew's</span>
                    </a>
                    <a href="https://www.summit.k12.nj.us/" target="_blank">
                      <span>Summit Public Schools</span>
                    </a>
                    <a href="http://www.acs.edu.lb/" target="_blank">
                      <span>American Community School Beirut</span>
                    </a>
                    <a href="https://www.stevenscoop.org/" target="_blank">
                      <span>Stevens Cooperative School</span>
                    </a>
                    <a href="https://www.stisidore.org/" target="_blank">
                      <span>St. Isidore</span>
                    </a>
                    <a href="http://www.stfrancis.k12.mn.us/" target="_blank">
                      <span>Independent School District 15</span>
                    </a>
                    <a href="https://www.pjaproud.org/" target="_blank">
                      <span> Portland Jewish Academy</span>
                    </a>
                    <a href="http://www.cabe.org/" target="_blank">
                      <span>
                        Connecticut Association of Boards of Education
                      </span>
                    </a>
                  </div>
                }
              ></Dropdown>
            </div>
          </div>
        }
      ></Dropdown>

      <Dropdown
        extraClass="projects"
        header={<h3>📂 Projects</h3>}
        body={
          <div>
            <p>
              A collection of Web Applications I've made to help me learn or
              just for fun. Code included.
            </p>
            <div className="projects-container">
              <div className="project">
                <h3>📂 To-Do List</h3>
                <div>
                  <h5>
                    Project Link: <A href="projects/todo">To-Do List</A>
                  </h5>
                  <h5>Description:</h5>
                  <p>
                    My implementation of the classic ToDo list. Create and
                    Delete ToDo's.
                  </p>
                  <h5>Skills used:</h5>
                  <p>React, JavaScript, SCSS</p>
                  <div className="skill-icons">
                    <i className="code-icon react-icon" title="React">
                      {""}
                    </i>
                    <i className="code-icon js-icon" title="JavaScript">
                      {"JS"}
                    </i>
                    <i className="code-icon scss-icon" title="SCSS">
                      {""}
                    </i>
                  </div>
                </div>
              </div>

              <div className="project">
                <h3>📂 BlackJack</h3>
                <h5>
                  Project Link: <A href="projects/blackjack">BlackJack</A>
                </h5>
                <h5>Description:</h5>
                <p>The classic Blackjack card game. 3D table and audio.</p>
                <h5>Skills used:</h5>
                <p>React, JavaScript, SCSS</p>
                <div className="skill-icons">
                  <i className="code-icon react-icon" title="React">
                    {""}
                  </i>
                  <i className="code-icon js-icon" title="JavaScript">
                    {"JS"}
                  </i>
                  <i className="code-icon scss-icon" title="SCSS">
                    {""}
                  </i>
                </div>
              </div>

              <div className="project">
                <h3>📂 GoTVote</h3>
                <div>
                  <h5>
                    Project Link: <A href="projects/gotvote">GotVote</A>
                  </h5>

                  <h5>Description:</h5>
                  <p>
                    Fetch Game of Thrones Characters from tvmaze API. Vote for
                    your favorite!
                  </p>
                  <h5>Skills used:</h5>
                  <p>React, JavaScript, SCSS</p>
                  <div className="skill-icons">
                    <i className="code-icon react-icon" title="React">
                      {""}
                    </i>
                    <i className="code-icon js-icon" title="JavaScript">
                      {"JS"}
                    </i>
                    <i className="code-icon scss-icon" title="SCSS">
                      {""}
                    </i>
                  </div>
                </div>
              </div>

              <div className="project">
                <h3>📂 Image Search</h3>
                <div>
                  <h5>
                    Project Link:{" "}
                    <A href="projects/imagesearch">Image Search</A>
                  </h5>

                  <h5>Description:</h5>
                  <p>Image Search using pexels API</p>
                  <h5>Skills used:</h5>
                  <p>React, JavaScript</p>
                  <div className="skill-icons">
                    <i className="code-icon react-icon" title="React">
                      {""}
                    </i>
                    <i className="code-icon js-icon" title="JavaScript">
                      {"JS"}
                    </i>
                  </div>
                </div>
              </div>

              <div className="project">
                <h3>📂 DataCenter</h3>
                <div>
                  <h5>
                    Project Link: <A href="projects/datacenter">DataCenter</A>
                  </h5>

                  <h5>Description:</h5>
                  <p>Data center ready to service all of your data needs.</p>
                  <h5>Skills used:</h5>
                  <p>React, JavaScript, SCSS, HTML</p>
                  <div className="skill-icons">
                    <i className="code-icon react-icon" title="React">
                      {""}
                    </i>
                    <i className="code-icon js-icon" title="JavaScript">
                      {"JS"}
                    </i>
                    <i className="code-icon scss-icon" title="SCSS">
                      {""}
                    </i>
                    <i className="code-icon html-icon" title="HTML">
                      {"<>"}
                    </i>
                  </div>
                </div>
              </div>

              <div className="project">
                <h3>📂 Sacred Geometry</h3>
                <div>
                  <h5>
                    Project Link:{" "}
                    <A href="projects/sacredgeometry">Sacred Geometry</A>
                  </h5>
                  <h5>Description:</h5>
                  <p>
                    Sacred geometry shapes drawn programmaticly with SVG
                    elements.
                  </p>
                  <h5>Skills used:</h5>
                  <p>React, JavaScript, SVG shapes, SCSS</p>
                  <div className="skill-icons">
                    <i className="code-icon react-icon" title="React">
                      {""}
                    </i>
                    <i className="code-icon js-icon" title="JavaScript">
                      {"JS"}
                    </i>
                    <i className="code-icon scss-icon" title="SCSS">
                      {""}
                    </i>
                    <i className="code-icon html-icon" title="HTML">
                      {"<>"}
                    </i>
                  </div>
                </div>
              </div>

              <div className="project">
                <h3>📂 City Life</h3>
                <div>
                  <h5>
                    Project Link: <A href="projects/citylife">City Life</A>
                  </h5>

                  <h5>Description:</h5>
                  <p>Game of life in the City</p>
                  <h5>Skills used:</h5>
                  <p>React, SCSS</p>
                  <div className="skill-icons">
                    <i className="code-icon react-icon" title="React">
                      {""}
                    </i>
                    <i className="code-icon scss-icon" title="SCSS">
                      {""}
                    </i>
                  </div>
                </div>
              </div>
              <div className="project">
                <h3>📂 Cinder</h3>
                <div>
                  <h5>
                    Project Link: <A href="projects/cinder">Cinder</A>
                  </h5>
                  <h5>Description:</h5>
                  <p>
                    Recreation of popular dating app Tinder's loading animation.
                    Smooth blip animation.
                  </p>
                  <h5>Skills used:</h5>
                  <p>Javascript, CSS, HTML</p>
                  <div className="skill-icons">
                    <i className="code-icon js-icon" title="JavaScript">
                      {"JS"}
                    </i>
                    <i className="code-icon css-icon" title="CSS">
                      {"#"}
                    </i>
                    <i className="code-icon html-icon" title="HTML">
                      {"<>"}
                    </i>
                  </div>
                </div>
              </div>
              <div className="project">
                <h3>📂 Soul Collector</h3>
                <div>
                  <h5>
                    Project Link:{" "}
                    <A href="projects/soulcollector">Soul Collector</A>
                  </h5>
                  <h5>Description:</h5>
                  <p>
                    First attempt at creating a video game for the web using
                    Phaser framework.
                  </p>
                  <h5>Skills used:</h5>
                  <p>JavaScript, Phaser</p>
                  <div className="skill-icons">
                    <i className="code-icon js-icon" title="JavaScript">
                      {"JS"}
                    </i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
      ></Dropdown>
      <Dropdown
        extraClass="education"
        header={<h3>📚 Education</h3>}
        body={
          <div className="degree-story">
            <p>University of Connecticut (2010-2014)</p>
            <p>Bachelor of Science in Computer Science</p>
            <div className="degree">
              <div className="degree-icons">
                <div className="setting">
                  <span className="sun">☀️</span>
                  <span className="clouds">☁️&nbsp;☁️&nbsp;☁️</span>
                  <span className="school"> 🏫</span>
                  <span className="trees">🌲🌲&nbsp;&nbsp;🌳🌳🌲</span>
                </div>
                <div className="scene">
                  <span className="grad">👨‍🎓</span>
                  <span className="free">🏃</span>
                  <span className="deg">📜</span>
                  <span className="throw">🎓</span>
                </div>
              </div>
              <h4 className="school-name">University of Connecticut</h4>
              <h5>Be it known that</h5>
              <h4 className="full-name">Stefan Anatolio Bobrowski</h4>
              <h5>has satisfied the requirements for the Degree of</h5>
              <h4>Bachelor of Science</h4>
              <h5 className="major">Computer Science</h5>
              <h5>in the</h5>
              <h4>School of Engineering</h4>
              <span className="medal">🥇</span>

              <h5 className="year">2010-2014</h5>
            </div>
            <p>(Hover to see me recieve my Degree)</p>
          </div>
        }
      ></Dropdown>
    </div>
  );
};

export default Work;
