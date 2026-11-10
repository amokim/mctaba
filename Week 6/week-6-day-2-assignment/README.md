# Week 6 Day 2 Assignment: Prisma Schema Design

A PostgreSQL database designed with [Prisma ORM](https://www.prisma.io/) 7. One schema holds three separate data models:

- **Blog**: users, posts, comments and tags
- **E-commerce**: categories, products, orders and order items
- **School**: departments, teachers, courses, students and enrollments

Enums (`OrderStatus` and `userRole`) restrict status and role fields to a fixed list of values.

## Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup](#setup)
- [Schema Layout](#schema-layout)
  - [Blog and E-commerce](#blog-and-e-commerce)
  - [School](#school)
- [Enums](#enums)
- [Migrations](#migrations)
- [Useful Commands](#useful-commands)

## Tech Stack

| Tool | Version | Purpose |
|---|---|---|
| Node.js | 20.19+ | Runs the Prisma CLI |
| Prisma CLI (`prisma`) | 7.10.1 | Migrations, client generation, Prisma Studio |
| Prisma Client (`@prisma/client`) | 7.10.1 | Type-safe database queries |
| PostgreSQL | Hosted on Supabase | The database |
| dotenv | 18.x | Loads `DATABASE_URL` from `.env` |

## Project Structure

```
week-6-day-2-assignment/
├── prisma/
│   ├── migrations/                       # One folder per schema change
│   │   ├── 20261110132656_blog_schema/
│   │   ├── 20261110133808_ecommerce_schema/
│   │   ├── 20261110140257_school_schema/
│   │   ├── 20261110141125_add_enums/
│   │   └── migration_lock.toml
│   └── schema.prisma                     # All models and enums
├── screenshots/                          # Diagrams from Prisma Studio
├── .env                                  # DATABASE_URL (not committed)
├── .gitignore
├── package.json
├── prisma.config.cts                     # Prisma CLI configuration
└── README.md
```

## Setup

### 1. Prerequisites

- [Node.js](https://nodejs.org/) 20.19 or newer
- A PostgreSQL database. A local Postgres install works, or a free hosted one from [Supabase](https://supabase.com/).

### 2. Install dependencies

```bash
npm install
```

### 3. Create the `.env` file

Create a `.env` file in the project root with your database connection string:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DATABASE"
```

For Supabase, copy the connection string from **Project Settings → Database → Connection string**. Use the **session pooler** URL (port `5432`).

`.env` is listed in `.gitignore`, so your password is never committed.

### 4. Check the Prisma config

`prisma.config.cts` tells the Prisma CLI where the schema and migrations are and how to connect to the database:

```ts
import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: env("DATABASE_URL"),
  },
});
```

Prisma 7 does not read `.env` on its own. The `import "dotenv/config"` line loads it. The connection URL is set here, not in `schema.prisma`.

### 5. Validate the schema

```bash
npx prisma validate
```

### 6. Create the tables

```bash
npx prisma migrate dev
```

This applies every migration in `prisma/migrations/` in order, creating all tables, relations and enums.

### 7. Generate the Prisma Client

```bash
npx prisma generate
```

### 8. Open Prisma Studio

```bash
npx prisma studio
```

Studio opens at [http://localhost:5555](http://localhost:5555). You can browse and edit every table there and view the schema diagrams shown below.

## Schema Layout

### Blog and E-commerce

![Blog and E-commerce schema](screenshots/Blog%26Ecommerce%20schema.png)

#### Blog models

| Model | Fields | Notes |
|---|---|---|
| **User** | `id`, `name`, `email`, `bio?`, `role`, `createdAt`, `updatedAt` | `email` is unique; `role` defaults to `USER` |
| **Post** | `id`, `title`, `content`, `published`, `createdAt`, `updatedAt`, `authorId` | `published` defaults to `false` |
| **Comment** | `id`, `text`, `createdAt`, `userId`, `postId` | Belongs to one user and one post |
| **Tag** | `id`, `name` | `name` is unique |

#### E-commerce models

| Model | Fields | Notes |
|---|---|---|
| **Category** | `id`, `name`, `description?` | `name` is unique |
| **Product** | `id`, `name`, `description?`, `price`, `stock`, `imageUrl?`, `createdAt`, `updatedAt`, `categoryId` | `price` is `Decimal(10, 2)`; `stock` defaults to `0` |
| **Order** | `id`, `totalAmount`, `status`, `createdAt`, `updatedAt`, `userId` | `status` defaults to `PENDING` |
| **OrderItem** | `id`, `quantity`, `price`, `orderId`, `productId` | One line in an order |

`?` marks an optional (nullable) field.

#### Relationships

| Relationship | Type | How it works |
|---|---|---|
| User → Post | One-to-many | `Post.authorId` references `User.id` |
| User → Comment | One-to-many | `Comment.userId` references `User.id` |
| Post → Comment | One-to-many | `Comment.postId` references `Post.id` |
| Post ↔ Tag | Many-to-many | Prisma creates the `_PostToTag` join table automatically |
| User → Order | One-to-many | `Order.userId` references `User.id` (the relation is called `customer`) |
| Category → Product | One-to-many | `Product.categoryId` references `Category.id` |
| Order → OrderItem | One-to-many | `OrderItem.orderId` references `Order.id` |
| Product → OrderItem | One-to-many | `OrderItem.productId` references `Product.id` |

The `_prisma_migrations` table in the diagram is created by Prisma to track which migrations have been applied. It is not part of the app's data.

### School

![School schema](screenshots/School%20Schema.png)

| Model | Fields | Notes |
|---|---|---|
| **Department** | `id`, `name`, `code` | `name` and `code` are unique |
| **Teacher** | `id`, `name`, `email`, `hireDate?`, `departmentId` | `email` is unique |
| **Course** | `id`, `name`, `code`, `credits`, `departmentId`, `teacherId` | `code` is unique; `credits` defaults to `3` |
| **Student** | `id`, `name`, `email`, `age?`, `town?`, `enrolledAt` | `email` is unique |
| **Enrollment** | `id`, `grade?`, `enrolledDate`, `studentId`, `courseId` | A student can enrol in each course only once |

#### Relationships

| Relationship | Type | How it works |
|---|---|---|
| Department → Teacher | One-to-many | `Teacher.departmentId` references `Department.id` |
| Department → Course | One-to-many | `Course.departmentId` references `Department.id` |
| Teacher → Course | One-to-many | `Course.teacherId` references `Teacher.id` |
| Student ↔ Course | Many-to-many | Through the `Enrollment` table, which also stores `grade` and `enrolledDate` |

`Enrollment` has `@@unique([studentId, courseId])`, so the database rejects a second enrollment of the same student in the same course.

## Enums

Enums limit a field to a fixed set of values. Postgres creates a real type for each one, so invalid values are rejected by the database itself, and Prisma Client gives you autocomplete for them.

```prisma
enum OrderStatus {
  PENDING
  PROCESSING
  SHIPPED
  DELIVERED
  CANCELED
}

enum userRole {
  USER
  ADMIN
  MODERATOR
}
```

They are used in these fields:

```prisma
model User {
  // ...
  role   userRole    @default(USER)
}

model Order {
  // ...
  status OrderStatus @default(PENDING)
}
```

Example usage in code:

```js
const { PrismaClient, OrderStatus, userRole } = require("@prisma/client");

await prisma.order.update({
  where: { id: 1 },
  data: { status: OrderStatus.SHIPPED },
});

const admins = await prisma.user.findMany({
  where: { role: userRole.ADMIN },
});
```

## Migrations

The schema was built in four steps. Each one is a migration in `prisma/migrations/`:

| Migration | What it does |
|---|---|
| `20261110132656_blog_schema` | Creates `User`, `Post`, `Comment`, `Tag` and the `_PostToTag` join table |
| `20261110133808_ecommerce_schema` | Creates `Category`, `Product`, `Order` and `OrderItem` |
| `20261110140257_school_schema` | Creates `Department`, `Teacher`, `Course`, `Student` and `Enrollment` |
| `20261110141125_add_enums` | Adds the `OrderStatus` and `userRole` enums, changes `Order.status` from text to `OrderStatus`, and adds `User.role` |

The `add_enums` migration drops and recreates the `Order.status` column, so any existing status values were replaced with the default `PENDING`.

## Useful Commands

| Command | What it does |
|---|---|
| `npx prisma validate` | Checks the config and schema for errors |
| `npx prisma format` | Formats `schema.prisma` |
| `npx prisma migrate dev --name <name>` | Creates and applies a migration after a schema change |
| `npx prisma migrate status` | Shows which migrations have been applied |
| `npx prisma migrate reset` | Drops the database and re-applies every migration (**deletes all data**) |
| `npx prisma generate` | Regenerates Prisma Client after a schema change |
| `npx prisma studio` | Opens the database browser at http://localhost:5555 |
