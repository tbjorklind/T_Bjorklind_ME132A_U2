'use strict'

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
// Pushes cocktails in to database
function addCoctailToDatabase (database, coctail) {
  database.push(coctail)
}

//-------------------------------------------------------------//

// Renders a coctail object into a HTML element
function renderCoctail (coctail) {
  let div = document.createElement('div')
  div.classList.add('coctail')
  div.id = coctail.id
  div.innerHTML = `
    <li type ="1"></li>
    <div>${coctail.name}</div>
    <div>${coctail.liquor}</div>
    <div>${coctail.cl}</div>
    <div>${coctail.garniture}</div>
    <button>Remove coctail</button>
    `
  return div
}
// Creates an element that appends all cocktails
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
// Removes coctails by id
function removeCoctailById (database, id) {
  for (let i = 0; i < database.length; i++) {
    let coctail = database[i]
    if (coctail.id == id) {
      database.splice(i, 1)
      return
    }
  }
}
// Added event listener and alert, on remove
function removeCoctailWithClick () {
  let buttons = document.querySelectorAll('.coctail button')

  for (let button of buttons) {
    button.addEventListener('click', function (event) {
      let result = confirm('Are you sure you want to remove this coctail?')
      let button = event.target
      let id = button.parentElement.id

      if (result) {
        removeCoctailById(database, id)
        renderCoctails(database)
        alert('The coctail is removed!')
      } else {
        alert('Okay, the coctails remains!')
      }
    })
  }
}

//----------------------------add coctail----------------------------//
// function to add new coctail
function addCoctail (event) {
  event.preventDefault()

  let name = document.getElementById('name').value
  let liquor = document.getElementById('liquor').value
  let cl = Number(document.getElementById('cl').value)
  let garniture = document.getElementById('garniture').value

  let coctail = createNewCoctail(name, liquor, cl, garniture)

  coctail.id = database[database.length - 1].id + 1

  let form = document.getElementById('add-coctail-form')
  form.reset()

  // Alert that visitor must fill all fields
  if (name == '' || liquor == '' || cl == '' || garniture == '') {
    alert('Oh, not all fields were filled. Try again!')
  } else {
    addCoctailToDatabase(database, coctail)
    renderCoctails(database)
  }
}
// Added event listener
function addClickToAddButton () {
  let form = document.getElementById('add-coctail-form')
  form.addEventListener('submit', addCoctail)
}

//--------------------------------filter coctails------------------------//

//--------------------------------filter by liquor------------------------//
function getCoctailsByLiquor (coctails, liquor) {
  let coctailsByLiquor = []

  for (let coctail of coctails) {
    if (coctail.liquor.toLowerCase() == liquor.toLowerCase()) {
      coctailsByLiquor.push(coctail)
    }
  }
  return coctailsByLiquor
}
function filterByLiquor (event) {
  event.preventDefault()
  let liquor = document.getElementById('filter-liquor').value
  let coctails = getCoctailsByLiquor(database, liquor)

  // When I filter "garniture", the field is emptied from "liquors" last search.
  document.getElementById('filter-garniture').value = ''
  renderCoctails(coctails)
}
//--------------------------------filter by garniture------------------------//

function filterByGarniture (event) {
  event.preventDefault()
  let garniture = document.getElementById('filter-garniture').value
  let coctails = getCoctailsByGarniture(database, garniture)

  // When I filter "liquor", the field is emptied from "garniture's last search.
  document.getElementById('filter-liquor').value = ''
  renderCoctails(coctails)
}

function getCoctailsByGarniture (coctails, garniture) {
  let coctailsByGarniture = []

  for (let coctail of coctails) {
    if (coctail.garniture.toLowerCase() == garniture.toLowerCase()) {
      coctailsByGarniture.push(coctail)
    }
  }
  return coctailsByGarniture
}

//--------------------------------------------------------------------------//

function setFilters () {
  let liquorForm = document.getElementById('filter-by-liquor')
  let garnitureForm = document.getElementById('filter-by-garniture')
  let showAll = document.getElementById('show-all')

  liquorForm.addEventListener('submit', filterByLiquor)
  garnitureForm.addEventListener('submit', filterByGarniture)
  showAll.addEventListener('click', function () {
    document.getElementById('filter-liquor').value = ''
    document.getElementById('filter-garniture').value = ''

    renderCoctails(database)
  })
}

//------------------------------------------------------------------------//

addClickToAddButton()
setFilters()
renderCoctails(database)
