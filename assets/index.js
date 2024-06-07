//Global variables

const colourEl = document.getElementById("colour-box");
const selectEl = document.getElementById("select-colour");

const colourHex = document.querySelectorAll("colour-hex");

let coloursArray = [];
let colourChoice = "";

//Send users RGB/colour choices to the API, retrieves it and then renders it to the HTML.

document.getElementById("colour-btn").addEventListener("click", function () {
  colourChoice = colourEl.value.slice(1);
  fetch(
    `https://www.thecolorapi.com/scheme?hex=${colourChoice}&mode=${selectEl.value}&count=4`
  )
    .then((res) => res.json())
    .then((data) => {
      coloursArray = data.colors;
      renderColours();
    });
});

//connecting this function with coloursHTML, so each value goes into place so that it can then be rendered.
function getColours() {
  let html = coloursHTML(`#${colourChoice}`);

  coloursArray.forEach((color) => {
    html += coloursHTML(color.hex.value);
  });
  return html;
}

//Formatting how the colours and hex values should look in the HTML.
function coloursHTML(colour) {
  return `<div class="colour-container">
                <div class="colour-section" style="background-color:${colour};" onClick="copyText()"></div>
                <p class="colour-hex" onClick="copyText()">${colour}</p>
            </div>
            `;
}

//rendering each colour to the innerHTML.
function renderColours() {
  document.getElementById("generated-colours").innerHTML = getColours();
}
