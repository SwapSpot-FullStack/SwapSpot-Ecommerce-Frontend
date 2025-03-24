# SwapSpot – Front-End Web Application

Welcome to the frontend setup for SwapSpot. SwapSpot is intended to be a full-stack, ecommerce marketplace platform. With features like secure transactions between users, offering features such as responsive design, API integration, error handling, code testing, and accessibility practices.

---

## Technologies Used

| Technology      | Purpose                      | Reason Chosen / Comparison                     | License    |
| --------------- | ---------------------------- | ---------------------------------------------- | ---------- |
| React (Vite)    | SPA Framework / UI Rendering | Lightweight, fast dev server, modular build    | MIT        |
| React Router    | Page Navigation              | Seamless client-side routing                   | MIT        |
| Axios           | HTTP requests to backend API | Simpler and cleaner than Fetch                 | MIT        |
| React Hot Toast | Notifications                | Better UX for form and error feedback          | MIT        |
| React Icons     | Icons (FontAwesome-based)    | Easy integration and accessibility             | MIT        |
| Vanilla CSS     | Styling                      | Tailwind removed for full control + simplicity | N/A        |
| Playwright      | E2E Testing                  | Modern, fast, includes browser drivers.        | Apache 2.0 |

---

### Hardware Requirements

- Any modern computer or laptop (Windows, macOS, Linux)
- Node.js 18.x or above
- Browser (Chrome, Firefox, Safari)

---

## Industry Relevance

All technologies chosen for this project are widely used in modern web development:

- **React** is used by companies like Meta, Netflix, and Airbnb
- **Axios** and **React Router** are common in professional React projects
- **Playwright** is a top-tier testing tool used in production environments

---

## Style Guide

SwapSpot follows a **custom semantic style guide** using vanilla CSS:

- Class names use semantic naming (`.pill-label`, `.category-button`, `.featured-card`, etc.)
- Responsive design is handled via custom media queries.
- Spacing and layout mimic the Figma wireframe (desktop-first with mobile breakpoints).
- Accessibility: Uses semantic HTML elements (`<header>`, `<main>`, `<section>`, etc.) and alt attributes/icons with `aria-labels`.

---

## Testing

This project uses **Playwright** for end-to-end testing.

We have included at least 5 working Playwright tests that cover the following:

- Component rendering (e.g. `Home`, `Navbar`)
- Login flow and validation
- Listing detail view functionality
- Navigation visibility based on authentication
- Display of featured listings on the homepage

Tests are written in TypeScript and located in the `/tests/` directory.
Run with:

```bash
npx playwright test
```

Playwright was chosen for its modern API, built-in browser automation, and fast parallel test execution compared to older tools like Selenium.

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

## DRY Principles

The app follows **Don’t Repeat Yourself** principles by using reusable components and shared logic:

- `ListingForms.jsx` handles both **create** and **edit** listing logic
- `PrivateRoute.jsx` is used for all protected routes
- `Navbar.jsx` and `Footer.jsx` are shared across all pages
- Axios setup is centralized in `/api/axios.js`

---

## Licensing

All libraries used are MIT licensed and free to use for educational purposes.

---

## Author

[Declan Whitty](https://github.com/declan-whitty)
