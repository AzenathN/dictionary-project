import "./App.css";
import language from "./language.png";
import Dictionary from "./Dictionary";

function App() {
  return (
    <div className="App">
      <div className="container">
        <header className="App-header">
          <div className="images">
            <img
              src={language}
              className="logo"
              alt="magnifying glass over a dictionary"
            />
          </div>
        </header>
        <main>
          <Dictionary />
        </main>
        <footer className="text-center">
          {" "}
          open source code from sheCodes coded by Azenath
        </footer>
      </div>
    </div>
  );
}

export default App;
