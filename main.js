'use strict'

createNewCoctail()
renderCoctails(database)


// Creates a new coctail object, and returns it
function createNewCoctail (name, liquor, cl, garniture) {
  let coctail = {
    name: name,
    liquor: liquor,
    cl: cl,
    garniture: garniture
  }
  return coctail
}
// Push new coctail in to database
function addCoctailToDatabase (database, coctail) {
  database.push(coctail)
}

//-------------------------------------------------------------//

// Renders a coctail object into a HTML element
function renderCoctail (coctail) {
  let div = document.createElement('div')
  div.classList.add('coctail')

  div.innerHTML = `
    <div>${coctail.nr}</div>
    <div>${coctail.name}</div>
    <div>${coctail.liquor}</div>
    <div>${coctail.cl}</div>
    <div>${coctail.garniture}</div>
    <button>Remove coctail</button>
    `
  return div
}

function renderCoctails (coctails) {
  let coctailsElement = document.getElementById('coctails')
  coctailsElement.innerHTML = ''

  for (let coctail of coctails) {
    let coctailElement = renderCoctail(coctail)
    coctailsElement.appendChild(coctailElement)
  }
  removeCoctailWithClick()
}

//------------------------remove coctail------------------------//

function removeCoctailByName (database, name) {
  for (let i = 0; i < database.length; i++) {
    let coctail = database[i]
    if (coctail.name == name) {
      database.splice(i, 1)
    }
  }
}

function removeCoctailWithClick () {
  let buttons = document.querySelectorAll('.coctail button')

  for (let button of buttons) {
    button.addEventListener('click', function (event) {
      let result = confirm('Are you sure you want to remove this coctail?')
      let button = event.target
      let name = button.parentElement.children[1].textContent

      if (result) {
        removeCoctailByName(database, name)
        renderCoctails(database)
        alert('The coctail is removed!')
      } else {
        alert('Okay, the coctails remains!')
      }
    })
  }
}

//--------------------------------------------------------------//

function addCoctail (event) {
    event.preventDefault ();

    let name = document.getElementById("name").value;
    let liquor = document.getElementById("liquor").value;
    let cl = Number(document.getElementById("cl").value);
    let garniture = document.getElementById("garniture").value;

    let coctail = createNewCoctail (name, liquor, cl, garniture);

    addCoctailToDatabase(database, coctail);
    renderCoctails(database);

    let form = document.getElementById("add-coctail-form");
    form.reset();
}

function addClickToAddButton () {
    let form = document.getElementById("add-coctail-form");
    form.addEventListener("submit", addCoctail)
}

//--------------------------------------------------------------//

addClickToAddButton ();