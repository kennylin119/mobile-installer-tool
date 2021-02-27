# How to Run the Vanilla Container App 🍦

## Pre-Requisites
* You must have Git installed on your system.
* You must have Node.js installed on your system (https://nodejs.org/en/). I recommend installing the LTS version

## The Process
* Clone this repository from Bitbucket
* With your favorite terminal app, navigate to the root directory of this application and run "npm install"
  * Note: npm will automatically be installed on your system when you install Node.js.
* Run "npm run start" in your terminal to start the vanilla container application in development mode.
  * Development mode gives you, among other things, the auto-reloading feature I mentioned during the demo on 02.25.2021.

## Hints, Tips, Etc.
* npm commands always take the form "npm run <command>". Look at the scripts node of the package.json file to see what commands are available to you in this particular project.
* Remember that this vanilla container application doesn't contain React or any fancy frameworks! It's just plain JavaScript, HTML, and CSS that happens to know how to render an MFE within itself!