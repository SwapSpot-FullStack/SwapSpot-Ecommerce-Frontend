# SwapSpot – Front-End Web Application

SwapSpot is a modern, responsive item-swapping web application. This front-end project was built to integrate with a fully functional backend (Node.js + Express + MongoDB) and demonstrates professional-level skills in frontend development, including responsive design, API integration, error handling, code testing, and accessibility practices.

## Live Demo

Coming soon...

---

## Technologies Used

| Technology      | Purpose                      | Reason Chosen / Comparison                     | License |
| --------------- | ---------------------------- | ---------------------------------------------- | ------- |
| React (Vite)    | SPA Framework / UI Rendering | Lightweight, fast dev server, modular build    | MIT     |
| React Router    | Page Navigation              | Seamless client-side routing                   | MIT     |
| Axios           | HTTP requests to backend API | Simpler and cleaner than Fetch                 | MIT     |
| React Hot Toast | Notifications                | Better UX for form and error feedback          | MIT     |
| React Icons     | Icons (FontAwesome-based)    | Easy integration and accessibility             | MIT     |
| Vanilla CSS     | Styling                      | Tailwind removed for full control + simplicity | N/A     |

### Hardware Requirements

- Any modern computer or laptop (Windows, macOS, Linux)
- Node.js 18.x or above
- Browser (Chrome, Firefox, Safari)

---

## Style Guide

SwapSpot follows a **custom semantic style guide** using vanilla CSS:

- Class names use semantic naming (`.pill-label`, `.category-button`, `.featured-card`, etc.)
- Responsive design is handled via custom media queries.
- Spacing and layout mimic the Figma wireframe (desktop-first with mobile breakpoints).
- Accessibility: Uses semantic HTML elements (`<header>`, `<main>`, `<section>`, etc.) and alt attributes/icons with `aria-labels`.

---

## Features

- Responsive homepage layout with categories and featured listings
- Semantic HTML structure for better accessibility
- Custom buttons, labels, and layouts using pill-shaped and grid-based design
- Integration-ready with secure backend endpoints (login, register, listings, chat)
- User-friendly toast notifications for actions and errors
- Reusable React components with clean JSX and CSS
- Peer-reviewed and team-collaborated codebase

---

## Error Handling

- Axios requests wrapped in `try/catch` blocks
- Errors are shown using `react-hot-toast` for clear UI feedback
- Fallback handling for network and form validation issues

---

## Testing

The project will include **unit/component tests** (using Vitest or Jest) for:

- Rendering components (e.g. `Home`, `Navbar`)
- Form input validation
- Button interactions
- API call mocking

---

## Licensing

All libraries used are MIT licensed and free to use for educational purposes.

---

## Author

[Declan Whitty](https://github.com/declan-whitty)
