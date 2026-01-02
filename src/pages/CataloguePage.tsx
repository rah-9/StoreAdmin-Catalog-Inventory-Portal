import React, { useEffect, useState } from 'react';
import { useProductContext } from '../context/ProductContext';
import CategoryCard from '../components/categories/CategoryCard';
import { CategoryCardSkeleton } from '../components/ui/Skeleton';
import ErrorState from '../components/common/ErrorState';
import productService from '../services/productService';
import { Product } from '../types';

interface CategoryWithThumbnail {
    slug: string;
    name: string;
    url: string;
    thumbnail?: string;
}

const CataloguePage: React.FC = () => {
    const { categories, categoriesLoading } = useProductContext();
    const [categoriesWithThumbnails, setCategoriesWithThumbnails] = useState<CategoryWithThumbnail[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchThumbnails = async () => {
            if (categories.length === 0) return;

            setLoading(true);
            try {
                // Fetch first product of each category for thumbnail
                const thumbnailPromises = categories.map(async (cat) => {
                    try {
                        const response = await productService.getProductsByCategory(cat.slug, 1, 0);
                        const firstProduct: Product | undefined = response.products[0];
                        return {
                            ...cat,
                            thumbnail: firstProduct?.thumbnail,
                        };
                    } catch {
                        return { ...cat, thumbnail: undefined };
                    }
                });

                const results = await Promise.all(thumbnailPromises);
                setCategoriesWithThumbnails(results);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load categories');
            } finally {
                setLoading(false);
            }
        };

        fetchThumbnails();
    }, [categories]);

    if (categoriesLoading || loading) {
        return (
            <div>
                <div className="mb-6">
                    <div className="h-6 w-48 skeleton rounded mb-2" />
                    <div className="h-4 w-64 skeleton rounded" />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
                    {Array.from({ length: 12 }).map((_, i) => (
                        <CategoryCardSkeleton key={i} />
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return <ErrorState message={error} onRetry={() => window.location.reload()} />;
    }

    return (
        <div>
            {/* Header */}
            <div className="mb-8">
                <h2 className="text-xl font-semibold text-text-primary mb-2">
                    Browse by Category
                </h2>
                <p className="text-sm text-text-secondary">
                    Explore our {categories.length} product categories to find what you're looking for
                </p>
            </div>

            {/* Categories Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
                {categoriesWithThumbnails.map((category) => (
                    <CategoryCard
                        key={category.slug}
                        category={category}
                        thumbnailUrl={category.thumbnail}
                    />
                ))}
            </div>

            {/* Stats Footer */}
            <div className="mt-12 p-6 bg-white rounded-2xl shadow-card border border-gray-100/50">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                    <div>
                        <p className="text-2xl font-bold text-gradient">{categories.length}</p>
                        <p className="text-sm text-text-muted mt-1">Categories</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-gradient">200+</p>
                        <p className="text-sm text-text-muted mt-1">Products</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-gradient">50+</p>
                        <p className="text-sm text-text-muted mt-1">Brands</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-gradient">24/7</p>
                        <p className="text-sm text-text-muted mt-1">Support</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CataloguePage;
