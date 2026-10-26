# 🎬 WeMovies — E-commerce

A movie e-commerce application built with **Next.js 16**, **React 19**, and **TypeScript 5.9**. Browse movies, manage your cart, and complete your purchase — all in a responsive, mobile-first interface.

## 🖥️ Live Demo

> _Coming soon — deployment in progress_

## ✨ Features

- **Product Catalog** — Browse movies fetched from an external REST API via SWR with automatic caching and revalidation
- **Shopping Cart** — Add, remove, and update quantities with real-time subtotal and total calculations
- **Order Confirmation** — Complete your purchase with a success state and automatic cart reset
- **Responsive Design** — Mobile-first layout that adapts seamlessly from phone to desktop
- **Loading & Error States** — Animated loading spinner, empty states, and error feedback with retry action

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| UI Library | [React 19](https://react.dev/) |
| Language | [TypeScript 5.9](https://www.typescriptlang.org/) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com/) |
| State Management | [Nanostores](https://github.com/nanostores/nanostores) |
| Data Fetching | [SWR](https://swr.vercel.app/) |
| UI Components | [shadcn/ui](https://ui.shadcn.com/) |
| Testing | [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/) |
| Icons | [Lucide React](https://lucide.dev/) |

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout with header
│   ├── page.tsx            # Home — movie catalog
│   ├── loading.tsx         # Loading spinner
│   ├── cart/page.tsx       # Shopping cart
│   └── confirmed/page.tsx  # Order confirmation
├── components/             # Reusable UI components
│   ├── Header.tsx          # Navigation + cart counter
│   ├── MovieCard.tsx       # Product card
│   ├── ShowState.tsx       # Empty/error/success state
│   └── ui/                 # shadcn/ui primitives
├── hooks/
│   └── useMovies.ts        # SWR data fetching hook
├── stores/
│   └── cartStore.ts        # Cart state (Nanostores)
├── lib/                    # Utilities
│   ├── cn.ts               # Tailwind class merging
│   ├── fetcher.ts          # SWR fetcher
│   └── formatCurrencyBRL.ts # Currency formatting (BRL)
├── types/
│   └── movie.ts            # TypeScript type definitions
├── tests/                  # Unit and integration test suites
└── styles/
    └── globals.css         # Tailwind config + design tokens
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.18+ (tested with 22.x LTS)
- **npm** 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/wagnersantos/wemovie-ecommerce.git
cd wemovie-ecommerce

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env and configure NEXT_PUBLIC_URL_API (e.g. https://your-api-url.example.com/api/movies)
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Run ESLint with auto-fix |
| `npm run typecheck` | Run TypeScript type checking (`tsc --noEmit`) |
| `npm test` | Run tests once (`vitest`) |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage report |

## 🧪 Testing

The project uses **Vitest** with **Testing Library** for component and unit testing.

```bash
# Run all tests
npm test -- --run

# Run with coverage
npm run test:coverage
```

### Test Coverage

- **Home Page (`src/tests/home.test.tsx`)** — Component tests covering product catalog rendering, loading spinner state, API error fallback with retry action, empty state with reload action, and reactive "Add to Cart" button interactions with quantity badge updates
- **Cart Store (`src/tests/cartStore.test.ts`)** — Pure unit tests for item addition, deduplication, quantity increments, removal, cart clearing, and price subtotal/total calculations
- **Cart Page (`src/tests/cart.test.tsx`)** — Component tests for empty state fallback, cart item list rendering, quantity adjustments (+/-), item removal, and checkout navigation
- **Currency Formatter (`src/tests/formatCurrencyBRL.test.ts`)** — Unit tests covering Brazilian Real (BRL) formatting, zero values, decimal rounding, null/undefined safety, and edge-case handling

## 🏗️ Architecture Decisions

| Decision | Rationale |
|----------|-----------|
| **Nanostores** over Redux/Zustand | Lightweight (~1KB), framework-agnostic, perfect for this app's scope |
| **SWR** over React Query | Simpler API, built-in caching and revalidation, smaller bundle |
| **App Router** | Next.js recommended architecture, enables future RSC migration |
| **shadcn/ui** | Copy-paste components, full control over styling, no runtime dependency |

## 📄 License

This project is licensed under the MIT License.
