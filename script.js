// A2: const is used by default; let is used only for values that change.
const eventsContainer = document.querySelector("#eventsContainer"); // B1: querySelector
const eventsStatus = document.querySelector("#eventsStatus");
const searchInput = document.querySelector("#eventSearch");
const navToggle = document.getElementById("navToggle"); // B1: getElementById (kept as an explicit example)
const navLinks = document.querySelector(".nav-links");
const eventForm = document.querySelector("#eventForm");
const formMessage = document.querySelector("#formMessage");
const eventNameInput = document.querySelector("#eventName");
const eventCards = document.querySelectorAll(".events article"); // B1: querySelectorAll

// A2: examples of a string, number and boolean.
const boardTitle = "Campus Event Board";
const defaultSeats = 20;
const boardIsOnline = true;
console.log(boardTitle, defaultSeats, boardIsOnline, eventCards);

// A3: one event object is one record; events.json is the single source of truth.
let events = [];

// A4: control flow labels availability based on the number of seats.
function getAvailability(seats) {
  if (seats === 0) return "Full";
  else if (seats < 5) return "Few left";
  else return "Open";
}

// A6: function with a parameter and return value.
function formatEvent(ev) {
  return `${ev.title} — ${ev.dateLabel} at ${ev.location}`;
}

// B2/B3: create cards from the fetched data; textContent avoids interpreting data as HTML.
function renderEvents(eventList) {
  eventsContainer.textContent = "";
  for (const ev of eventList) { // A5: for...of visits each event once.
    const card = document.createElement("article");
    card.classList.add("event-card");
    const heading = document.createElement("h3");
    heading.textContent = ev.title;
    const details = document.createElement("p");
    details.textContent = `${ev.dateLabel} — ${ev.location}`;
    const description = document.createElement("p");
    description.textContent = ev.description;
    const mode = document.createElement("p");
    mode.textContent = ev.online ? "Online event" : "In-person event";
    const availability = document.createElement("p");
    availability.classList.add("availability");
    const label = getAvailability(ev.seats);
    availability.textContent = `${label} · ${ev.seats} seats left`;
    if (ev.seats === 0) card.classList.add("full"); // B3: classList.add
    availability.classList.toggle("few-left", ev.seats > 0 && ev.seats < 5); // B3: classList.toggle
    availability.setAttribute("data-availability", label); // B3: setAttribute
    availability.style.fontWeight = "600"; // B3: style
    const rsvp = document.createElement("button");
    rsvp.type = "button";
    rsvp.classList.add("rsvp-button");
    rsvp.textContent = ev.seats === 0 ? "Full" : "RSVP";
    rsvp.disabled = ev.seats === 0;
    rsvp.dataset.eventId = String(ev.id);
    card.appendChild(heading);
    card.appendChild(details);
    card.appendChild(description);
    card.appendChild(mode);
    card.appendChild(availability);
    card.appendChild(rsvp);
    eventsContainer.appendChild(card); // B2: appendChild
    console.log(formatEvent(ev)); // A6: call the function and use its result.
  }
}

// A7: arrow function + filter returns only matching events.
function filterEvents() {
  const term = searchInput.value.trim().toLowerCase();
  const matchingEvents = events.filter(ev =>
    `${ev.title} ${ev.location} ${ev.description}`.toLowerCase().includes(term)
  );
  renderEvents(matchingEvents);
  eventsStatus.textContent = matchingEvents.length
    ? `${matchingEvents.length} event(s) found.`
    : "No events match your search.";
}

// B7: fetch has loading, success and error states.
async function loadEvents() {
  eventsStatus.textContent = "Loading…";
  try {
    const response = await fetch("./events.json");
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    events = await response.json();
    renderEvents(events);
    eventsStatus.textContent = `Loaded ${events.length} events successfully.`;
  } catch (error) {
    console.error("Could not load events:", error);
    eventsStatus.textContent = "Sorry, events could not be loaded. Please run this page using a local web server and try again.";
  }
}

// B4: click handler toggles the mobile navigation.
navToggle.addEventListener("click", () => {
  const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
  navToggle.setAttribute("aria-expanded", String(!isExpanded));
  navToggle.setAttribute("aria-label", isExpanded ? "Open navigation" : "Close navigation");
  navLinks.classList.toggle("nav-open");
});

// B5: event delegation; event.target identifies the exact clicked RSVP button.
// Bubbling lets a click on a button travel up to the shared events container.
eventsContainer.addEventListener("click", (event) => {
  if (event.target.matches(".rsvp-button")) {
    const selectedId = Number(event.target.dataset.eventId);
    const selectedEvent = events.find(ev => ev.id === selectedId);
    if (selectedEvent) {
      console.log("RSVP clicked for:", selectedEvent.title);
      event.target.textContent = "Interest noted";
      event.target.disabled = true;
    }
  }
});

// B6: filter as the user types; Escape clears the search.
searchInput.addEventListener("input", filterEvents);
searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    searchInput.value = "";
    filterEvents();
  }
});

// B8: custom validity rule; built-in required, email type and pattern also apply.
eventNameInput.addEventListener("input", () => {
  if (eventNameInput.value.trim().length < 2) {
    eventNameInput.setCustomValidity("Event name must contain at least 2 characters.");
  } else {
    eventNameInput.setCustomValidity("");
  }
});

eventForm.addEventListener("submit", (event) => {
  event.preventDefault(); // B8: stop submission until checkValidity succeeds.
  eventNameInput.setCustomValidity(
    eventNameInput.value.trim().length < 2
      ? "Event name must contain at least 2 characters."
      : ""
  );
  if (!eventForm.checkValidity()) {
    eventForm.reportValidity();
    formMessage.textContent = "Please correct the highlighted fields and try again.";
    formMessage.classList.remove("success");
    return;
  }
  formMessage.textContent = "Event details validated successfully. A server would review and save this submission.";
  formMessage.classList.add("success");
  eventForm.reset();
});

// A8: const variables declared inside a function/block are block-scoped and cannot be accessed outside it.
loadEvents();
