// The Little Herb Garden runs on one page.
// index.html shows the garden and every herb as a card.
// index.html#basil shows one herb, built from data/basil.json.
// Other hashes (#herbs, #visit, #about) are sections of the garden page.

const main = document.querySelector("#main")
const home = document.querySelector("#home")
const detail = document.querySelector("#herb-detail")
const list = document.querySelector("#herbs-list")
const count = document.querySelector(".count")
const search = document.querySelector("#herb-search")
const siteTitle = document.title

// The herb ids from data/index.json, e.g. "basil".
let herbIds = []
// Why data/index.json could not be loaded, if it could not.
let indexProblem = null
// The herbs that loaded, as { id, herb }, how many did not, and why.
let loaded = []
let missing = 0
let loadProblems = ""
// The herb shown last, so going back to the list can return focus to its card.
let lastHerb = null

// A file that could not be loaded. Its message is written for the visitor.
class LoadError extends Error {}

async function loadJSON(path) {
  let response
  try {
    response = await fetch(path)
  } catch {
    // fetch() itself fails when there is no server to ask.
    if (location.protocol === "file:") {
      throw new LoadError("This page needs a web server. Run npx serve in the project folder and open the address it prints.")
    }
    throw new LoadError("The server did not answer. Check that it is still running, then reload the page.")
  }
  if (response.status === 404) {
    throw new LoadError(`${path} is missing.`)
  }
  if (!response.ok) {
    throw new LoadError(`${path} could not be loaded: ${response.status} ${response.statusText}.`)
  }
  try {
    return await response.json()
  } catch {
    throw new LoadError(`${path} is not valid JSON.`)
  }
}

// Let real bugs reach the Console; only expected load problems are shown on the page.
function expectLoadError(error) {
  if (!(error instanceof LoadError)) {
    throw error
  }
}

function element(tag, className, text) {
  const node = document.createElement(tag)
  node.className = className
  node.textContent = text
  return node
}

function link(href, className, text) {
  const node = element("a", className, text)
  node.href = href
  return node
}

function card(herb, id) {
  const item = element("li", "card", "")
  const name = element("h3", "name", "")
  name.append(link(`#${id}`, "card-link", herb.name))
  item.append(
    name,
    element("p", "latin", herb.latin),
    element("p", "use", herb.use),
    element("p", "life", herb.life))
  return item
}

function showCount(text, isProblem) {
  count.textContent = text
  count.classList.toggle("problem", isProblem)
}

async function showList() {
  const results = await Promise.allSettled(herbIds.map(id => loadJSON(`data/${id}.json`)))
  const problems = new Set()
  results.forEach((result, i) => {
    if (result.status === "fulfilled") {
      loaded.push({ id: herbIds[i], herb: result.value })
    } else {
      expectLoadError(result.reason)
      problems.add(result.reason.message)
    }
  })
  missing = herbIds.length - loaded.length
  loadProblems = [...problems].join(" ")

  if (loaded.length === 0) {
    showCount(`The herbs could not be loaded. ${loadProblems}`, true)
    return
  }
  search.disabled = false
  search.addEventListener("input", showCards)
  showCards()
}

function matches(herb, query) {
  return [herb.name, herb.latin, herb.use, herb.life]
    .some(text => (text ?? "").toLowerCase().includes(query))
}

// Show the cards of the herbs that match what is typed in the search box.
function showCards() {
  const typed = search.value.trim()
  const query = typed.toLowerCase()
  const shown = loaded.filter(({ herb }) => matches(herb, query))
  list.replaceChildren(...shown.map(({ id, herb }) => card(herb, id)))

  if (query && shown.length === 0) {
    showCount(`No herb matches “${typed}”.`, false)
  } else if (query) {
    const verb = shown.length === 1 ? "matches" : "match"
    showCount(`${shown.length} of ${loaded.length} herbs ${verb} “${typed}”.`, false)
  } else if (missing > 0) {
    showCount(`${loaded.length} herbs grow here, but ${missing} could not be loaded. ${loadProblems}`, true)
  } else {
    showCount(`${loaded.length} herbs grow here.`, false)
  }
}

// Move keyboard focus to a place that is not focusable by itself, like a heading.
function moveFocus(target) {
  if (!target.hasAttribute("tabindex")) {
    target.tabIndex = -1
  }
  target.focus()
}

// Show a page of its own in place of the garden: a herb, or a problem.
function showPage(title, ...content) {
  const heading = element("h1", "name", title)
  detail.replaceChildren(
    link("#herbs", "back", "← All herbs"),
    heading,
    ...content)
  home.hidden = true
  detail.hidden = false
  document.title = `${title} · ${siteTitle}`
  window.scrollTo(0, 0)
  // Start keyboard and screen reader users at the new page's heading.
  moveFocus(heading)
}

function showProblem(title, text) {
  showPage(title, element("p", "problem", text))
}

async function showHerb(id) {
  const hash = location.hash
  try {
    const herb = await loadJSON(`data/${id}.json`)
    // The visitor may have moved on while the file was loading.
    if (location.hash !== hash) return
    lastHerb = id
    showPage(herb.name,
      element("p", "latin", herb.latin),
      element("p", "use", herb.use),
      element("p", "life", herb.life))
  } catch (error) {
    expectLoadError(error)
    if (location.hash !== hash) return
    showProblem("This herb could not be loaded", error.message)
  }
}

function showHome(section) {
  detail.hidden = true
  home.hidden = false
  document.title = siteTitle
  // The browser could not scroll to a section while it was hidden, so do it now,
  // and move focus there so Tab carries on from that section.
  const target = section && document.getElementById(section)
  const lastCard = section === "herbs" && lastHerb && list.querySelector(`a[href="#${CSS.escape(lastHerb)}"]`)
  if (lastCard) {
    target.scrollIntoView()
    lastCard.focus({ preventScroll: true })
  } else if (target) {
    target.scrollIntoView()
    moveFocus(target)
  } else {
    window.scrollTo(0, 0)
  }
}

function isSection(id) {
  const target = document.getElementById(id)
  return target !== null && !detail.contains(target)
}

// The part of the address after #, e.g. "basil".
function currentHash() {
  const hash = location.hash.slice(1)
  try {
    return decodeURIComponent(hash)
  } catch {
    return hash
  }
}

// Decide what to show from the part of the address after #.
function route() {
  const id = currentHash()
  if (id === "" || isSection(id)) {
    showHome(id)
  } else if (indexProblem) {
    showProblem("The herbs could not be loaded", indexProblem)
  } else if (herbIds.includes(id)) {
    showHerb(id)
  } else {
    showProblem("Unknown herb", `No herb called “${id}” grows here. Pick one from the list.`)
  }
}

// "Skip to content" jumps to the main content without changing the address,
// so it also works on a herb's page.
document.querySelector(".skip-link").addEventListener("click", event => {
  event.preventDefault()
  moveFocus(main)
})

async function start() {
  try {
    const ids = await loadJSON("data/index.json")
    if (!Array.isArray(ids)) {
      throw new LoadError("data/index.json should be a list of herb ids.")
    }
    herbIds = ids
  } catch (error) {
    expectLoadError(error)
    indexProblem = error.message
    showCount(`The herbs could not be loaded. ${error.message}`, true)
  }
  window.addEventListener("hashchange", route)
  route()
  if (!indexProblem) {
    showList()
  }
}

start()
