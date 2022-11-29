import React, { useState } from "react";
import ReactDOM from "react-dom";
import Splash from "./splash";
import "react-dat-gui/build/react-dat-gui.css";
import DatGui, {
  DatBoolean,
  DatColor,
  DatNumber,
  DatString
} from "react-dat-gui";
import "./styles.css";

function App() {
  const [dat, setDat] = useState({
    showSprite: true,
    playSprite: true,
    playPixi: true
  });
  return (
    <div className="App">
      <h2>Greensock + Pixi.js in React demo</h2>

      <Splash data={dat} />
      <DatGui data={dat} onUpdate={dat => setDat(dat)}>
        <DatBoolean path="playPixi" label="Play Pixi" />
        <DatBoolean path="showSprite" label="Show Sprite" />
        <DatBoolean path="playSprite" label="Play Sprite" />
      </DatGui>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
