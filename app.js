// Loads the herb list from data/index.json, then each herb from data/<id>.json,
// and shows each one as a card.

const list = document.querySelector("#herbs-list")
const count = document.querySelector(".count")

async function loadJSON(path) {
  const response = await fetch(path)
  if (!response.ok) {
    throw new Error(`Could not load ${response.url}: ${response.status} ${response.statusText}`)
  }
  return response.json()
}

async function loadHerbs() {
  const ids = await loadJSON("data/index.json")
  return Promise.all(ids.map(id => loadJSON(`data/${id}.json`)))
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

async function show() {
  const herbs = await loadHerbs()
  list.replaceChildren(...herbs.map(card))
  count.textContent = `${herbs.length} herbs grow here.`
}

show()
