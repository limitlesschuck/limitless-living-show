# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9

## Artifacts

### Next.js App (`artifacts/nextjs-app`)

A Next.js 14 App Router application with:
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v3
- **Database ORM**: Prisma v5 (PostgreSQL via Replit built-in DB)
- **Auth**: NextAuth.js v4 with JWT sessions + Prisma Adapter
- **Dev port**: 5000 (mapped through Replit proxy at `/nextjs-app/`)
- **Base path**: `/nextjs-app`

#### Project structure
```
artifacts/nextjs-app/
├── app/                    # App Router pages and API routes
│   ├── api/
│   │   ├── auth/[...nextauth]/route.ts   # NextAuth.js route handler
│   │   └── health/route.ts               # DB connectivity check
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/             # Reusable UI components (empty — ready to add)
├── lib/
│   ├── prisma.ts           # Prisma client singleton
│   └── auth.ts             # NextAuth options + JWT callbacks
├── prisma/
│   └── schema.prisma       # User, Account, Session, VerificationToken
├── next.config.mjs
├── tailwind.config.ts
├── postcss.config.mjs
└── tsconfig.json
```

#### Key commands
- `pnpm --filter @workspace/nextjs-app run dev` — start dev server
- `pnpm --filter @workspace/nextjs-app run db:push` — push schema changes
- `pnpm --filter @workspace/nextjs-app run db:generate` — regenerate Prisma client
- `pnpm --filter @workspace/nextjs-app run db:studio` — open Prisma Studio

#### Database
Prisma schema pushed to Replit's PostgreSQL. Tables created:
- `User`, `Account`, `Session`, `VerificationToken` (NextAuth.js required models)

### API Server (`artifacts/api-server`)
Express 5 REST API (legacy scaffold, not actively used by Next.js app)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
