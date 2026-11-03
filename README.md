# Campus Event Board — CS445 Lab Assignment 7

An accessible, responsive campus event board for IIIT Vadodara. This version adds JSON and XML to the Lab 6 project: the same events are stored in `events.json` and `events.xml`, and the page loads, reads, round-trips and compares both.

## Features (Lab 7 additions first)
- `events.json` and `events.xml` hold the same 4 events (id, title, date, seats, free, plus location, online, dateLabel and description).
- Dates are ISO-8601 strings (`2026-11-12`). In the XML, `id` is an attribute and every other field is an element.
- **B1** cards render from `fetch('events.json')`; **B2** logs `events[0].title` and the last event's seats; **B3** `JSON.stringify` round-trip check; **B4** `DOMParser` + `getElementsByTagName('title')` shows the XML title on the page; **B5** byte sizes of both files are reported (JSON 1168 bytes, XML 1555 bytes).
- `c1-demo/` holds the deliberately broken JSON (trailing comma) and a small checker page that shows the exact validator error.
- Events are stored in `events.json` and rendered dynamically from data.
- Availability labels: **Full** (0 seats), **Few left** (1–4 seats), and **Open** (5+ seats).
- Search filters events while typing; press **Escape** to clear.
- Mobile hamburger navigation uses `classList.toggle`.
- RSVP buttons use event delegation and `event.target`.
- Async `fetch` handles Loading, success and error states.
- Form validation uses required fields, email type/pattern and a custom event-name rule.
- Responsive layout, accessible labels/status messages, and optional dark theme.

## Files
- `index.html` — page structure and form
- `script.js` — JavaScript (Lab 6 plus the Lab 7 B1–B5 code)
- `events.json` — single source of truth for event records (JSON)
- `events.xml` — the same data as XML
- `c1-demo/events-broken.json`, `c1-demo/json-check.html` — C1 validator demo (not used by the main page)
- `banner-bg.jpg` — banner background image
- `Screenshots.pdf` — labelled Lab 7 screenshots
- `base.css`, `style.css` — styles
- `theme-dark.css` — optional dark theme
- `NOTES.pdf` / `NOTES.docx` — Lab 7 answers (event table, JSON/XML side by side, answers 1–10)

## Run locally
Because the page uses `fetch()` to load JSON and XML, open it through a local web server (not by double-clicking the HTML file).

```bash
python -m http.server 8000
```
Then open `http://localhost:8000` in your browser.

## Testing in DevTools
Open the browser Console to see the event data and formatted event strings. For C1, open `http://localhost:8000/c1-demo/json-check.html?file=events-broken.json` (error) and `?file=../events.json` (valid). To test the fetch error state, temporarily rename `events.json` or change its fetch path, reload, then restore it. Test search with a partial title or venue, press Escape, click RSVP, and submit the form with invalid and valid values.

## GitHub
Existing repository: https://github.com/LaKsHaY5280/event-board

Push all files in this folder to the repository. A GitHub Pages deployment can be enabled from the repository's Pages settings. The live link and commit history must be confirmed in GitHub; they cannot be verified from these local files.

## Important limitation
The form validates in the browser only. It does not save submissions to a database or send them to an administrator. A production server must validate all submitted data again.
