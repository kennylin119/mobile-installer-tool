import { useState } from "react";
import "./App.css";

function App(props) {
  const {data} = props;

  const [numWaterBuffalo, setNumWaterBuffalo] = useState(1);

  return (
    <div
      className="App"
      onClick={() => setNumWaterBuffalo(numWaterBuffalo + 1)}
    >
      <header className="App-header">
        <h1 className="hero">{`${data}`.repeat(numWaterBuffalo)}</h1>
        <div>I am the MFE</div>
        <p>
          Click anywhere in the MFE to increase the water buffalo population
        </p>
      </header>
    </div>
  );
}

export default App;
