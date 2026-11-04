# Kitabu Bookstore

A full-stack bookstore built for the Mctaba Week 5 project: an Express REST API and a React frontend.
Customers browse and search the catalogue, read book details, browse by author and fill a shopping
cart. Admins log in with a key to add, edit and delete books. Prices are in Kenya shillings (KES).

| Part | Stack | Deploy to |
| ---- | ----- | --------- |
| [`week-5-bookstore-api`](week-5-bookstore-api) | Node 20+, Express 5, CORS | Railway |
| [`week-5-bookstore-frontend`](week-5-bookstore-frontend) | React 19, React Router 7, Vite, Tailwind CSS 4 | Vercel |

## Contents

- [Features](#features)
- [Getting started](#getting-started)
- [Configuration](#configuration)
- [Project structure](#project-structure)
- [Frontend pages](#frontend-pages)
- [API reference](#api-reference)
- [Deployment](#deployment)
- [Notes and limitations](#notes-and-limitations)

## Features

**Customers**
- Browse 26 books across six categories: Fiction, Non-Fiction, Technology, Business, Self-Help, Academic
- Search by title or author, filter by category and stock, sort, and page through results
- Book detail page and an authors list, with every book by each author
- Shopping cart that survives a page refresh (checkout is a demo, no payment is taken)

**Admins**
- Log in with the admin key, then add, edit and delete books from a dashboard
- Every change is validated by the API, with clear error messages shown in the form

**API**
- REST endpoints with search, filtering, sorting and pagination
- Body validation, a custom request logger, central error handling and JSON 404s
- Write routes protected by an `x-admin-key` header, and CORS limited to the frontend's URL

## Getting started

You need [Node.js](https://nodejs.org) 20 or newer. Run the API and the frontend in two terminals:

```bash
# terminal 1 - API on http://localhost:5000
cd week-5-bookstore-api
npm install
npm run dev
```

```bash
# terminal 2 - frontend on http://localhost:5173
cd week-5-bookstore-frontend
npm install
npm run dev
```

Open http://localhost:5173. To manage books, go to http://localhost:5173/admin/login and enter the
admin key **`bookstore-admin`**.

### Scripts

| Folder | Command | What it does |
| ------ | ------- | ------------ |
| API | `npm run dev` | Starts the API and restarts it when a file changes |
| API | `npm start` | Starts the API (used in production) |
| Frontend | `npm run dev` | Starts the Vite dev server |
| Frontend | `npm run build` | Builds the production site into `dist/` |
| Frontend | `npm run preview` | Serves the built `dist/` locally |

## Configuration

Everything has a working default for local development, so no `.env` file is needed to run it.

**API** (environment variables)

| Variable | Default | Purpose |
| -------- | ------- | ------- |
| `PORT` | `5000` | Port the API listens on (Railway sets this) |
| `CLIENT_URL` | `http://localhost:5173` | Frontend URL(s) allowed by CORS, comma-separated |
| `ADMIN_KEY` | `bookstore-admin` | Key required for creating, editing and deleting books |

**Frontend** (copy `.env.example` to `.env`)

| Variable | Default | Purpose |
| -------- | ------- | ------- |
| `VITE_API_URL` | `http://localhost:5000` | URL of the API, with no trailing slash |

Always set your own `ADMIN_KEY` when deploying. The default is public in this README.

## Project structure

```
week-5-bookstore-project/
├── week-5-bookstore-api/
│   ├── server.js                app setup, CORS, middleware, routes, listen
│   ├── routes/
│   │   ├── books.js             CRUD + search, filter, sort, pagination
│   │   ├── categories.js        GET /api/categories
│   │   ├── authors.js           GET /api/authors, /api/authors/:id/books
│   │   └── admin.js             POST /api/admin/verify
│   ├── middleware/
│   │   ├── logger.js            custom request logger
│   │   ├── validate.js          POST/PUT body validation
│   │   ├── requireAdmin.js      x-admin-key check for write routes
│   │   ├── notFound.js          JSON 404 for unknown routes
│   │   └── errorHandler.js      central error handling
│   ├── data/
│   │   ├── books.js             26 seed books
│   │   └── categories.js        the six categories
│   └── utils/helpers.js         HttpError, slugify
└── week-5-bookstore-frontend/
    ├── vercel.json              sends every path to index.html
    ├── .env.example
    └── src/
        ├── App.jsx              page routes
        ├── api.js               every call to the API
        ├── pages/               one file per page (see below)
        ├── components/          Navbar, BookCard, BookForm, CategorySidebar, SearchBar, Pagination...
        ├── context/             CartContext (cart), AdminContext (admin key)
        ├── hooks/useFetch.js    data fetching with loading and error state
        └── utils/format.js      KES prices, dates, slugify
```

## Frontend pages

| Path | Page |
| ---- | ---- |
| `/` | Catalogue: search, category sidebar, sorting, pagination |
| `/books/:id` | Book details, with add to cart |
| `/authors` | All authors and how many books each has |
| `/authors/:id` | Every book by one author |
| `/cart` | Shopping cart and order summary |
| `/admin/login` | Admin login |
| `/admin` | Admin dashboard (login required) |
| `/admin/books/new` | Add a book (login required) |
| `/admin/books/:id/edit` | Edit a book (login required) |

Any other path shows a "page not found" page.

## API reference

Base URL locally: `http://localhost:5000`. `GET /` lists every endpoint.

| Method | Endpoint | Admin | Description |
| ------ | -------- | :---: | ----------- |
| GET | `/api/books` | | List books, with the query options below |
| GET | `/api/books/:id` | | One book |
| POST | `/api/books` | ✓ | Create a book |
| PUT | `/api/books/:id` | ✓ | Update a book (send every field) |
| DELETE | `/api/books/:id` | ✓ | Delete a book |
| GET | `/api/categories` | | Categories with their book counts |
| GET | `/api/authors` | | Authors with their book counts |
| GET | `/api/authors/:id/books` | | Every book by an author (`id` is a slug, e.g. `ngugi-wa-thiongo`) |
| GET | `/api/health` | | Health check |
| POST | `/api/admin/verify` | ✓ | Check that an admin key is correct |

Admin routes need the header `x-admin-key: <ADMIN_KEY>`.

### Query options for `GET /api/books`

| Option | Example | Notes |
| ------ | ------- | ----- |
| `search` | `?search=ngugi` | Title or author, case-insensitive |
| `category` | `?category=self-help` | Category id or name, e.g. `self-help` or `Self-Help` |
| `inStock` | `?inStock=true` | `true` or `false` |
| `sort` | `?sort=price` | `title`, `author`, `price` or `createdAt` |
| `order` | `?order=desc` | `asc` (default) or `desc` |
| `page` | `?page=2` | Default `1` |
| `limit` | `?limit=12` | Default `10`, maximum `50` |

Options can be combined: `/api/books?category=fiction&inStock=true&sort=price&order=desc`.

### Responses

A list:

```json
{
  "data": [ { "id": 1, "title": "Weep Not, Child", "...": "..." } ],
  "pagination": { "page": 1, "limit": 10, "total": 26, "totalPages": 3 }
}
```

A single book:

```json
{
  "data": {
    "id": 1,
    "title": "Weep Not, Child",
    "author": "Ngugi wa Thiong'o",
    "isbn": "978-0-14-018650-2",
    "price": 1200,
    "category": "Fiction",
    "description": "The first English-language novel published by an East African author...",
    "coverImage": "https://picsum.photos/seed/book1/400/600",
    "inStock": true,
    "createdAt": "2026-01-15T00:00:00.000Z"
  }
}
```

### Book fields (POST and PUT)

| Field | Rules |
| ----- | ----- |
| `title` | Required, up to 200 characters |
| `author` | Required |
| `isbn` | Required, 10 or 13 digits (dashes allowed), must not belong to another book |
| `price` | Required, a positive number in KES |
| `category` | Required, one of the six categories (id or name) |
| `description` | Optional, up to 2000 characters |
| `coverImage` | Optional, a URL starting with `http://` or `https://` |
| `inStock` | Optional, `true` or `false` (default `true`) |

`id` and `createdAt` are set by the API.

### Examples

```bash
# search and filter
curl "http://localhost:5000/api/books?search=ngugi&inStock=true"

# create a book
curl -X POST http://localhost:5000/api/books \
  -H "Content-Type: application/json" \
  -H "x-admin-key: bookstore-admin" \
  -d '{"title":"Kintu","author":"Jennifer Nansubuga Makumbi","isbn":"978-1-940450-61-2","price":1650,"category":"fiction"}'

# delete a book
curl -X DELETE http://localhost:5000/api/books/1 -H "x-admin-key: bookstore-admin"
```

### Errors

Errors look like `{ "error": "Not Found", "message": "..." }`. Validation errors list every
problem at once: `{ "error": "Validation Error", "messages": ["title is required", "..."] }`.

| Status | When |
| ------ | ---- |
| 200 | Success |
| 201 | Book created |
| 400 | Bad query option, bad book id, failed validation or invalid JSON |
| 401 | Admin key missing |
| 403 | Admin key wrong, or the request came from a website that isn't allowed |
| 404 | Book, author or route does not exist |
| 409 | ISBN already used by another book |
| 500 | Unexpected server error |

## Deployment

Deploy the API first, because the frontend needs its URL.

### API on Railway
1. Push the repository to GitHub and create a Railway project from it.
2. Set the service **root directory** to `Week 5/week-5-bookstore-project/week-5-bookstore-api`.
3. Railway runs `npm start` and sets `PORT` itself.
4. Add the variables `ADMIN_KEY` (your own secret) and `CLIENT_URL` (your Vercel URL, added in step 4 of the next list).
5. Generate a public domain and check that `https://<your-app>.up.railway.app/api/health` returns `"status": "ok"`.

### Frontend on Vercel
1. Import the repository and set the **root directory** to `Week 5/week-5-bookstore-project/week-5-bookstore-frontend`.
2. Keep the Vite preset (build command `npm run build`, output folder `dist`).
3. Add the variable `VITE_API_URL` = your Railway URL, with no trailing slash.
4. Deploy, then put the Vercel URL into Railway's `CLIENT_URL` so the API accepts its requests.

`vercel.json` sends every path to `index.html`, so refreshing a page such as `/books/3` works.

## Notes and limitations

- Books are stored in memory, so added, edited and deleted books reset when the API restarts.
- The cart is saved in the browser's `localStorage`. The admin key is kept in `sessionStorage`,
  so closing the tab logs the admin out.
- Seed ISBNs and cover images (from picsum.photos) are placeholders.
