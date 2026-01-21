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

- **`src/app/`** - Routes only. Import components from `src/features/`.
- **`src/features/`** - Feature modules with components, hooks, utils.
- **`src/components/ui/`** - shadcn/ui components (generic, reusable).
- **`@/trpc/react`** - For Client Components only.
- **`@/trpc/server`** - For Server Components only.
