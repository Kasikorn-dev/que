# Que

A full-stack TypeScript application built with the T3 Stack.

## Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 15** | React Framework (App Router + Turbo) |
| **React 19** | UI Library |
| **tRPC** | End-to-end Type-safe API |
| **Drizzle ORM** | TypeScript ORM |
| **Supabase** | PostgreSQL Database & Auth |
| **TailwindCSS 4** | Utility-first CSS |
| **shadcn/ui** | UI Component Library |
| **Zod** | Schema Validation |
| **Biome** | Linter & Formatter |

## Project Structure

```
src/
├── app/                    # Next.js App Router (Routes only)
│   ├── api/trpc/           # tRPC HTTP endpoint
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Pages import from features/
│
├── features/               # Feature modules (business logic + UI)
│   └── posts/
│       ├── components/     # Feature-specific components
│       └── index.ts        # Barrel export
│
├── components/
│   ├── ui/                 # shadcn/ui base components
│   └── shared/             # Reusable custom components
│
├── server/                 # Backend
│   ├── api/                # tRPC routers
│   │   ├── routers/        # Feature routers
│   │   ├── root.ts         # Root router
│   │   └── trpc.ts         # tRPC setup
│   └── db/                 # Database (Drizzle + Supabase)
│       ├── schema.ts       # Table definitions
│       └── index.ts        # DB connection
│
├── trpc/                   # tRPC Clients
│   ├── react.tsx           # Client Components (HTTP)
│   └── server.ts           # Server Components (direct call)
│
└── lib/                    # Shared utilities
```

## Getting Started

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `pnpm dev` | Start dev server (Turbo) |
| `pnpm build` | Build for production |
| `pnpm db:studio` | Open Drizzle Studio |
| `pnpm db:push` | Sync schema to database |
| `pnpm db:generate` | Generate migrations |
| `pnpm check` | Lint with Biome |

## Architecture Rules

## Architecture Rules

This workspace follows a strict **Feature-Based Architecture**.

### 1. Directory Structure
- **`src/features/<feature-name>/`**: **Core Logic**. Business logic, UI components, hooks, and utils specific to a feature MUST go here.
- **`src/app/`**: **Routing Only**. Next.js App Router definitions. Pages should import lazy-loaded components from `src/features/`.
- **`src/components/`**: **Shared UI**. Generic, reusable components (e.g., shadcn/ui).

### 2. Naming Conventions
- **Files/Folders**: `kebab-case` (e.g., `user-profile/`, `create-post.tsx`)
- **Components**: `PascalCase` (e.g., `UserProfile`, `CreatePost`)
- **Functions/Hooks**: `camelCase` (e.g., `handleSubmit`, `useAuth`)

### 3. Data Fetching (tRPC)
- **Server Components**: Import from `@/trpc/server`
- **Client Components**: Import from `@/trpc/react`
- **NEVER** mix these imports to prevent boundary leaks.
