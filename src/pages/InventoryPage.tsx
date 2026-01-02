import React, { useState } from 'react';
import { useProductContext } from '../context/ProductContext';
import ProductCard from '../components/products/ProductCard';
import ProductRow from '../components/products/ProductRow';
import { ProductCardSkeleton, ProductRowSkeleton } from '../components/ui/Skeleton';
import EmptyState from '../components/common/EmptyState';
import ErrorState from '../components/common/ErrorState';
import LoadMoreButton from '../components/common/LoadMoreButton';
import { SortField, SortOrder } from '../types';

type ViewMode = 'grid' | 'list';

const InventoryPage: React.FC = () => {
    const {
        products,
        loading,
        error,
        hasMore,
        filters,
        categories,
        categoriesLoading,
        total,
        setCategory,
        setSorting,
        loadMore,
        refreshProducts,
    } = useProductContext();

    const [viewMode, setViewMode] = useState<ViewMode>('list');

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const [field, order] = e.target.value.split('-') as [SortField, SortOrder];
        setSorting(field, order);
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setCategory(value === 'all' ? null : value);
    };

    // Initial loading state
    if (loading && products.length === 0) {
        return (
            <div>
                {/* Controls skeleton */}
                <div className="flex items-center justify-between mb-6">
                    <div className="h-8 w-48 skeleton rounded-lg" />
                    <div className="flex gap-3">
                        <div className="h-10 w-36 skeleton rounded-xl" />
                        <div className="h-10 w-36 skeleton rounded-xl" />
                    </div>
                </div>

                {/* Products skeleton */}
                <div className="space-y-3">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <ProductRowSkeleton key={i} />
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return <ErrorState message={error} onRetry={refreshProducts} />;
    }

    return (
        <div>
            {/* Header Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                {/* Product count */}
                <div>
                    <p className="text-sm text-text-secondary">
                        Showing <span className="font-semibold text-text-primary">{products.length}</span>
                        {total > 0 && <> of <span className="font-semibold text-text-primary">{total}</span></>} products
                        {filters.search && (
                            <span className="ml-2 text-primary-600">
                                matching "{filters.search}"
                            </span>
                        )}
                    </p>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-3">
                    {/* Category Filter */}
                    <div className="relative">
                        <select
                            value={filters.category || 'all'}
                            onChange={handleCategoryChange}
                            disabled={categoriesLoading}
                            className="appearance-none pl-4 pr-10 py-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-primary-300 focus:ring-2 focus:ring-primary-100 transition-all cursor-pointer"
                        >
                            <option value="all">All Categories</option>
                            {categories.map((cat) => (
                                <option key={cat.slug} value={cat.slug}>
                                    {cat.name.charAt(0).toUpperCase() + cat.name.slice(1)}
                                </option>
                            ))}
                        </select>
                        <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>

                    {/* Sort Dropdown */}
                    <div className="relative">
                        <select
                            value={`${filters.sortField}-${filters.sortOrder}`}
                            onChange={handleSortChange}
                            className="appearance-none pl-4 pr-10 py-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-primary-300 focus:ring-2 focus:ring-primary-100 transition-all cursor-pointer"
                        >
                            <option value="title-asc">Name (A-Z)</option>
                            <option value="title-desc">Name (Z-A)</option>
                            <option value="price-asc">Price (Low-High)</option>
                            <option value="price-desc">Price (High-Low)</option>
                        </select>
                        <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>

                    {/* View Mode Toggle */}
                    <div className="flex rounded-xl border border-gray-200 overflow-hidden">
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-2.5 transition-colors ${viewMode === 'list'
                                    ? 'bg-primary-500 text-white'
                                    : 'bg-white text-text-muted hover:text-text-primary'
                                }`}
                            title="List view"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-2.5 transition-colors ${viewMode === 'grid'
                                    ? 'bg-primary-500 text-white'
                                    : 'bg-white text-text-muted hover:text-text-primary'
                                }`}
                            title="Grid view"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Table Header for List View */}
            {viewMode === 'list' && products.length > 0 && (
                <div className="hidden lg:flex items-center gap-4 px-4 py-3 mb-2 text-xs font-medium text-text-muted uppercase tracking-wide">
                    <div className="w-16" /> {/* Image placeholder */}
                    <div className="flex-1">Product</div>
                    <div className="w-28 hidden md:block">Category</div>
                    <div className="w-24 text-right hidden lg:block">Price</div>
                    <div className="w-24 text-center">Stock</div>
                    <div className="w-16 hidden xl:block">Rating</div>
                    <div className="w-5" /> {/* Arrow */}
                </div>
            )}

            {/* Products */}
            {products.length === 0 ? (
                <EmptyState
                    title="No products found"
                    message={
                        filters.search
                            ? `We couldn't find any products matching "${filters.search}". Try a different search term.`
                            : filters.category
                                ? "This category doesn't have any products yet."
                                : 'No products are available at the moment.'
                    }
                    actionLabel="Clear filters"
                    onAction={() => {
                        setCategory(null);
                    }}
                />
            ) : viewMode === 'list' ? (
                <div className="space-y-3">
                    {products.map((product) => (
                        <ProductRow key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}

            {/* Loading more skeleton */}
            {loading && products.length > 0 && (
                <div className="mt-6 space-y-3">
                    {viewMode === 'list' ? (
                        Array.from({ length: 4 }).map((_, i) => <ProductRowSkeleton key={i} />)
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                            {Array.from({ length: 4 }).map((_, i) => (
                                <ProductCardSkeleton key={i} />
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Load More */}
            {products.length > 0 && (
                <LoadMoreButton onClick={loadMore} loading={loading} hasMore={hasMore} />
            )}
        </div>
    );
};

export default InventoryPage;
