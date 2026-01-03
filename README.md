# StoreAdmin - Catalog Inventory Portal

A modern, production-grade inventory management dashboard built with React, TypeScript, and Tailwind CSS. Designed for retail store managers to browse, search, and analyze product inventory with a beautiful, premium UI.

🚀 **Live Demo:** [store-admin-catalog-inventory-porta.vercel.app](https://store-admin-catalog-inventory-porta.vercel.app/)

📦 **Repository:** [github.com/rah-9/StoreAdmin-Catalog-Inventory-Portal](https://github.com/rah-9/StoreAdmin-Catalog-Inventory-Portal)

![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=flat&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6.2-3178C6?style=flat&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.0-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.4.1-646CFF?style=flat&logo=vite&logoColor=white)

---

## ✅ Requirements Checklist

### 1. Inventory Overview Screen

| Requirement | Status | Implementation |
|-------------|--------|----------------|
| Product Name, Price, Brand, Category, Stock Status columns | ✅ | `ProductRow.tsx` displays all columns + Rating |
| Sort by Price or Name | ✅ | Client-side sorting in `ProductContext.tsx` |
| Filter by Category | ✅ | Category dropdown using `/products/categories` API |
| Handle large data gracefully | ✅ | Load More pagination (not infinite scroll) |
| Minimum 20 products on first load | ✅ | `ITEMS_PER_PAGE = 20` in ProductContext |
| **[BONUS]** Quick Find/Search | ✅ | Debounced search (300ms) with abort controller |

### 2. Product Details Screen

| Requirement | Status | Implementation |
|-------------|--------|----------------|
| Visually appealing with image | ✅ | Image gallery with thumbnail navigation |
| Description, Rating, Discount Percentage | ✅ | All displayed in `ProductDetailPage.tsx` |
| Browse Similar Products section | ✅ | 6 cards from same category using `/products/category/{slug}?limit=6` |
| Visual cards (Image, Name, Price) | ✅ | Card layout with hover effects |

### 3. Hierarchical Inventory & Catalogue Overview

| Requirement | Status | Implementation |
|-------------|--------|----------------|
| View all categories at a glance | ✅ | `CataloguePage.tsx` with visual category cards |
| Product images in category cards | ✅ | Fetches first product thumbnail per category |
| Drill-down into specific category | ✅ | `CategoryProductsPage.tsx` on click |
| Reuse Inventory Overview UI | ✅ | Same list/grid toggle, sorting, pagination |

### 4. Welcome Home Page

| Requirement | Status | Implementation |
|-------------|--------|----------------|
| Welcome page with instructions | ✅ | Hero section with feature cards |
| Navigate to Inventory Overview | ✅ | CTA button → `/inventory` |
| Navigate to Catalogue Overview | ✅ | CTA button → `/catalogue` |

### Application Quality & UX

| Requirement | Status | Implementation |
|-------------|--------|----------------|
| Network transparency (loading/error states) | ✅ | Skeleton loaders + ErrorState with retry |
| Device agnostic (responsive) | ✅ | Tailwind responsive classes (sm/md/lg/xl) |
| Consistent brand identity | ✅ | Lavender/purple color palette throughout |
| Performance & loading speed | ✅ | Skeleton loaders, memoization, abort requests |
| Clean, modular code | ✅ | Separated components/pages/services/hooks/context/types |

### Submission Requirements

| Requirement | Status |
|-------------|--------|
| ReactJS + TypeScript | ✅ |
| Tailwind CSS | ✅ |
| Deployed link (Vercel) | ✅ |
| GitHub repository with README | ✅ |

---

## 📋 Assumptions

1. **Client-Side Sorting**: The DummyJSON API does not support server-side sorting. Therefore, sorting by Name and Price is implemented client-side after fetching the data. This is acceptable for the current dataset size.

2. **Load More vs Infinite Scroll**: Chose Load More button instead of infinite scroll as it gives users explicit control over data loading and is better for memory management with large datasets.

3. **Category Thumbnails**: Since the `/products/categories` endpoint only returns category metadata without images, I fetch the first product from each category to use its thumbnail as the category image.

4. **Search Responsiveness**: Implemented 300ms debounce on search input with AbortController to cancel in-flight requests, preventing UI stutter when typing quickly.

5. **Minimum 20 Products**: The initial load fetches 20 products (`ITEMS_PER_PAGE = 20`), and subsequent "Load More" clicks fetch 20 more each time.

6. **Similar Products Limit**: The "Browse Similar Products" section fetches 7 products from the same category (limit = 6 + 1) and filters out the current product to display exactly 6 related items.

7. **Desktop-First Design**: The layout is optimized for desktop/tablet (sidebar navigation), with responsive breakpoints for smaller screens. Full mobile hamburger menu was not implemented as the primary use case is store managers on desktop.

8. **No Authentication**: Since the API is public and the assignment focuses on frontend development, no authentication/authorization was implemented.

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🔍 **Smart Search** | Debounced input (300ms) with request cancellation |
| 📊 **Dual View Modes** | Toggle between list and grid layouts |
| 🏷️ **Category Filtering** | Filter products by any category |
| ⬆️⬇️ **Client-Side Sorting** | Sort by Name or Price (ascending/descending) |
| 📄 **Pagination** | Load More button (20 products per page) |
| 🖼️ **Image Gallery** | Product detail with thumbnail navigation |
| 🔗 **Similar Products** | 6 related items from same category |
| 💀 **Skeleton Loaders** | Smooth loading states (no spinners) |
| 🎨 **Premium UI** | Lavender/purple theme with soft shadows |

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/rah-9/StoreAdmin-Catalog-Inventory-Portal.git

# Navigate to project
cd StoreAdmin-Catalog-Inventory-Portal

# Install dependencies
npm install

# Start development server
npm run dev
```

Open **http://localhost:5173/** in your browser.

### Production Build

```bash
npm run build
npm run preview
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 18** | UI framework with hooks |
| **TypeScript** | Type safety & IntelliSense |
| **Tailwind CSS** | Utility-first styling |
| **React Router v6** | Client-side routing |
| **Axios** | HTTP client with interceptors |
| **Context API** | Global state management |
| **Vite** | Fast build tool & HMR |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Layout/          # Sidebar, Header, Layout wrapper
│   ├── ui/              # Button, Badge, Card, Skeleton
│   ├── products/        # ProductCard, ProductRow
│   ├── categories/      # CategoryCard
│   └── common/          # EmptyState, ErrorState, LoadMore
├── context/             # ProductContext (global state)
├── hooks/               # useDebounce
├── pages/               # HomePage, InventoryPage, etc.
├── services/            # API layer (Axios)
├── types/               # TypeScript interfaces
└── App.tsx              # Router configuration
```

---

## 🔌 API Integration

**Base URL:** `https://dummyjson.com`

| Endpoint | Usage |
|----------|-------|
| `GET /products` | Paginated product list |
| `GET /products/{id}` | Single product details |
| `GET /products/search?q=` | Search with abort controller |
| `GET /products/categories` | All categories |
| `GET /products/category/{slug}` | Products by category |

---

## 📱 Routes

| Path | Page |
|------|------|
| `/` | Home / Welcome |
| `/inventory` | Inventory Overview |
| `/product/:id` | Product Details |
| `/catalogue` | Category Grid |
| `/catalogue/:category` | Category Products |

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server (port 5173) |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

---

## 👤 Author

**Rahul** - [GitHub Profile](https://github.com/rah-9)

---

## 📄 License

MIT License - Free to use for learning and personal projects.

---

<p align="center">
  Built with ❤️ using React + TypeScript + Tailwind CSS
</p>
