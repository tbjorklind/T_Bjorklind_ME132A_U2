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
// Push new coctail in to database
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

function removeCoctailById (database, id) {
  for (let i = 0; i < database.length; i++) {
    let coctail = database[i]
    if (coctail.id == id) {
      database.splice(i, 1)
      return
    }
  }
}

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

  if (name == '' || liquor == '' || cl == '' || garniture == '') {
    alert('Oh, not all fields were filled. Try again!')
  } else {
    addCoctailToDatabase(database, coctail)
    renderCoctails(database)
  }
}

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
  // När jag filtrerar liquor, töms fältet från garnitures sista sökning.
  document.getElementById('filter-garniture').value = ''
  renderCoctails(coctails)
}
//--------------------------------filter by garniture------------------------//

function filterByGarniture (event) {
  event.preventDefault()
  let garniture = document.getElementById('filter-garniture').value
  let coctails = getCoctailsByGarniture(database, garniture)
  // När jag filtrerar liquor, töms fältet från garnitures sista sökning.
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
