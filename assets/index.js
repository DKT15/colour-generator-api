const colourEl = document.getElementById("colour-box");
const selectEl = document.getElementById("select-colour");

let coloursArray = [];
let colourChoice = "";

//Send users RGB/colour choice as well as option to API

document.getElementById("colour-btn").addEventListener("click", function () {
  colourChoice = colourEl.value.slice(1);
  console.log(colourChoice);
  fetch(
    `https://www.thecolorapi.com/scheme?hex=${colourChoice}&mode=${selectEl.value}&count=5`
  )
    .then((res) => res.json())
    .then((data) => {
      coloursArray = data.colors;
      renderColours();
      console.log(data);
    });
});

function getColours() {
  let html = coloursHTML(`#${colourChoice}`);

  coloursArray.forEach((color) => {
    html += coloursHTML(color.hex.value);
  });
  return html;
}

function coloursHTML(colour) {
  return `<div class="colour-container">
                <div id="colour-box" style="background-color:${colour};"></div>
                <p class="colour-value">${colour}</p>
            </div>
            `;
}

function renderColours() {
  document.getElementById("generated-colours").innerHTML = getColours();
}
