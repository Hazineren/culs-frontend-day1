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
