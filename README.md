# 🎬 What to Watch – Movie Catalog built with Next.js

🚀 **Live Demo**: [what-to-watch-iota-ivory.vercel.app](https://what-to-watch-iota-ivory.vercel.app)

A multifunctional SPA application for browsing a movie catalog, built with Next.js.
The project features server-side rendering (SSR), a full authentication system with protected routes, dynamic content filtering, and personal movie lists.

# 📖 Project Overview
**What to Watch** is a comprehensive application simulating an online cinema platform. The project was developed to showcase the ability to build fast, modern, and scalable web applications using the Next.js framework.

The main focus is on hybrid rendering (SSR + CSR) to achieve high performance and improved SEO. Complex state management, including user data, filters, and movie lists, is implemented using **Redux Toolkit**.

---

## ✨ Key Features

### 🚀 Server-Side Rendering (SSR) with Next.js
The application leverages SSR to enable fast initial page loads, significantly improving both user experience and SEO.

### 🔐 Full Authentication and Protected Routes
A complete authentication flow is implemented (login/logout).  
Private pages like “My List” and “Add Review” are accessible only to authenticated users. Unauthorized access attempts are automatically redirected to the login page.

### ⭐ "My List" (Favorites) System
Authenticated users can add movies to their personal “watchlist”.  
The "+ My List / ✓ In List" button state and the counter in the header update instantly via Redux.

### 🔍 Dynamic Filtering and Pagination
Browse the movie catalog by genre. The genre list is generated dynamically based on the fetched data.  
Content loads in chunks of 8 movies using the “Show more” button, providing smooth navigation without full page reloads.

### 📝 Review System with Validation
Users can submit reviews with a rating (from 1 to 10 stars).  
The form includes built-in validation: the "Post" button remains disabled until a rating is selected and the comment length is between 50 and 400 characters.

### 📄 Detailed Movie Page with Tabs
Each movie has a dedicated page with detailed information organized into tabs: **Overview**, **Details**, and **Reviews**, allowing for a clean and structured presentation of content.

### ▶️ Custom Video Player and Previews
A custom video player is used for watching films, with basic playback controls.  
Movie cards in the catalog feature video previews that autoplay on hover, creating a more dynamic and interactive UI.


## 🛠 Tech Stack

### 🚀 Core Stack

| Technology    | Purpose                                                                                     |
|---------------|---------------------------------------------------------------------------------------------|
| Next.js       | A React framework for production. Provides SSR, file-based routing, and other optimizations. |
| React         | Building declarative, component-based, and interactive user interfaces.                     |
| TypeScript    | Adds static typing to improve code reliability and developer experience.                    |
| Redux Toolkit | Centralized and predictable management of complex global application state.                 |
| Axios         | Promise-based HTTP client for reliable backend API communication.                           |

### 🧪 Quality Control Tools

| Tool                              | Purpose                                          |
|----------------------------------|-------------------------------------------------|
| ESLint                           | Static code analysis to prevent errors and bad practices |
| Prettier                        | Automatic code formatting                        |
| Commitlint + Husky + Lint-Staged | Commit message checking, running linters/formatters before commit |
| EditorConfig                    | Unifying basic editing rules (indentation, line breaks, etc.) |

### 🔐 Husky

Used to run Git hooks. The project has a pre-commit hook that:

- Runs `eslint --fix` and `prettier --write` only on changed files.
- Ensures badly formatted code does not get committed to the repository.

### 🧼 Commitlint

Checks commit messages for compliance with the Conventional Commits standard (e.g., `feat:`, `fix:`, `refactor:`).

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

## 🧠 Challenges & Future Improvements

### ✅ Overcome Challenges

- 🧩 **Hybrid rendering management**  
  Properly structuring the code to work in both server (SSR) and client (interactivity) environments required deep understanding of Next.js lifecycle and `getServerSideProps`.

- 🔐 **Protected routes architecture**  
  Building a secure system for private pages involved implementing Higher-Order Components (HOC) or custom hooks to check user authorization status and handle redirects.

- 🔄 **State synchronization**  
  Keeping state in sync across different parts of the app (e.g., updating "My List" button and counter in the header in real-time) was achieved via centralized Redux Toolkit store.

---

### 🚧 Possible Improvements

- ⚡ **Switching to Static Site Generation (SSG)**  
  For rarely-changing movie pages, using `getStaticProps` during build time could improve overall performance.

- 👤 **Add user profile page**  
  A dedicated page where users can edit their info and view their review history.

- 🔍 **Full-text catalog search**  
  Implement search by movie title with suggestions and autocomplete.

