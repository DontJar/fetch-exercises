document.addEventListener('DOMContentLoaded',function(){
  console.log ('We have ignotion 🚀')
  openingCrawl()
  droidGetter()
  planetGetter()
})

const starStuff = document.getElementById('starStuff')
const starInputs = document.getElementById('starInputs')

function openingCrawl(){
  let openBtn = document.createElement('button')

  openBtn.addEventListener('click', fetchCrawl)
  openBtn.innerText = "click here 4 ✨🔫"

  starInputs.appendChild(openBtn)
}

function fetchCrawl(){
  fetch('https://swapi.co/api/films/1/')
  .then(res => res.json())
  .then(data => showCrawl(data))
}

function showCrawl(oneMovie){
  starStuff.innerHTML = ""
  let openingCrawl = document.createElement('p')
  openingCrawl.innerText = oneMovie.opening_crawl
  starStuff.appendChild(openingCrawl)
}

function planetGetter(){
  let planetFrm = document.createElement('form')
  let planetBtn = document.createElement('input')
  let submitBtn = document.createElement('input')

  planetBtn.type = "number"
  planetBtn.min = 1
  planetBtn.max = 60
  submitBtn.type = "submit"
  submitBtn.innerText = "Select a planet from 1 to 60"

  planetFrm.appendChild(planetBtn)
  planetFrm.appendChild(submitBtn)
  planetFrm.addEventListener('submit', planetFetch)

  starInputs.appendChild(planetFrm)
}

function planetFetch(e){
  e.preventDefault()
  let planetNum
    if (parseInt(e.target.id.split("_")[1])) {
      planetNum = parseInt(e.target.id.split("_")[1])
    } else{
      planetNum = e.target[0].value
    }
  fetch(`https://swapi.co/api/planets/${planetNum}/`)
  .then(res => res.json())
  .then(data => showPlanet(data))
}

function showPlanet(onePlanet){
  starStuff.innerHTML = ""
  let planetName = document.createElement('h2')
  let planetClim = document.createElement('p')
  let planetDetails = document.createElement('div')

  planetName.innerText = `Planet ${onePlanet.name}`
  planetClim.innerText = `Climate: ${onePlanet.climate}`

  starStuff.appendChild(planetName)
  starStuff.appendChild(planetClim)
}

function droidGetter(){
  let i;
     for (i=2; i <= 3; i++) {
       droidFetcher(i)
    }
}

function droidFetcher(droidId){
  fetch(`https://swapi.co/api/people/${droidId}/`)
  .then(res => res.json())
  .then(data => renderDroid(data))
}

function renderDroid(oneDroid){
  let droidCard = document.createElement('card')
  let name = document.createElement(`h2`)
  let height = document.createElement(`p`)
  let mass = document.createElement(`p`)
  let showBtn = document.createElement('button')

  name.innerText = oneDroid.name
  height.innerText = `Height: ${oneDroid.height}`
  mass.innerText = `Mass: ${oneDroid.mass}`
  showBtn.innerText = `Show Homeworld Details`
  showBtn.id = `droidPlanetId_${oneDroid.homeworld.split("/")[5]}`
  showBtn.addEventListener('click', planetFetch)
  droidCard.appendChild(name)
  droidCard.appendChild(height)
  droidCard.appendChild(mass)
  droidCard.appendChild(showBtn)
  starInputs.appendChild(droidCard)
}
