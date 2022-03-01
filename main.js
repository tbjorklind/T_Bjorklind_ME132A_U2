"use strict"

createNewCoctail();
renderCoctails(database);

function createNewCoctail (name, liquor, cl, garniture) {
    let coctail = {
        name: name,
        liquor: liquor,
        cl: cl,
        garniture: garniture,
    };
    return coctail;
}

function addCoctailToDatabase(database, coctail) {
  database.push(coctail);
}
// Renders a coctail object into a HTML element
function renderCoctail (coctail) {
  let div = document.createElement('div')
  div.classList.add("coctail")

  div.innerHTML = `
    <div>${coctail.nr}</div>
    <div>${coctail.name}</div>
    <div>${coctail.liquor}</div>
    <div>${coctail.cl}</div>
    <div>${coctail.garniture}</div>
    <button>Remove coctail</button>
    `;
  return div;
}

function renderCoctails (coctails) {
  let coctailsElement = document.getElementById("coctails")
  coctailsElement.innerHTML = ''

  for (let coctail of coctails) {
    let coctailElement = renderCoctail(coctail);
    coctailsElement.appendChild(coctailElement)
  }
}