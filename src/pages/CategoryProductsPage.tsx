import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import productService from '../services/productService';
import { Product, SortField, SortOrder } from '../types';
import ProductCard from '../components/products/ProductCard';
import ProductRow from '../components/products/ProductRow';
import { ProductCardSkeleton, ProductRowSkeleton } from '../components/ui/Skeleton';
import EmptyState from '../components/common/EmptyState';
import ErrorState from '../components/common/ErrorState';
import LoadMoreButton from '../components/common/LoadMoreButton';

type ViewMode = 'grid' | 'list';

const ITEMS_PER_PAGE = 20;

const CategoryProductsPage: React.FC = () => {
    const { category } = useParams<{ category: string }>();
    const navigate = useNavigate();

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [hasMore, setHasMore] = useState(true);
    const [total, setTotal] = useState(0);
    const [skip, setSkip] = useState(0);

    const [viewMode, setViewMode] = useState<ViewMode>('list');
    const [sortField, setSortField] = useState<SortField>('title');
    const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

    const fetchProducts = useCallback(async (reset: boolean = false) => {
        if (!category) return;

        const currentSkip = reset ? 0 : skip;

        if (reset) {
            setLoading(true);
        } else {
            setLoadingMore(true);
        }
        setError(null);

        try {
            const response = await productService.getProductsByCategory(category, ITEMS_PER_PAGE, currentSkip);

            if (reset) {
                setProducts(response.products);
                setSkip(ITEMS_PER_PAGE);
            } else {
                setProducts(prev => [...prev, ...response.products]);
                setSkip(prev => prev + ITEMS_PER_PAGE);
            }

            setTotal(response.total);
            setHasMore(currentSkip + response.products.length < response.total);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load products');
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    }, [category, skip]);

    useEffect(() => {
        fetchProducts(true);
    }, [category]);

    // Client-side sorting
    const sortedProducts = React.useMemo(() => {
        return [...products].sort((a, b) => {
            let comparison = 0;
            if (sortField === 'title') {
                comparison = a.title.localeCompare(b.title);
            } else if (sortField === 'price') {
                comparison = a.price - b.price;
            }
            return sortOrder === 'asc' ? comparison : -comparison;
        });
    }, [products, sortField, sortOrder]);

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const [field, order] = e.target.value.split('-') as [SortField, SortOrder];
        setSortField(field);
        setSortOrder(order);
    };

    const handleLoadMore = () => {
        if (!loadingMore && hasMore) {
            fetchProducts(false);
        }
    };

    const formatCategoryName = (name: string) => {
        return name
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    if (loading) {
        return (
            <div>
                <div className="flex items-center gap-2 mb-6">
                    <div className="h-5 w-24 skeleton rounded" />
                    <span className="text-text-muted">/</span>
                    <div className="h-5 w-32 skeleton rounded" />
                </div>
                <div className="space-y-3">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <ProductRowSkeleton key={i} />
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return <ErrorState message={error} onRetry={() => fetchProducts(true)} />;
    }

    return (
        <div>
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm mb-6">
                <button
                    onClick={() => navigate('/catalogue')}
                    className="text-text-secondary hover:text-primary-600 transition-colors"
                >
                    Catalogue
                </button>
                <svg className="w-4 h-4 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <span className="text-text-primary font-medium">
                    {formatCategoryName(category || '')}
                </span>
            </nav>

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-xl font-semibold text-text-primary mb-1">
                        {formatCategoryName(category || '')}
                    </h1>
                    <p className="text-sm text-text-secondary">
                        Showing {sortedProducts.length} of {total} products
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    {/* Sort Dropdown */}
                    <div className="relative">
                        <select
                            value={`${sortField}-${sortOrder}`}
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
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Products */}
            {sortedProducts.length === 0 ? (
                <EmptyState
                    title="No products in this category"
                    message="This category is currently empty. Check back later for new products."
                    actionLabel="Browse Categories"
                    onAction={() => navigate('/catalogue')}
                />
            ) : viewMode === 'list' ? (
                <div className="space-y-3">
                    {sortedProducts.map((product) => (
                        <ProductRow key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {sortedProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}

            {/* Loading more */}
            {loadingMore && (
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
            {sortedProducts.length > 0 && (
                <LoadMoreButton onClick={handleLoadMore} loading={loadingMore} hasMore={hasMore} />
            )}
        </div>
    );
};

export default CategoryProductsPage;
