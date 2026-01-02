# StoreAdmin - Catalog Inventory Portal

A modern, production-grade inventory management dashboard built with React, TypeScript, and Tailwind CSS. Designed for retail store managers to browse, search, and analyze product inventory with a beautiful, premium UI.

![StoreAdmin Portal](https://img.shields.io/badge/React-18.3.1-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.6.2-blue) ![Tailwind](https://img.shields.io/badge/Tailwind-3.4.0-blue) ![Vite](https://img.shields.io/badge/Vite-6.4.1-purple)

## ✨ Features

### 📊 Inventory Overview
- **List & Grid Views** - Toggle between compact list and visual grid layouts
- **Smart Search** - Debounced search (300ms) with request cancellation
- **Client-Side Sorting** - Sort by Name (A-Z, Z-A) or Price (Low-High, High-Low)
- **Category Filtering** - Filter products by any category
- **Pagination** - Load More button for seamless browsing (20 products per load)

### 🛍️ Product Details
- **Image Gallery** - Browse multiple product images with thumbnail navigation
- **Detailed Information** - Price, discount, rating, description, specifications
- **Similar Products** - 6 related products from the same category

### 📁 Catalogue
- **Visual Categories** - Grid of category cards with representative thumbnails
- **Easy Navigation** - Click any category to view its products

### 🎨 Design System
- **Light Theme** - Soft lavender/purple gradient palette
- **Skeleton Loaders** - Smooth loading states (no spinners)
- **Micro-animations** - Hover effects, transitions, and smooth interactions
- **Responsive** - Works on desktop and tablet devices

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd store-admin-portal

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at **http://localhost:5173/**

### Build for Production

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/
│   ├── Layout/
│   │   ├── Sidebar.tsx       # Navigation sidebar
│   │   ├── Header.tsx        # Top header with search
│   │   └── Layout.tsx        # Main layout wrapper
│   ├── ui/
│   │   ├── Button.tsx        # Primary/secondary/ghost buttons
│   │   ├── Badge.tsx         # Status badges
│   │   ├── Card.tsx          # Base card component
│   │   └── Skeleton.tsx      # Loading skeletons
│   ├── products/
│   │   ├── ProductCard.tsx   # Grid view product card
│   │   └── ProductRow.tsx    # List view product row
│   ├── categories/
│   │   └── CategoryCard.tsx  # Category selection card
│   └── common/
│       ├── EmptyState.tsx    # Empty results display
│       ├── ErrorState.tsx    # Error with retry
│       └── LoadMoreButton.tsx
├── context/
│   └── ProductContext.tsx    # Global state management
├── hooks/
│   └── useDebounce.ts        # Debounce hook for search
├── pages/
│   ├── HomePage.tsx          # Welcome/landing page
│   ├── InventoryPage.tsx     # Product listing
│   ├── ProductDetailPage.tsx # Single product view
│   ├── CataloguePage.tsx     # Category grid
│   └── CategoryProductsPage.tsx
├── services/
│   ├── api.ts                # Axios instance
│   └── productService.ts     # API methods
├── types/
│   └── index.ts              # TypeScript interfaces
├── App.tsx                   # Router configuration
├── main.tsx                  # Entry point
└── index.css                 # Global styles
```

## 🔌 API Integration

This app uses the [DummyJSON](https://dummyjson.com) API for product data.

| Endpoint | Description |
|----------|-------------|
| `GET /products` | Paginated product list |
| `GET /products/{id}` | Single product details |
| `GET /products/search?q=` | Search products |
| `GET /products/categories` | All categories |
| `GET /products/category/{slug}` | Products by category |

### Features
- ✅ Centralized Axios instance with interceptors
- ✅ Fully typed responses (no `any`)
- ✅ Abort controller for cancelling previous search requests
- ✅ Error handling with retry options

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 18** | UI framework |
| **TypeScript** | Type safety |
| **Tailwind CSS** | Styling |
| **React Router v6** | Navigation |
| **Axios** | HTTP client |
| **Context API** | State management |
| **Vite** | Build tool |

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository in [Vercel](https://vercel.com)
3. Vercel will auto-detect Vite and deploy

### Manual Deployment

```bash
npm run build
# Deploy the `dist` folder to any static hosting
```

## 📱 Routes

| Path | Page |
|------|------|
| `/` | Home / Welcome |
| `/inventory` | Inventory Overview |
| `/product/:id` | Product Details |
| `/catalogue` | Category Grid |
| `/catalogue/:category` | Category Products |

## 🎯 Key Design Decisions

1. **Client-Side Sorting** - DummyJSON doesn't support server-side sorting, so sorting is handled in the frontend after fetching
2. **Load More vs Infinite Scroll** - Load More button gives users control over data loading
3. **Skeleton Loaders** - Provides better UX than spinners by showing content shape
4. **Context API** - Sufficient for this scale; no need for Redux/Zustand complexity

## 📄 License

MIT License - feel free to use this project for learning or as a starting point for your own applications.

---

Built with ❤️ using React + TypeScript + Tailwind CSS
