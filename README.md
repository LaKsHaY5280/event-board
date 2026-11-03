# Campus Event Board — CS445 Lab Assignment 6

An accessible, responsive campus event board for IIIT Vadodara. This version adds JavaScript fundamentals, DOM rendering, event handling, JSON fetching, search and client-side form validation to the Lab 5 project.

## Features
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
- `script.js` — A/B assignment JavaScript
- `events.json` — single source of truth for event records
- `base.css`, `style.css` — styles
- `theme-dark.css` — optional dark theme
- `NOTES.pdf` — Lab 5 notes followed by Lab 6 answers and the JavaScript appendix

## Run locally
Because the page uses `fetch()` to load JSON, open it through a local web server (not by double-clicking the HTML file).

```bash
python -m http.server 8000
```
Then open `http://localhost:8000` in your browser.

## Testing in DevTools
Open the browser Console to see the event data and formatted event strings. To test the fetch error state, temporarily rename `events.json` or change its fetch path, reload, then restore it. Test search with a partial title or venue, press Escape, click RSVP, and submit the form with invalid and valid values.

## GitHub
Existing repository: https://github.com/LaKsHaY5280/event-board

Push all files in this folder to the repository. A GitHub Pages deployment can be enabled from the repository's Pages settings. The live link and commit history must be confirmed in GitHub; they cannot be verified from these local files.

## Important limitation
The form validates in the browser only. It does not save submissions to a database or send them to an administrator. A production server must validate all submitted data again.
