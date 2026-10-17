// The Little Herb Garden runs on one page.
// index.html shows the garden and every herb as a card.
// index.html#basil shows one herb, built from data/basil.json.
// Other hashes (#herbs, #visit, #about) are sections of the garden page.

const home = document.querySelector("#home")
const detail = document.querySelector("#herb-detail")
const list = document.querySelector("#herbs-list")
const count = document.querySelector(".count")
const siteTitle = document.title

// The herb ids from data/index.json, e.g. "basil".
let herbIds = []

async function loadJSON(path) {
  const response = await fetch(path)
  if (!response.ok) {
    throw new Error(`Could not load ${response.url}: ${response.status} ${response.statusText}`)
  }
  return response.json()
}

function element(tag, className, text) {
  const node = document.createElement(tag)
  node.className = className
  node.textContent = text
  return node
}

function card(herb) {
  const item = element("li", "card", "")
  item.append(
    element("h3", "name", herb.name),
    element("p", "latin", herb.latin),
    element("p", "use", herb.use),
    element("p", "life", herb.life))
  return item
}

async function showList() {
  const herbs = await Promise.all(herbIds.map(id => loadJSON(`data/${id}.json`)))
  list.replaceChildren(...herbs.map(card))
  count.textContent = `${herbs.length} herbs grow here.`
}

async function showHerb(id) {
  const herb = await loadJSON(`data/${id}.json`)
  detail.replaceChildren(
    element("h1", "name", herb.name),
    element("p", "latin", herb.latin),
    element("p", "use", herb.use),
    element("p", "life", herb.life))
  home.hidden = true
  detail.hidden = false
  document.title = `${herb.name} · ${siteTitle}`
  window.scrollTo(0, 0)
}

function showHome(section) {
  detail.hidden = true
  home.hidden = false
  document.title = siteTitle
  // The browser could not scroll to a section while it was hidden, so do it now.
  const target = section && document.getElementById(section)
  if (target) {
    target.scrollIntoView()
  } else {
    window.scrollTo(0, 0)
  }
}

// Decide what to show from the part of the address after #.
function route() {
  const id = decodeURIComponent(location.hash.slice(1))
  if (herbIds.includes(id)) {
    showHerb(id)
  } else {
    showHome(id)
  }
}

async function start() {
  herbIds = await loadJSON("data/index.json")
  window.addEventListener("hashchange", route)
  route()
  showList()
}

start()
