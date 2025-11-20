# 🎬 What to Watch — Online Cinema built with Next.js

**What to Watch** is a modern web application simulating an online cinema platform. The project demonstrates scalable frontend development using **Next.js 15 (App Router)**, strict **TypeScript** typing, and global state management via **Redux Toolkit**.

The main architectural feature is **hybrid rendering (SSR + CSR)**. Data for movie pages is fetched on the server, forming the initial Redux state, which is then passed to the client (Hydration), ensuring excellent SEO optimization and fast First Contentful Paint.

## ✨ Key Features

### 🚀 Hybrid Architecture (SSR + Client Components)
* Built with **Next.js App Router**.
* Movie pages (`/films/[id]`) are rendered on the server.
* Implements the **Redux Store Injection** pattern: creating a unique store instance for each server request and passing `preloadedState` to the client via a custom `StoreProvider`.

### 🔐 Authorization & Route Protection
* Full Login and Logout system.
* Token storage and session restoration upon page reload.
* `ProtectedRoute` component for securing private pages ("My List", "Add Review").
* Handling of **Race Conditions** during authorization checks.

### 🎥 Custom Video Player
* Custom `useVideoPlayer` hook for managing the HTML5 Video API.
* Features: Play/Pause, Fullscreen mode, custom progress bar (Timeline) with seeking capability (drag & drop), time remaining display.
* Video previews on hover over movie cards in the catalog.

### 📂 Dynamic Catalog & Filtering
* Movie filtering by genre via Redux.
* Pagination using a "Show more" button (loads 8 cards at a time).
* Movie page organized with Tabs: *Overview*, *Details*, *Reviews*.

### ⭐ Favorites & Reviews
* Add/Remove movies to the "My List" (Watchlist).
* Review submission form with validation (rating + text length) and star rating visualization.

## 🛠 Tech Stack

### Core
| Technology | Purpose |
|------------|---------|
| **Next.js 15** | Framework (App Router, Server Components). |
| **React 19** | UI Library. |
| **TypeScript** | Static typing. |
| **Redux Toolkit** | Global state management (Slices, Thunks). |
| **Axios** | HTTP client for API requests (with token interceptors). |

### Tools & Code Quality
| Tool | Purpose |
|------|---------|
| **ESLint** | Code linting (Airbnb/Next configuration). |
| **Prettier** | Code formatting. |
| **Husky** | Git hooks (pre-commit). |
| **Lint-staged** | Running linters on changed files only. |
| **Commitlint** | Commit message validation (Conventional Commits). |

## 📦 Getting Started

```bash
# Clone the repository
git clone https://github.com/Mirror45/what-to-watch.git

# Navigate to the project directory
cd what-to-watch

# Install dependencies
npm install

# Start the development server
npm run dev 
```

> *The project uses the API at `http://localhost:3000/`.

---

### 🔮 Roadmap

In upcoming updates, we plan to introduce tools to improve reliability and automate processes:

- ✅ **Unit Testing (Jest + React Testing Library)**: Test coverage for reducers, utilities, and key UI components.

- ✅ **CI/CD (GitHub Actions)**: Setting up a pipeline to automatically run linters, tests, and build the project on every push to the repository.

