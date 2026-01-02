# StoreAdmin - Catalog Inventory Portal

A modern, production-grade inventory management dashboard built with React, TypeScript, and Tailwind CSS. Designed for retail store managers to browse, search, and analyze product inventory with a beautiful, premium UI.

🔗 **Live Repository:** [github.com/rah-9/StoreAdmin-Catalog-Inventory-Portal](https://github.com/rah-9/StoreAdmin-Catalog-Inventory-Portal)

![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=flat&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6.2-3178C6?style=flat&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.0-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.4.1-646CFF?style=flat&logo=vite&logoColor=white)

---

## 📸 Screenshots

### Home Page
- Hero section with gradient accents
- Feature cards with hover effects
- Quick navigation CTAs

### Inventory Overview
- List & Grid view toggle
- Category filter & sorting
- Debounced search (300ms)
- Load More pagination

### Product Details
- Image gallery with thumbnails
- Price, discount, rating display
- Similar products section

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

**Key Implementation Details:**
- ✅ Centralized Axios instance
- ✅ Fully typed responses (no `any`)
- ✅ Abort controller for search requests
- ✅ Error handling with retry options

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

## 🚢 Deployment

### Vercel (Recommended)

1. Push code to GitHub ✅
2. Import repository in [Vercel](https://vercel.com)
3. Deploy automatically (Vite auto-detected)

### Manual

```bash
npm run build
# Upload `dist/` folder to any static host
```

---

## 🎯 Design Decisions

1. **Client-Side Sorting** - API doesn't support server sorting
2. **Load More Button** - Gives users control vs infinite scroll
3. **Skeleton Loaders** - Better UX by showing content shape
4. **Context API** - Sufficient for app scale, no Redux needed
5. **Debounced Search** - 300ms delay prevents API spam

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
