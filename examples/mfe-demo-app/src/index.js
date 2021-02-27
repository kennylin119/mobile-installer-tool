import React from "react";
import ReactDOM from "react-dom";

import appConstants from "./appConstants";
import "./index.css";
import App from "./App";

const fancyConsoleLog = (input) => {
  console.log(
    `%c🐃 [${performance.now()} ms]\n\n${input}`,
    "color: #fefefe; background-color: #34f; font-size: 24px;"
  );
};

// this is a little more complex in the real world, but this is the idea...
const mfeRoot = document.getElementById("mfe-root");

// if we can't find the mfeRoot above, we must be running in standalone mode
const fallbackRoot = document.getElementById("root");

const runningMode = mfeRoot
  ? appConstants.modes.mfe
  : appConstants.modes.standalone;

// only attempt to render in the mfeRoot if it actually exists!
const renderTarget = mfeRoot || fallbackRoot;
fancyConsoleLog(
  `setting final render target, it looks like we're running in ${runningMode} mode`
);

// wrap the render function in *another* function so that we can control when it's called
const renderFn = () =>
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    // use the renderTarget that actually exists, whichever it is
    renderTarget
  );

// make the renderTestMfe function available globally on the window object -- this is important!
fancyConsoleLog(
  "setting window.renderTestMfe equal to the React render function"
);

if (runningMode === appConstants.modes.standalone) {
  // we only need to actually call the renderFn ourselves if we're running in standalone mode
  // if we're running in MFE mode, the container will call this function for us!
  renderFn();
} else {
  fancyConsoleLog(
    `We're running in ${runningMode} mode, so there's no need to call renderFn() here!`
  );

  // in fact, we don't need to expose this renderFn function to the global window object unless we're running in MFE mode
  window.renderTestMfe = renderFn;
}
