import React, { useState } from "react";
import axios from "axios";
import "./Dictionary.css";
import Results from "./Results";
import Photos from "./Photos";

export default function Dictionary(props) {
  let [keyword, setKeyword] = useState(props.defaultKeyword);
  let [results, setResults] = useState(null);
  let [loaded, setLoaded] = useState(false);
  let [photos, setPhotos] = useState(null);

  function handleDictionaryResponse(response) {
    //console.log(response.data[0]);
    //console.log(response.data[0].meanings[0].definitions[0].definition);
    setResults(response.data[0]);
  }

  function handlePexelsResponse(response) {
    setPhotos(response.data.photos);
  }

  function search() {
    // documentation : https://api.dictionaryapi.dev/
    let apiURL = `https://api.dictionaryapi.dev/api/v2/entries/en_US/${keyword}`;
    axios.get(apiURL).then(handleDictionaryResponse);

    let pexelsApiKey =
      "563492ad6f91700001000001570acd6f339348068a5b5ab297046afb";
    let pexelsApiUrl = `https://api.pexels.com/v1/search?query=${keyword}&per_page=9`;
    let headers = { Authorization: `Bearer ${pexelsApiKey}` };

    axios.get(pexelsApiUrl, { headers: headers }).then(handlePexelsResponse);
  }

  function handleSubmit(event) {
    event.preventDefault();
    search();
  }

  function handleKeywordChange(event) {
    setKeyword(event.target.value);
  }

  function load() {
    setLoaded(true);
    search();
  }

  if (loaded) {
    return (
      <div className="Dictionary">
        <section>
          <h1>Word Inquiry</h1>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-sm-9">
                <input
                  type="Search"
                  autoFocus={true}
                  onChange={handleKeywordChange}
                  placeholder={props.defaultKeyword}
                  className="form-control search-input"
                />
              </div>
              <div className="col-sm-3">
                <button type="submit" value="Search" className="form-btn">
                  Submit
                </button>
              </div>
            </div>
          </form>
          <small className="hint">
            <em>i.e. coding, inspired, gratification, culinary </em>{" "}
          </small>
        </section>

        <Results results={results} />
        <Photos photos={photos} />
      </div>
    );
  } else {
    load();
    return "Loading";
  }
}
