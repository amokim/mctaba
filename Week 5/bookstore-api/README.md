# Bookstore API - Week 5

A REST API for managing a bookstore's books, built with Express 5. Books are kept in memory and
can be listed, searched, filtered, sorted, paged, created, replaced, updated and deleted.

```
bookstore-api/
├── server.js                 app setup, middleware, welcome route, listen
├── routes/
│   └── books.js              every /api/books route
├── middleware/
│   ├── validate.js           POST/PUT/PATCH body validation
│   ├── rateLimiter.js        50 requests per minute per IP
│   ├── notFound.js           404 for unknown routes
│   └── errorHandler.js       invalid JSON and unexpected errors
└── data/
    └── book.js               10 seed books
```

## Run locally

```bash
npm install
npm run dev      # restarts on file changes (nodemon)
# or
npm start
```

The API runs on http://localhost:3000. Set the `PORT` environment variable to use another port.
`GET /` lists every endpoint.

## Endpoints

| Method | Endpoint | Description |
| ------ | -------- | ----------- |
| GET | `/api/books` | List books, with filters, search, sorting and pagination |
| GET | `/api/books/stats` | Totals across the whole catalogue |
| GET | `/api/books/:id` | Single book |
| GET | `/api/books/:id/related` | Other books in the same category |
| POST | `/api/books` | Create a book |
| PUT | `/api/books/:id` | Replace a book (all required fields) |
| PATCH | `/api/books/:id` | Update only the fields sent |
| DELETE | `/api/books/:id` | Delete a book |

### Query options for `GET /api/books`

| Option | Example | Notes |
| ------ | ------- | ----- |
| `category` | `?category=fiction` | Exact match, case-insensitive |
| `author` | `?author=ngugi` | Part of the author's name, case-insensitive |
| `inStock` | `?inStock=true` | `true` or `false` only |
| `search` | `?search=river` | Searches title and author |
| `sort` | `?sort=price` | `title`, `author`, `price`, `createdAt`, or `price_desc` |
| `order` | `?order=desc` | `asc` (default) or `desc` |
| `page` | `?page=2` | Positive whole number, default `1` |
| `limit` | `?limit=5` | Positive whole number, default `10` |

`?sort=price_desc` is shorthand for `?sort=price&order=desc` (most expensive first).
Options can be combined, e.g. `?category=fiction&inStock=true&sort=price_desc&limit=3`.

## Responses

### List response

`GET /api/books?sort=price_desc&limit=3`:

```json
{
  "summary": {
    "message": "Found 10 books, sorted by price (high to low). Showing 1–3 of 10.",
    "matched": 10,
    "showing": { "from": 1, "to": 3, "count": 3 },
    "filters": { "category": null, "author": null, "inStock": null, "search": null },
    "sort": { "field": "price", "order": "desc" }
  },
  "page": 1,
  "limit": 3,
  "total": 10,
  "totalPages": 4,
  "books": [ { "id": 3, "title": "Dust", "price": 1800, "...": "..." } ]
}
```

Both list endpoints (`/api/books` and `/api/books/:id/related`) start with a `summary`:

| Field | Meaning |
| ----- | ------- |
| `message` | One readable sentence describing the result, e.g. `"No books found matching 'zzz'."` |
| `matched` | How many books matched in total, across all pages |
| `showing` | Which books are in this response: `from`, `to` and `count` (all `0` when there are none) |
| `filters` | The filters applied, `null` for ones not used |
| `sort` | `{ "field", "order" }`, or `null` when no sort was applied |

Use `message` for display and the other fields in code. Single books, create/update/delete
responses and errors have no summary. An empty result is still `200` with an empty `books` list.

### Stats response

`GET /api/books/stats`:

```json
{
  "totalBooks": 10,
  "inStockCount": 8,
  "outOfStockCount": 2,
  "totalValue": 14600,
  "averagePrice": 1460,
  "categories": { "fiction": 6, "biography": 1, "business": 2, "history": 1 },
  "mostExpensiveBook": { "title": "Dust", "price": 1800 },
  "cheapestBook": { "title": "The River Between", "price": 1100 }
}
```

`totalValue` adds up one copy of each book. `averagePrice` is rounded to a whole number. With no
books, the average is `0` and the most expensive and cheapest books are `null`.

### Book fields

| Field | Rules |
| ----- | ----- |
| `title` | Required, non-empty string |
| `author` | Required, non-empty string |
| `isbn` | Required, digits and dashes only, at least 10 characters, must be unique |
| `price` | Required, positive number |
| `category` | Required, one of `fiction`, `biography`, `business`, `history` (any case, stored in lowercase) |
| `inStock` | Optional, `true` or `false` (default `true`) |
| `coverImage` | Optional, `null` or a URL starting with `http://` or `https://` |

`id` and `createdAt` are set by the API. `PATCH` needs at least one of the fields above.

Any other category is rejected on `POST`, `PUT` and `PATCH` with a `400`:

```json
{ "error": "Validation Error", "messages": ["category must be one of: fiction, biography, business, history"] }
```

## Examples

```bash
# list and filter
curl "http://localhost:3000/api/books?category=fiction&sort=price_desc"

# stats
curl http://localhost:3000/api/books/stats

# create
curl -X POST http://localhost:3000/api/books \
  -H "Content-Type: application/json" \
  -d '{"title":"Kintu","author":"Jennifer Nansubuga Makumbi","isbn":"978-1940450612","price":1650,"category":"fiction"}'

# update the price only
curl -X PATCH http://localhost:3000/api/books/1 \
  -H "Content-Type: application/json" \
  -d '{"price":1250}'

# delete
curl -X DELETE http://localhost:3000/api/books/1
```

## Screenshots

Real responses from the API. Each shows the request, the status code and the body.

### Reading books

**Welcome route** - `GET /` lists every endpoint

![Welcome route](screenshots/01-welcome.png)

**List books** - `GET /api/books?limit=2`

![List books](screenshots/02-list.png)

**Filter by category** - `GET /api/books?category=business`

![Filter by category](screenshots/03-filter-category.png)

**Filter by author** - `GET /api/books?author=ngugi`

![Filter by author](screenshots/04-filter-author.png)

**Filter by stock** - `GET /api/books?inStock=false`

![Filter by stock](screenshots/05-filter-in-stock.png)

**Search title and author** - `GET /api/books?search=sun`

![Search](screenshots/06-search.png)

**Sort by price, highest first** - `GET /api/books?sort=price_desc&limit=3`

![Sort by price descending](screenshots/07-sort-price-desc.png)

**Second page** - `GET /api/books?sort=title&page=2&limit=3`

![Second page](screenshots/08-page-2.png)

**No matches** - still `200`, with an empty list - `GET /api/books?search=zzz`

![Search with no matches](screenshots/09-search-empty.png)

**Stats** - `GET /api/books/stats`

![Stats](screenshots/10-stats.png)

**Single book** - `GET /api/books/3`

![Single book](screenshots/11-get-one.png)

**Related books** - `GET /api/books/7/related`

![Related books](screenshots/12-related.png)

### Changing books

**Create** - `POST /api/books` returns `201`

![Create a book](screenshots/13-create-201.png)

**Replace** - `PUT /api/books/11` sends every field

![Replace a book](screenshots/14-replace-put.png)

**Update** - `PATCH /api/books/11` sends only the price

![Update a book](screenshots/15-update-patch.png)

**Delete** - `DELETE /api/books/11`

![Delete a book](screenshots/16-delete.png)

### Errors

**Invalid category** - `400`

![Invalid category](screenshots/17-invalid-category-400.png)

**Missing required fields** - `400`, every problem listed

![Missing fields](screenshots/18-missing-fields-400.png)

**Bad book id** - `400`

![Bad book id](screenshots/19-bad-id-400.png)

**Book not found** - `404`

![Book not found](screenshots/20-not-found-404.png)

**Duplicate ISBN** - `409`

![Duplicate ISBN](screenshots/21-duplicate-isbn-409.png)

**Invalid JSON body** - `400`

![Invalid JSON](screenshots/22-invalid-json-400.png)

**Unknown route** - `404`

![Unknown route](screenshots/23-unknown-route-404.png)

**Bad query option** - `400`

![Bad query option](screenshots/24-bad-query-400.png)

**Rate limit** - `429` after 50 requests in a minute

![Rate limit](screenshots/25-rate-limit-429.png)

## Errors

Errors look like `{ "error": "Not Found", "message": "..." }`, or for validation
`{ "error": "Validation Error", "messages": ["title is required", "..."] }`.

| Status | When |
| ------ | ---- |
| 200 | Success |
| 201 | Book created |
| 400 | Bad query option, bad book id, failed validation or invalid JSON |
| 404 | Book or route does not exist |
| 409 | ISBN already used by another book |
| 429 | More than 50 requests in a minute (see the `Retry-After` header) |
| 500 | Unexpected server error |

## Notes
- Storage is in memory: books added, changed or deleted are reset when the API restarts.
- Security headers come from `helmet`, request logging from `morgan`, and CORS is open to all origins.
