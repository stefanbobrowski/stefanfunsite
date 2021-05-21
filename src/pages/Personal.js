import React, { useState, useEffect } from "react";
import Dropdown from "../components/Dropdown";

import theValley from "../assets/pages/personal/the-valley.JPG";
import iceHockey from "../assets/pages/personal/ice-skating.MP4";
import skiing1 from "../assets/pages/personal/skiing-1.jpg";
import skiing2 from "../assets/pages/personal/skiing-2.jpg";

import drogoImg from "../assets/pages/personal/cats/drogo.jpg";
import sylviaImg from "../assets/pages/personal/cats/sylvia.jpg";
import cat1 from "../assets/pages/personal/cats/cat-1.jpg";
import cat2 from "../assets/pages/personal/cats/cat-2.jpg";
import cat3 from "../assets/pages/personal/cats/cat-3.jpg";
import cat4 from "../assets/pages/personal/cats/cat-4.jpg";
import cat5 from "../assets/pages/personal/cats/cat-5.jpg";
import cat6 from "../assets/pages/personal/cats/cat-6.jpg";
import cat7 from "../assets/pages/personal/cats/cat-7.jpg";
import cat8 from "../assets/pages/personal/cats/cat-8.jpg";
import cat9 from "../assets/pages/personal/cats/cat-9.jpg";
import cat10 from "../assets/pages/personal/cats/cat-10.jpg";
// import cat11 from "../assets/cats/cat-11.jpg";
// import cat12 from "../assets/cats/cat-12.jpg";

const Personal = () => {
  const [cats, setCats] = useState([
    {
      id: "1",
      name: "cat1",
      imgSrc: cat1,
      description: "Sleeping Sylvia"
    },
    {
      id: "2",
      name: "cat2",
      imgSrc: cat2,
      description: "Drogo ready for his closeup"
    },
    {
      id: "3",
      name: "cat3",
      imgSrc: cat3,
      description: "Mesmerized"
    },
    {
      id: "4",
      name: "cat4",
      imgSrc: cat4,
      description: "Sylvia feeling the music"
    },
    {
      id: "5",
      name: "cat5",
      imgSrc: cat5,
      description: "Stalker in the tall grass"
    },
    {
      id: "6",
      name: "cat6",
      imgSrc: cat6,
      description: "Sleeping like a human."
    },
    {
      id: "7",
      name: "cat7",
      imgSrc: cat7,
      description: "Walking my catdog"
    },

    {
      id: "8",
      name: "cat8",
      imgSrc: cat8,
      description: "Young Drogo with his first wand."
    },
    {
      id: "9",
      name: "cat9",
      imgSrc: cat9,
      description: "Sylvia waking up"
    },
    {
      id: "10",
      name: "cat10",
      imgSrc: cat10,
      description: "YAWN"
    }
    // {
    //   id: "11",
    //   name: "cat11",
    //   imgSrc: cat11,
    //   description: "I'm ready for my closeup"
    // },
    // {
    //   id: "12",
    //   name: "cat12",
    //   imgSrc: cat12,
    //   description: "Sleeping Beauty"
    // }
  ]);

  const [slideNum, setSlideNum] = useState(0);
  const [galleryState, setGalleryState] = useState([false, "", ""]);

  const [keyd, setKeyd] = useState(null);

  useEffect(() => {
    catSlider();
  }, [slideNum]);

  // useEffect(() => {
  //   catSlider();
  // }, [catsShow]);

  const handleDropdown = e => {
    let { target } = e;
    console.log(target);
    let icon = target.childNodes[1];
    if (icon.innerHTML == "+") {
      target.childNodes[1].innerHTML = "-";
      target.parentNode.childNodes[1].classList.add("drop");
    } else {
      target.childNodes[1].innerHTML = "+";
      target.parentNode.childNodes[1].classList.remove("drop");
    }
  };

  const catSlider = () => {
    let catSlide = document.querySelectorAll(".cat-slide");
    for (let i = 0; i < catSlide.length; i++) {
      catSlide[i].classList.remove("current-slide");
      if (i === slideNum) {
        catSlide[i].classList.add("current-slide");
      }
    }
  };

  const handlePrevSlide = () => {
    if (slideNum == 0) {
      setSlideNum(cats.length - 1);
    } else {
      setSlideNum(slideNum - 1);
    }
  };

  const handleNextSlide = () => {
    if (slideNum == cats.length - 1) {
      setSlideNum(0);
    } else {
      setSlideNum(slideNum + 1);
    }
  };

  let catModal;
  let domBody = document.querySelector("body");
  if (galleryState[0] == true) {
    domBody.style.overflow = "hidden";
    catModal = (
      <div className="cat-modal">
        <div className="window ">
          <span
            className="close-button"
            onClick={() => setGalleryState([false, "", ""])}
          >
            ❌
          </span>
          <div className="modal-img">
            <img src={galleryState[1]} />
          </div>
          <div className="modal-caption">
            <p>{galleryState[2]}</p>
          </div>
        </div>
      </div>
    );
  } else {
    catModal = <div></div>;
    domBody.style.overflow = "auto";
  }

  return (
    <div className="personal-page">
      <h1 className="page-header">Personal</h1>
      <h3>Personal Interests, hobbies, and other fun stuff</h3>
      <h3 className="under-construction">🚧 Under Construction 🚧</h3>
      <section>
        <div className="hobbies-container">
          {/* <h3>Hobbies:</h3> */}

          <div className="hobbies">
            <Dropdown
              extraClass="hobby"
              header={<h3>🥾 Hiking/Outdoors</h3>}
              body={
                <div>
                  <p>Exploring nature is one of my favorite hobbies.</p>
                  <img src={theValley}></img>
                  <p>
                    I'm from{" "}
                    <a
                      href="https://en.wikipedia.org/wiki/Shelton,_Connecticut"
                      target="_blank"
                    >
                      Shelton
                    </a>
                    .
                  </p>
                </div>
              }
            ></Dropdown>

            <Dropdown
              extraClass="hobby"
              header={<h3>🏒 Ice Hockey</h3>}
              body={
                <div>
                  <p>
                    I played Ice Hockey at my local rink for many years from age
                    5-12 ice skating.
                  </p>
                  <div>
                    <video
                      id="ice-hockey"
                      src={iceHockey}
                      width="300"
                      controls
                      muted={true}
                    ></video>
                  </div>
                  <p>Me ice skating to my favorite Rihanna song ;)</p>
                </div>
              }
            ></Dropdown>

            <Dropdown
              extraClass="hobby"
              header={<h3>👨🏻‍💻 Programming / Coding</h3>}
              body={
                <div>
                  <p>
                    While programming and coding is a part of my profession it
                    also happens to be a personal hobby of mine.
                  </p>
                  <p>
                    I've been programming since I took my first Computer
                    Programming class with Visual Basic my junior year of high
                    school (2006). I discovered programming in the web and
                    hosted my first HTML website soon after.
                  </p>
                  <ul>
                    <li>HTML</li>
                    <li>CSS</li>
                    <li>JavaScript</li>
                    <li>React</li>
                    <li>Node.js</li>
                    <li>Express.js</li>
                  </ul>
                </div>
              }
            ></Dropdown>

            <Dropdown
              extraClass="hobby"
              header={<h3>🖥️ PC Building</h3>}
              body={
                <div>
                  <p>
                    I was there at the dawn of the PC era. By 2012 while still
                    in elementary school I helped my father build our family's
                    first Personal Computer. Since then I've built 3 PCs, all
                    more powerful than the last, mostly to keep up with rising
                    hardware demands of software and games.
                  </p>

                  <h3>Current PC setup:</h3>
                  <ul className="hardware-list">
                    <li>
                      <span>🧳 Case:</span> CORSAIR CARBIDE 275R Mid-Tower
                      Gaming Case, Tempered Glass
                    </li>
                    <li>
                      <span>🔌 Power Supply:</span> EVGA 650 GQ, 80+ GOLD 650W
                    </li>
                    <li>
                      <span>⚙️ Motherboard:</span> ASUS ROG Strix Z370-H Gaming
                    </li>
                    <li>
                      <span>🤖 CPU:</span> Intel i7-8700K
                    </li>
                    <li>
                      <span>❄️ Cooling:</span> EVGA CLC 240mm All-In-One RGB LED
                      CPU Liquid Cooler
                    </li>
                    <li>
                      <span>🐏 RAM:</span> Crucial 16GB Kit (8GBx2) DDR4
                    </li>
                    <li>
                      <span>🖴 HDD:</span> WD Blue 1TB
                    </li>
                    <li>
                      <span>🖴 SDD:</span> Intel 330 Series 180GB
                    </li>
                    <li>
                      <span>👾 Video Card:</span> NVIDIA GeForce GTX 1060 6GB
                    </li>
                    <li>
                      <span>🖥️ Monitor 1:</span> Philips 242G5DJEB 144hz - 24" -
                      1ms Extreme Performance Professional Gaming Monitor
                    </li>
                    <li>
                      <span>🖥️ Monitor 2:</span> Asus VS247H-P - 24" - Full-HD
                      LED Monitor
                    </li>
                    <li>
                      <span>🖱️ Mouse:</span> Razer Deathadder, Logitech G330
                      Silent
                    </li>
                    <li>
                      <span>⌨️ Keyboard:</span> CM Storm QuickFire Rapid-i Fully
                      Backlit (CHERRY MX Brown Keyswitches)
                    </li>
                    <li>
                      <span>🎧 HeadPhones:</span> HyperX Cloud Gaming Headset
                    </li>
                  </ul>
                </div>
              }
            ></Dropdown>

            <Dropdown
              extraClass="hobby"
              header={<h3>🏐 Volleyball</h3>}
              body={
                <p>
                  I played Volleyball at Shelton High School my junior and
                  senior year. My position was center and I loved blocking
                  incoming spikes. We became 2008 SCC State Volleyball
                  Champions.
                </p>
              }
            ></Dropdown>

            <Dropdown
              extraClass="hobby"
              header={<h3>🎿 Skiing</h3>}
              body={
                <div>
                  <img src={skiing2}></img>
                  <p>
                    Skiing in Vermont with my best friends. (I'm on the left)
                  </p>
                  <img src={skiing1}></img>
                  <p>
                    A brief respite to capture this moment. Smooth sailing ahead
                  </p>
                </div>
              }
            ></Dropdown>

            <Dropdown
              extraClass="hobby"
              header={<h3>🎱 Pool</h3>}
              body={
                <div>
                  <p>
                    For some reason I'm pretty adept at pool it's something I
                    picked up in college as we had two pool tables in our dorm
                    common area.{" "}
                  </p>
                </div>
              }
            ></Dropdown>
            <Dropdown
              extraClass="hobby"
              header={<h3>🏊🏻‍♂️ Swimming</h3>}
              body={
                <div>
                  <p>
                    I swam every Summer in backyard pools and in the ocean. It
                    always felt great to submerge yourself after a long winter.
                  </p>
                  <p>
                    I once body-surfed 8-10 foot tall waves in the Bahamas and
                    have never had as much fun feeling like Poseidon.
                  </p>
                </div>
              }
            ></Dropdown>

            <Dropdown
              extraClass="hobby"
              header={<h3>🐅 My Cats 🐱</h3>}
              body={
                <div className="hobby-dropdown">
                  <h3>Cats</h3>
                  <p>This section is devoted to my two cats Drogo and Sylvy</p>
                  <section className="cat-stats">
                    <div>
                      <h3>
                        Drogo (Khal Drogo) <i>fierce warrior</i>
                      </h3>
                      <img src={drogoImg} alt="Drogo"></img>
                      <p>Gender: Male</p>
                      <p>Born: 2017</p>
                      <p>
                        Type: Cloudedjac (Crossbreed between Bengal, Savannah,
                        and Pixiebob cats.)
                      </p>
                      <p>Polydactyl cat (has 6 toes on each paw)</p>
                      <p>
                        Hobbies: Hunting, being outside, eating, being
                        upside-down, spinning, destroying computer chairs,
                        getting behind the ear scratches, taking naps.
                      </p>
                    </div>

                    <div>
                      <h3>
                        Sylvia (Sylvy) <i>spirit of the wood</i>
                      </h3>
                      <img src={sylviaImg} alt="Sylvia"></img>
                      <p>Gender: Female</p>
                      <p>Born: 2018</p>
                      <p>Type: Tabby</p>
                      <p>
                        Hobbies: Looking sad, chasing things down, fetching,
                        catching, playing, being hyper, eating, getting back
                        massages and head scratches.
                      </p>
                    </div>
                  </section>
                  <h3>Image Slideshow</h3>
                  <section className="cat-slider-container">
                    <span onClick={handlePrevSlide}>⏮️</span>
                    <div className="cat-slider">
                      {cats.map((cat, index) => {
                        return (
                          <div slide={index} key={index} className="cat-slide">
                            <img src={cat.imgSrc} alt={cat.name} />
                            <p>{cat.description}</p>
                          </div>
                        );
                      })}
                    </div>
                    <span onClick={handleNextSlide}>⏭️</span>
                  </section>
                  <h3>Image Gallery</h3>
                  <section className="cat-gallery-container">
                    {cats.map((cat, index) => {
                      return (
                        <div
                          key={index}
                          className="cat-item"
                          onClick={() =>
                            setGalleryState([true, cat.imgSrc, cat.description])
                          }
                        >
                          <img src={cat.imgSrc} alt={cat.name} />
                          <p>{cat.description}</p>
                        </div>
                      );
                    })}

                    {catModal}
                    <div className="cat-gallery-modal"></div>
                  </section>
                </div>
              }
            ></Dropdown>

            <Dropdown
              extraClass="hobby"
              header={<h3>🍽️ Eating 🍲 Cooking</h3>}
              body={
                <div className="hobby-dropdown">
                  <p>I watched the Food Network a lot when I was a kid.</p>
                  <p>
                    My dream meal plan if I could afford it and as far as Web
                    Emoji's go: (Hover for details)
                  </p>

                  <div className="food-icons">
                    <p>
                      Breakfast: [<span title="Pancakes">🥞</span>
                      <span title="Eggs">🥚</span>
                      <span title="Bacon">🥓</span>
                      <span title="Croissant Breakfast Sandwich">🥐</span>
                      <span title="Avocado">🥑</span>
                      <span title="Watermelon">🍉</span>
                      <span title="Banana">🍌</span>
                      <span title="Bagel w/ cream cheese">🥯</span>
                      <span title="Cappuccino">☕</span>]
                    </p>
                  </div>
                  <div className="food-icons">
                    <p>
                      Sushi Lunch: [<span title="Miso Soup">🥣</span>
                      <span title="Sushi">🍣</span>
                      <span title="Tea">🍵</span>
                      <span title="Bento Box">🍱</span>
                      <span title="Yaki Udon Noodles">🍜</span>
                      <span title="Sake">🍶</span>]
                    </p>
                  </div>
                  <div className="food-icons">
                    <p>
                      Late Lunch: [<span title="Gyro">🥙</span>
                      <span title="Cheeseburger">🍔</span>
                      <span title="Burrito">🌯</span>
                      <span title="Tacos">🌮</span>
                      <span title="Margarita">🍹</span> ]
                    </p>
                  </div>
                  <div className="food-icons">
                    <p>
                      Late Supper: [<span title="Garlic Bread">🍞</span>
                      <span title="Caesar salad">🥗</span>
                      <span title="Cheeses">🧀</span>
                      <span title="Penne Vodka">🍝</span>
                      <span title="Coconut Shrimp">🍤</span>
                      <span title="Broccoli">🥦</span>
                      <span title="Fried Chicken">🍗</span>
                      <span title="Ribeye Steak">🥩</span>
                      <span title="Sweet Potato">🍠</span>
                      <span title="Finest Scotch">🥃</span>]
                    </p>
                  </div>
                  <div className="food-icons">
                    <p>
                      Dessert: [
                      <span>
                        <span title="Pineapple">🍍</span>
                        <span title="Pecan Pie">🥧</span>
                        <span title="Short Cake">🍰</span>
                        <span title="Custard">🍮</span>
                        <span title="Ice Cream">🍨</span>
                        <span title="Cookies">🍪</span>
                        <span title="Milk">🥛</span>
                      </span>
                      ]
                    </p>
                  </div>
                </div>
              }
            ></Dropdown>

            <Dropdown
              extraClass="hobby"
              header={<h3>🎬 Movies</h3>}
              body={
                <div>
                  <p>
                    I have watched a ton of great movies with my friends &amp;
                    family and still try to this day.
                  </p>
                  <h3>Movies</h3>
                  <ul>
                    <li>The Matrix</li>
                    <li>Saving Private Ryan</li>
                    <li>Enemy at the Gates</li>
                    <li>Liar Liar</li>
                    <li>True Lies</li>
                    <li>X-Men</li>
                    <li>Jurassic Park</li>
                    <li>The Fifth Element</li>
                    <li>Predator</li>
                    <li>Alien</li>
                    <li>Prometheus</li>
                    <li>Die Hard</li>
                    <li>Die Hard with a Vengeance</li>
                    <li>Pulp Fiction</li>
                    <li>Meet the Parents</li>
                    <li>Pitch Black</li>
                    <li>Equilibrium</li>
                    <li>Terminator 2: Judgment Day</li>
                    <li>The Lord of the Rings</li>
                    <li>Donnie Darko</li>
                    <li>Battle Royale</li>
                    <li>Enter the Dragon</li>
                    <li>Crouching Tiger Hidden Dragon</li>
                    <li>G.I. Jane</li>
                    <li>Desperado</li>
                    <li>Mission Impossible</li>
                    <li>GoldenEye</li>
                    <li>Minority Report</li>
                    <li>Gladiator</li>
                    <li>300</li>
                    <li>The Last Samurai</li>
                    <li>Austin Powers</li>
                    <li>Tropic Thunder</li>
                    <li>Dazed and Confused</li>
                    <li>Shanghai Noon</li>
                    <li>The Legend of Drunken Master</li>
                    <li>Mr. Nice Guy</li>
                    <li>Rumble in the Bronx</li>
                    <li>Rush Hour</li>
                    <li>The Usual Suspects</li>
                    <li>Clerks</li>
                    <li>Mallrats</li>
                    <li>Shaun of the Dead</li>
                    <li>Road Trip</li>
                    <li>Akira</li>
                    <li>Princess Mononoke</li>
                    <li>Spirited Away</li>
                    <li>Heat</li>
                    <li>Vegas Vacation</li>
                    <li>Lost in Translation</li>
                    <li>Groundhog Day</li>
                    <li>Caddyshack</li>
                    <li>Happy Gilmore</li>
                    <li>Rushmore</li>
                    <li>The Shawshank Redemption</li>
                    <li>Braveheart</li>
                    <li>The Patriot</li>
                    <li>Inception</li>
                  </ul>
                </div>
              }
            ></Dropdown>

            <Dropdown
              extraClass="hobby"
              header={<h3>🎮 Video Games</h3>}
              body={
                <div>
                  <p>
                    I was lucky enough to grow up playing the best video games
                    since the early 90's. Below are some of my favorite PC games
                    I played on release:
                  </p>
                  <ul>
                    <li>Wolfenstein 3D (1992)</li>
                    <li>Doom (1993)</li>
                    <li>Hexen (1995)</li>
                    <li>Command &amp; Conquer (1995)</li>
                    <li>Duke Nukem (1996)</li>
                    <li>Quake (1996)</li>
                    <li>Quake II (1997)</li>
                    <li>Unreal (1998)</li>
                    <li>Half-Life (1998)</li>
                    <li>Team Fortress Classic (1999)</li>
                    <li>Counter-strike (1999)</li>
                    <li>Unreal Tournament (1999)</li>
                    <li>Quake III: Arena (1999)</li>
                  </ul>
                  <ul>
                    <li>Diablo II (2000)</li>
                    <li>Max Payne (2001)</li>
                    <li>Warcraft 3 (2002)</li>
                    <li>Max Payne 2 (2003)</li>
                    <li>World of Warcraft (2004)</li>
                    <li>Half-Life 2 (2004)</li>
                    <li>Guild Wars (2005)</li>
                    <li>Call of Duty 2 (Also came with Xbox 360)(2005)</li>
                    <li>The Elder Scrolls IV: Oblivion (2006)</li>
                    <li>Team Fortress 2 (2007)</li>
                    <li>Call of Duty 4: Modern Warfare (2007)</li>
                    <li>Fallout 3 (2008)</li>
                    <li>Call of Duty: Modern Warfare 2 (2009)</li>
                  </ul>
                  <ul>
                    <li>Starcraft II (2010)</li>
                    <li>Dark Souls (2011)</li>
                    <li>Counter-Strike: GO (2012)</li>
                    <li>Dota 2 (2013)</li>
                    <li>Hearthstone (2014)</li>
                    <li>The Witcher 3: The Wild Hunt (2015)</li>
                    <li>Overwatch (2016)</li>
                    <li>Doom (2016)</li>
                    <li>Dark Souls III (2016)</li>
                    <li>PlayerUnknown's Battlegrounds (2017)</li>
                    <li>Dragon Ball FighterZ (2018)</li>
                    <li>Sekiro: Shadows Die Twice (2019)</li>
                    <li>World of Warcraft: Classic (2019)</li>
                  </ul>

                  <ul>
                    <li>Warcraft 3: Reforged (2020)</li>
                    <li>Diablo 4 (2020)</li>
                    <li>Overwatch 2 (2020)</li>
                  </ul>
                </div>
              }
            ></Dropdown>

            <Dropdown
              extraClass="hobby"
              header={<h3>📻 Music</h3>}
              body={
                <div>
                  <p>
                    Music has been a major influence in my life and has helped
                    me through the good times and the bad times.
                  </p>
                  <ul>
                    <li>TOOL</li>
                    <li>System of a Down</li>
                    <li>Caligula's Horse</li>
                    <li>Disturbed</li>
                    <li>Children of Bodom</li>
                    <li>In Flames</li>
                    <li>Pink Floyd</li>
                    <li>Opeth</li>
                    <li>Haken</li>
                    <li>Riverside</li>
                    <li>Enchant</li>
                    <li>Above and Beyond</li>
                    <li>Goldie</li>
                    <li>Last Chance To Reason</li>
                    <li>The Contortionist</li>
                    <li>The Mars Volta</li>
                    <li>The Smashing Pumpkins</li>
                    <li>The Strokes</li>
                    <li>The Killers</li>
                    <li>The Beatles</li>
                    <li>Rage Against the Machine</li>
                    <li>Linkin Park</li>
                    <li>Silverstein</li>
                    <li>Black Sabbath</li>
                    <li>Daft Punk</li>
                  </ul>

                  <h4>🎸 Favorite Guitarists:</h4>
                  <ul>
                    <li>Adam Jones - TOOL</li>
                    <li>Mikael Åkerfeldt - Opeth</li>
                    <li>John Petrucci - Dream Theater</li>
                    <li>Kirk Hammett - Metallica</li>
                    <li>Daron Malakian - System of a Down</li>
                    <li>Dan Donegan - Disturbed</li>
                    <li>David Gilmour - Pink Floyd</li>
                    <li>Jerry Cantrell - Alice in Chains</li>
                    <li>Alexi Laiho - Children of Bodom</li>
                    <li>Billy Howerdel - A Perfect Circle</li>
                    <li>James Iha - The Smashing Pumpkins/A Perfect Circle</li>
                  </ul>

                  <h4>🎸 Favorite Bassists:</h4>
                  <ul>
                    <li>Just Chancellor - TOOL</li>
                    <li>Martín Méndez - Opeth</li>
                    <li>John Myung - Dream Theater</li>
                    <li>
                      Tim Commerford - Rage Against the Machine/Audioslave
                    </li>
                  </ul>

                  <h4>🥁 Favorite Drummers:</h4>
                  <ul>
                    <li>Danny Carey - TOOL</li>
                    <li>Martin Axenrot - Opeth</li>
                    <li>Martin Lopez - Opeth/Soen</li>
                    <li>John Dolmayan - System of a Down</li>
                    <li>Brad Wilk - Rage Against the Machine/Audioslave</li>
                  </ul>

                  <h4>🎤 Favorite Singers:</h4>
                  <ul>
                    <li>Maynard James Keenan - TOOL</li>
                    <li>Chester Bennington - Linkin Park</li>
                    <li>Serj Tankian - System of a Down</li>
                    <li>Layne Staley - Alice in Chains</li>
                    <li>David Draiman - Disturbed</li>
                    <li>David Gilmour - Pink Floyd</li>
                    <li>Michael Lessard - The Contortionist</li>
                  </ul>

                  <h4>🎹 Favorite Keyboardist:</h4>
                  <ul>
                    <li>Janne Warman - Children of Bodom</li>
                    <li>Brandon Flowers - The Killers</li>
                  </ul>
                </div>
              }
            ></Dropdown>
            <Dropdown
              extraClass="hobby"
              header={<h3>📚 Reading</h3>}
              body={
                <div>
                  <p>
                    In this digital era I'm not half the literature aficionado I
                    woud like to be. These days I most of my reading on
                    Medium.com or the YouTube comment section. That being said
                    here are some of my personal favorites novels:{" "}
                  </p>
                  <ul className="reading-list">
                    <li>It Only Takes A Minutes To Change Your Life!</li>
                    <li>Ender's Game</li>
                    <li>The Hobbit</li>
                    <li>
                      <ul>
                        A Song of Ice and Fire series:
                        <li>A Game of Thrones</li>
                        <li>A Clash of Kings</li>
                        <li>A Storm of Swords</li>
                        <li>A Feast for Crows</li>
                      </ul>
                    </li>
                    <li>
                      {" "}
                      <ul>
                        The Horus Heresy Series:
                        <li>Horus Rising</li>
                        <li>Angel Exterminatus</li>
                        <li>Know No Fear</li>
                        <li>The Master of Mankind</li>
                        <li>The Outcast Dead</li>
                      </ul>
                    </li>
                    <li>
                      <ul>
                        Manga:
                        <li>Berserk</li>
                        <li>Akira</li>
                        <li>Vagabond</li>
                      </ul>
                    </li>
                  </ul>
                </div>
              }
            ></Dropdown>

            <Dropdown
              extraClass="hobby"
              header={<h3>⚙️ Engineering</h3>}
              body={
                <div>
                  <p>
                    An engineer is someone who uses Science or Math to design or
                    make things. To me engineering is the Yin and Yang of
                    Science and Art, a balance between rigid rational logic and
                    free-flowing creativity. Engineers have been our world's
                    problem solvers for thousands of years.
                  </p>

                  <p>
                    {" "}
                    As a 90's baby thrown into the digital era I've always
                    wondered how it all works. I've found my own niche in Web
                    Engineering but there are many subsets of engineering that
                    I'm fascinated by: civil and structural, mechanical,
                    electronic, nuclear, and more.
                  </p>
                  <p>
                    As Einstein once said "The greatest scientists are artists
                    as well", I say the greatest engineers are scientists and
                    artists as well!
                  </p>
                </div>
              }
            ></Dropdown>

            <Dropdown
              extraClass="hobby"
              header={<h3> ⛏️ Mining/Blacksmithing </h3>}
              body={
                <div>
                  <p>
                    A dream of mine is to start my own dig site and stumble upon
                    unearthed metal ores and precious gems. I would then mine it
                    and build a blacksmithing area with a forge and anvil to
                    craft armor and weapons like the old days.
                  </p>
                </div>
              }
            ></Dropdown>

            {/*     <div className="hobby">
              <h4 onClick={handleDropdown}>
                🎿 Movies <span>+</span>
              </h4>
              <div className="hobby-dropdown">
                <p>I watched a ton of great movies with my family growing up.</p>
              </div>
            </div>*/}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Personal;
