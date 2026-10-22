# The Little Herb Garden

A small website for day 1 of **Frontend Development**.

It is broken. Your job is to find out why, and to repair it.

## What you need

- a GitHub account
- Git
- an editor
- a browser (Firefox recommended)
- [Node.js](https://nodejs.org/) (the LTS version), which brings `npx`

## Get your copy

1. **Fork** this repository to your GitHub account.
2. **Clone your fork**, not this repository:

   ```sh
   git clone https://github.com/<your-name>/culs-frontend-day1.git
   cd culs-frontend-day1
   ```

## Run it

Start a small web server in the project folder:

```sh
npx serve
```

The first time, `npx` asks whether to install `serve`. Answer `y`.

Then open the address it prints, usually <http://localhost:3000>.
Stop the server with `Ctrl+C`.

Do not open `index.html` by double-clicking it. A `file://` page is not the Web.

## Your mission

Something is wrong. Several things, in fact.

1. Inspect before you change anything: the page, the Console, the Network panel, the Inspector.
2. Pick one problem and find out why it happens.
3. Fix it, reload, verify.
4. Commit that one fix, with a message that says what you fixed.
5. Repeat.

You are done when:

- the Console shows no unexplained errors
- the Network panel shows no missing files
- every link on the page goes where it says
- `git status` is clean, and `git push` has sent your commits to GitHub

## The project

```text
index.html    the page
style.css     how it looks
app.js        what it does
data/         the herbs, as JSON: index.json and one <herb>.json per herb
images/       the logo and a picture
```

## The herb data

Every herb lives in its own file, `data/<id>.json`.
`index.html#<id>` shows that herb, and the garden page shows them all.

### `data/index.json`

A list of herb ids, in the order the herbs appear on the garden page:

```json
["basil", "spearmint", "rosemary"]
```

An id is the herb's file name without `.json`.
Use lowercase letters, and a hyphen between words (`lemon-balm`).
Do not use an id that a part of the page already has: `main`, `home`, `herbs`, `herb-search`, `herbs-list`, `visit`, `about` or `herb-detail`.

### `data/<id>.json`

One object with four fields, all of them text:

| Field   | What it holds                        | Example                                 |
|---------|--------------------------------------|-----------------------------------------|
| `name`  | The herb's everyday English name     | `"Basil"`                               |
| `latin` | Its botanical (Latin) name           | `"Ocimum basilicum"`                    |
| `use`   | One short sentence on what it is for | `"Tomatoes, pesto and anything summery."` |
| `life`  | `"annual"` or `"perennial"`          | `"annual"`                              |

`data/basil.json` in full:

```json
{
  "name": "Basil",
  "latin": "Ocimum basilicum",
  "use": "Tomatoes, pesto and anything summery.",
  "life": "annual"
}
```

### Add a herb

1. Create `data/<id>.json` with the four fields above.
2. Add the id to `data/index.json`.
3. Open `index.html#<id>` to check it.

If a herb is in `index.json` but its file is missing, the page still shows
the other herbs and names the missing file.

## Team

Live site: <https://hazineren.github.io/culs-frontend-day1/>

| | GitHub | Course |
|---|---|---|
| Eren Hazine | [@Hazineren](https://github.com/Hazineren) | Study Block, CZU Prague |
| Uğur Tankut | [@ugurtankut](https://github.com/ugurtankut) | Study Block, CZU Prague |

We worked in pair programming on Saturday 17 Oct 2026.

### Eren Hazine

Day 1 – debugging the broken site:

- [`6dab983`](https://github.com/Hazineren/culs-frontend-day1/commit/6dab983) Fix stylesheet path so the page loads style.css instead of a missing css/style.css.
- [`692605e`](https://github.com/Hazineren/culs-frontend-day1/commit/692605e) Close the intro herb link so it no longer wraps the rest of the page.
- [`089ca5f`](https://github.com/Hazineren/culs-frontend-day1/commit/089ca5f) Point the hero image at garden.svg, the file that actually exists.
- [`1a6f37b`](https://github.com/Hazineren/culs-frontend-day1/commit/1a6f37b) Fetch data/herbs.json, the herb data file that exists in the project.
- [`5a55207`](https://github.com/Hazineren/culs-frontend-day1/commit/5a55207) Select #herbs-list so loaded herb cards are inserted into the page.
- [`9d9d777`](https://github.com/Hazineren/culs-frontend-day1/commit/9d9d777) Point the Visit nav link at #visit so it reaches the Visit section.
- [`d85c604`](https://github.com/Hazineren/culs-frontend-day1/commit/d85c604) Correct the cards display property so the herb list lays out as a grid.
- [`f83e9f1`](https://github.com/Hazineren/culs-frontend-day1/commit/f83e9f1) Rename images/Logo.svg to logo.svg so the logo and favicon load on case-sensitive servers.

Day 3 – one page for every herb:

- [`5e1e416`](https://github.com/Hazineren/culs-frontend-day1/commit/5e1e416) Show one herb at index.html#&lt;herb&gt;, built by JavaScript from data/&lt;herb&gt;.json.
- [`031f573`](https://github.com/Hazineren/culs-frontend-day1/commit/031f573) Link each herb card to its page, and add an All herbs link back to the list.
- [`e9b39b3`](https://github.com/Hazineren/culs-frontend-day1/commit/e9b39b3) Show a clear message when a herb is unknown, a data file is missing, or there is no server.
- [`5e28ee8`](https://github.com/Hazineren/culs-frontend-day1/commit/5e28ee8) Document the herb data format in the README.

Publishing: put the site on GitHub Pages.

### Uğur Tankut

- [`7f54af8`](https://github.com/Hazineren/culs-frontend-day1/commit/7f54af8) Split herbs.json into one data/&lt;herb&gt;.json per herb, listed in data/index.json.
- [`36eae92`](https://github.com/Hazineren/culs-frontend-day1/commit/36eae92) Make the site work with the keyboard alone.
- [`3924220`](https://github.com/Hazineren/culs-frontend-day1/commit/3924220) Add a search box that filters the herb cards as you type.
