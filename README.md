# Campus Event Board 🎓

A static website for discovering and submitting campus events at **IIIT Vadodara**. It lists upcoming events, lets anyone submit a new event through a form, and provides event category info, FAQs, and contact details.

## Features

- **Upcoming Events** — a list of campus events with dates, times, and venues
- **Event Submission Form** — submit an event with name, date, location, email, description, event type, and target audience (with client-side validation and a success message)
- **Event Categories** — a table showing which day each category meets
- **FAQ** — expandable answers using native `<details>`/`<summary>`
- **Navigation** — primary nav with mobile hamburger toggle, footer nav, and skip-to-content link
- **Accessibility** — semantic HTML5 landmarks, labelled form controls, alt text, and visible focus outlines
- **Theming** — CSS custom properties for easy theming, with an optional dark theme stylesheet

## Tech Stack

- **HTML5** — semantic markup, no frameworks
- **CSS3** — custom properties, flexbox, responsive design
- **Vanilla JavaScript** — minimal inline script for the form submission feedback

## Project Structure

```
.
├── index.html        # Main (and only) page
├── base.css          # Reset, variables, and base typography
├── style.css         # Layout, components, and responsive styles
├── theme-dark.css    # Optional dark theme overrides
├── logo.png          # Site logo
├── images/           # Image assets
└── Members.txt       # Team member list
```

## Getting Started

No build step or dependencies required.

### Run locally

Option 1 — simply open the file:

```bash
# Double-click index.html, or:
start index.html      # Windows
open index.html       # macOS
xdg-open index.html   # Linux
```

Option 2 — serve it with any static server:

```bash
# Python
python -m http.server 8000

# Node
npx serve .
```

Then visit <http://localhost:8000>.

### Enabling the dark theme

The dark theme is not linked by default. To use it, add this line **after** the existing stylesheets in `index.html`:

```html
<link rel="stylesheet" href="theme-dark.css">
```

## Pages & Sections

| Section | Description |
|---|---|
| Upcoming Events | Event listing with dates and venues |
| Submit an Event | Form for adding new events |
| Event Categories | Category ↔ meeting day table |
| FAQ | Common questions about submissions |
| Contact | Address, phone, email, and website |

## Team Members

| Roll No. | Name |
|---|---|
| 20261651073 | Rhitvik Jhalani (Team Leader) |
| 20261651051 | Lakshay Goyal |
| 20261651054 | Mohar Tewari |
| 20261651028 | Ayushi Kumari |
| 20261651094 | Umra Niyaz |

## Notes

- Event data is hard-coded in `index.html`; submissions are not persisted (no backend).
- Form submission is simulated client-side — the success message shows and the form resets.
