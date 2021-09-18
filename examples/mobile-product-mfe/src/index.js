/* eslint-disable no-console */
/* eslint-disable react/no-render-return-value */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './main/App';

import appConstants from './appConstants';

// Function for fancy console outputs
const fancyConsoleLog = (input) => {
  console.log(
    `%c🐃 [${performance.now()} ms]\n\n${input}`,
    'color: #fefefe; background-color: #34f; font-size: 24px;',
  );
};

const mfeRoot = document.getElementById('mobile-product-mfe');
const fallbackRoot = document.getElementById('root');

const runningMode = mfeRoot
  ? appConstants.modes.mfe
  : appConstants.modes.standalone;

const renderTarget = mfeRoot || fallbackRoot;

fancyConsoleLog(`setting final render target, it looks like we're running in ${runningMode} mode.`);

// This method is called when we are running in standalone mode
const renderFn = (parameters) => ReactDOM.render(
  <React.StrictMode>
    <App data={parameters} />
  </React.StrictMode>,

  renderTarget,
);

fancyConsoleLog('setting window.renderTestMfe equal to the React render function');

if (runningMode === appConstants.modes.standalone) {
  renderFn();
} else {
  fancyConsoleLog(`We're running in ${runningMode} mode, so there's no need to call renderFn() here!`);

  // Setting the global window render function as this funciton
  window.renderTestMfe = renderFn;
}
