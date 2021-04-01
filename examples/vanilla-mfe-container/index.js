const myFavEmoji = '🥲';

const renderMicroFrontend = () => {
  // Defined by the contained MFE
  window.renderTestMfe(myFavEmoji);
};

/**
 * Wraps console.log to provide a consistent logging format for the vanilla container app
 * @param {string} input the item to be console.logged in a common format
 */
const fancyConsoleLog = (input) => {
  console.log(
    `%c🍦 [${performance.now()} ms]\n\n${input}`,
    "color: #212121; font-size: 24px;"
  );
};

document.addEventListener("DOMContentLoaded", () => {
  fancyConsoleLog("DOM content done loading...");

  const name = "emoji-mfe";
  const host = "http://127.0.0.1:8081";
  // const host = "http://localhost:3000/";
  const scriptId = `micro-frontend-script-${name}`;

  // if the main script already exists, we can render the MFE right away!
  if (document.getElementById(scriptId)) {
    renderMicroFrontend();
    return;
  }

  // This method assumes Webpack was used to build the MFE
  // See: https://webpack.js.org/concepts/manifest/
  // fetch asset manifest file to determine all script chunks we need to load
  fetch(`${host}/asset-manifest.json`)
    .then((res) => res.json())
    .then((manifest) => {
      // in outer scope, count total number of chunks declared in manifest file
      let totalChunks = -1;
      fancyConsoleLog(
        "Manifest loaded! Time to attach all relevant files to the host application"
      );

      // iterate over all required files declared in manifest
      Object.keys(manifest["files"])
        // filter out any files we don't care about for rendering the MFE, such as .map and .txt files
        .filter((key) => key.endsWith(".js") || key.endsWith(".css"))
        // exclude service worker script as we're not registering it anyway
        .filter((key) => !key.includes("service-worker"))
        .forEach((key, _, arr) => {
          if (totalChunks < 0) {
            totalChunks = arr.length;
          }

          // create a <script> or <link> tag for each declared chunk
          const path = `${host}${manifest["files"][key]}`;
          if (key.endsWith(".css")) {
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.type = "text/css";
            link.href = path;
            link.media = "all";

            link.onload = () => {
              totalChunks--;
            };

            document.head.appendChild(link);
          } else if (key.endsWith(".js")) {
            const script = document.createElement("script");

            // if the current file is the entry point, give it an ID attribute
            if (key === "main.js") {
              script.id = scriptId;
            }

            script.onload = () => {
              totalChunks--;
              if (totalChunks === 0) {
                fancyConsoleLog("All chunks loaded! Time to render the MFE");
                // only render the micro frontend once all chunks have been processed
                renderMicroFrontend();
              }
            };

            script.src = path;
            document.head.appendChild(script);
          }
        });
    })
    .catch((err) => {
      console.log(
        `%c🍦 (${err}) 👉 is it possible you forgot to start the MFE server?`,
        "color: #fefefe; background-color: #ff1919; font-size: 20px;"
      );
    });
});



// To render our mobile-product-mfe
document.addEventListener("DOMContentLoaded", () => {
  fancyConsoleLog("DOM content done loading...");

  const name = "mobile-product-mfe";
  const host = "http://127.0.0.1:8082";
  const scriptId = `micro-frontend-script-${name}`;

  // if the main script already exists, we can render the MFE right away!
  if (document.getElementById(scriptId)) {
    renderMicroFrontend();
    return;
  }

  // This method assumes Webpack was used to build the MFE
  // See: https://webpack.js.org/concepts/manifest/
  // fetch asset manifest file to determine all script chunks we need to load
  fetch(`${host}/asset-manifest.json`)
    .then((res) => res.json())
    .then((manifest) => {
      // in outer scope, count total number of chunks declared in manifest file
      let totalChunks = -1;
      fancyConsoleLog(
        "Manifest loaded! Time to attach all relevant files to the host application"
      );

      // iterate over all required files declared in manifest
      Object.keys(manifest["files"])
        // filter out any files we don't care about for rendering the MFE, such as .map and .txt files
        .filter((key) => key.endsWith(".js") || key.endsWith(".css"))
        // exclude service worker script as we're not registering it anyway
        .filter((key) => !key.includes("service-worker"))
        .forEach((key, _, arr) => {
          if (totalChunks < 0) {
            totalChunks = arr.length;
          }

          // create a <script> or <link> tag for each declared chunk
          const path = `${host}${manifest["files"][key]}`;
          if (key.endsWith(".css")) {
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.type = "text/css";
            link.href = path;
            link.media = "all";

            link.onload = () => {
              totalChunks--;
            };

            document.head.appendChild(link);
          } else if (key.endsWith(".js")) {
            const script = document.createElement("script");

            // if the current file is the entry point, give it an ID attribute
            if (key === "main.js") {
              script.id = scriptId;
            }

            script.onload = () => {
              totalChunks--;
              if (totalChunks === 0) {
                fancyConsoleLog("All chunks loaded! Time to render the MFE");
                // only render the micro frontend once all chunks have been processed
                renderMicroFrontend();
              }
            };

            script.src = path;
            document.head.appendChild(script);
          }
        });
    })
    .catch((err) => {
      console.log(
        `%c🍦 (${err}) 👉 is it possible you forgot to start the MFE server?`,
        "color: #fefefe; background-color: #ff1919; font-size: 20px;"
      );
    });
});
