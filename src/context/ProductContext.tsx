import React, { createContext, useContext, useState, useCallback, useEffect, useMemo } from 'react';
import { Product, ProductFilters, Category, SortField, SortOrder } from '../types';
import productService from '../services/productService';

interface ProductContextType {
    // State
    products: Product[];
    loading: boolean;
    error: string | null;
    hasMore: boolean;
    filters: ProductFilters;
    categories: Category[];
    categoriesLoading: boolean;
    total: number;

    // Actions
    setSearch: (search: string) => void;
    setCategory: (category: string | null) => void;
    setSorting: (field: SortField, order: SortOrder) => void;
    loadMore: () => Promise<void>;
    refreshProducts: () => Promise<void>;
    clearError: () => void;
}

const defaultFilters: ProductFilters = {
    search: '',
    category: null,
    sortField: 'title',
    sortOrder: 'asc',
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

const ITEMS_PER_PAGE = 20;

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [hasMore, setHasMore] = useState(true);
    const [total, setTotal] = useState(0);
    const [skip, setSkip] = useState(0);
    const [filters, setFilters] = useState<ProductFilters>(defaultFilters);
    const [categories, setCategories] = useState<Category[]>([]);
    const [categoriesLoading, setCategoriesLoading] = useState(false);

    // Fetch categories on mount
    useEffect(() => {
        const fetchCategories = async () => {
            setCategoriesLoading(true);
            try {
                const data = await productService.getCategories();
                setCategories(data);
            } catch (err) {
                console.error('Failed to fetch categories:', err);
            } finally {
                setCategoriesLoading(false);
            }
        };
        fetchCategories();
    }, []);

    // Fetch products based on current filters
    const fetchProducts = useCallback(async (reset: boolean = false) => {
        setLoading(true);
        setError(null);

        const currentSkip = reset ? 0 : skip;

        try {
            let response;

            if (filters.search) {
                response = await productService.searchProducts(filters.search, ITEMS_PER_PAGE, currentSkip);
            } else if (filters.category) {
                response = await productService.getProductsByCategory(filters.category, ITEMS_PER_PAGE, currentSkip);
            } else {
                response = await productService.getProducts(ITEMS_PER_PAGE, currentSkip);
            }

            const newProducts = response.products;

            if (reset) {
                setProducts(newProducts);
                setSkip(ITEMS_PER_PAGE);
            } else {
                setProducts(prev => [...prev, ...newProducts]);
                setSkip(prev => prev + ITEMS_PER_PAGE);
            }

            setTotal(response.total);
            setHasMore(currentSkip + newProducts.length < response.total);
        } catch (err: unknown) {
            if (err && typeof err === 'object' && 'cancelled' in err) {
                // Request was cancelled, ignore
                return;
            }
            setError(err instanceof Error ? err.message : 'Failed to fetch products');
        } finally {
            setLoading(false);
        }
    }, [filters.search, filters.category, skip]);

    // Refresh products when filters change
    useEffect(() => {
        fetchProducts(true);
    }, [filters.search, filters.category]);

    // Client-side sorting
    const sortedProducts = useMemo(() => {
        const sorted = [...products].sort((a, b) => {
            const field = filters.sortField;
            const order = filters.sortOrder;

            let comparison = 0;
            if (field === 'title') {
                comparison = a.title.localeCompare(b.title);
            } else if (field === 'price') {
                comparison = a.price - b.price;
            }

            return order === 'asc' ? comparison : -comparison;
        });

        return sorted;
    }, [products, filters.sortField, filters.sortOrder]);

    // Actions
    const setSearch = useCallback((search: string) => {
        setFilters(prev => ({ ...prev, search }));
        setSkip(0);
    }, []);

    const setCategory = useCallback((category: string | null) => {
        setFilters(prev => ({ ...prev, category, search: '' }));
        setSkip(0);
    }, []);

    const setSorting = useCallback((field: SortField, order: SortOrder) => {
        setFilters(prev => ({ ...prev, sortField: field, sortOrder: order }));
    }, []);

    const loadMore = useCallback(async () => {
        if (!loading && hasMore) {
            await fetchProducts(false);
        }
    }, [loading, hasMore, fetchProducts]);

    const refreshProducts = useCallback(async () => {
        await fetchProducts(true);
    }, [fetchProducts]);

    const clearError = useCallback(() => {
        setError(null);
    }, []);

    const value: ProductContextType = {
        products: sortedProducts,
        loading,
        error,
        hasMore,
        filters,
        categories,
        categoriesLoading,
        total,
        setSearch,
        setCategory,
        setSorting,
        loadMore,
        refreshProducts,
        clearError,
    };

    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProductContext = (): ProductContextType => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error('useProductContext must be used within a ProductProvider');
    }
    return context;
};

export default ProductContext;
