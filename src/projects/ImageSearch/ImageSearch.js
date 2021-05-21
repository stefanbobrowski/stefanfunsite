import React, { useState, useEffect } from "react";
import { useRoutes, usePath, A } from "hookrouter";
import regeneratorRuntime from "regenerator-runtime";

const ImageSearch = () => {
  const [images, setImages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("cats");
  const [resultsNum, setResultsNum] = useState(null);

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  const getImages = async term => {
    // Promises
    /*fetch(
      `https://api.pexels.com/v1/search?query=${term}+query&per_page=9&page=1`,
      {
        headers: {
          Authorization:
            "563492ad6f9170000100000149c5d5ea54ab4d77902a5fea59b5c5da"
        }
      }
    )
    .then(res => res.json())
    .then(res => {
      console.log(res.photos);
      setImages(res.photos);
    }); */

    // Async/await
    try {
      let response = await fetch(
        `https://api.pexels.com/v1/search?query=${term}+query&per_page=9&page=1`,
        {
          headers: {
            Authorization:
              "563492ad6f9170000100000149c5d5ea54ab4d77902a5fea59b5c5da"
          }
        }
      );
      let json = await response.json();
      setImages(json.photos);
      setResultsNum(json.total_results);
    } catch (err) {
      console.log(err);
    }
  };

  const handleInput = e => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = async e => {
    e.preventDefault();
    await getImages(searchTerm);
    console.log("Searching...");
  };

  return (
    <div>
      <h1 className="page-header">Image Search App</h1>
      <p>
        Fetch images from API with <strike>promises</strike> async/await.
      </p>
      <div className="app image-search">
        <h1 className="page-header">Image Search!</h1>
        <input onChange={handleInput} placeholder="Imagine..." maxLength="64" />
        <button onClick={handleSearch}>Search!</button>
        <p>Search Results: {resultsNum}</p>
        <div className="images-container">
          {images.map((img, index) => {
            return (
              <div className="image-container" key={img.id}>
                <img src={img.src.medium} />
              </div>
            );
          })}
        </div>
      </div>

      <h3>💻 Code:</h3>
      <div className="file-name">
        <span>
          <i className="code-icon js-icon">{"JS"} </i>ImageSearch.js
        </span>
      </div>
      <pre className="line-numbers">
        <code className="language-jsx">
          {`import React, { useState, useEffect } from "react";
import regeneratorRuntime from "regenerator-runtime";

const ImageSearch = () => {
  const [images, setImages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("cats");
  const [resultsNum, setResultsNum] = useState(null);

  const getImages = async term => {
    // with Promises
    /*fetch(
      'https://api.pexels.com/v1/search?query=term+query&per_page=9&page=1',
      {
        headers: {
          Authorization:
            "########################################################"
        }
      }
    )
    .then(res => res.json())
    .then(res => {
      console.log(res.photos);
      setImages(res.photos);
    }); */

    // with Async/await
    try {
      let response = await fetch(
        'https://api.pexels.com/v1/search?query=term+query&per_page=9&page=1',
        {
          headers: {
            Authorization:
              "########################################################"
          }
        }
      );
      let json = await response.json();
      setImages(json.photos);
      setResultsNum(json.total_results);
    } catch (err) {
        console.log(err);
    }
  };

  const handleInput = e => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = async e => {
    e.preventDefault();
    await getImages(searchTerm);
    console.log("Searching...");
  };

  return (
    <div>
      <h1 className="page-header">Image Search App</h1>
      <p>
        Fetch images from API with <strike>promises</strike> async/await.
      </p>
      <div className="app image-search">
        <h1 className="page-header">Image Search!</h1>
        <input onChange={handleInput} placeholder="Imagine..." maxLength="64" />
        <button onClick={handleSearch}>Search!</button>
        <p>Search Results: {resultsNum}</p>
        <div className="images-container">
          {images.map((img, index) => {
            return (
              <div className="image-container" key={img.id}>
                <img src={img.src.medium} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ImageSearch;
`}
        </code>
      </pre>
      <A href="/work" className="back-link">
        Back to Work
      </A>
    </div>
  );
};

export default ImageSearch;
