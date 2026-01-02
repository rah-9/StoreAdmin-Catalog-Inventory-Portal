import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import productService from '../services/productService';
import { Product, getStockStatus } from '../types';
import { StockBadge } from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { ProductDetailSkeleton, ProductCardSkeleton } from '../components/ui/Skeleton';
import ErrorState from '../components/common/ErrorState';

const ProductDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [product, setProduct] = useState<Product | null>(null);
    const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    useEffect(() => {
        const fetchProduct = async () => {
            if (!id) return;

            setLoading(true);
            setError(null);

            try {
                const productData = await productService.getProduct(parseInt(id));
                setProduct(productData);

                // Fetch similar products
                const similar = await productService.getSimilarProducts(productData, 6);
                setSimilarProducts(similar);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load product');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
        window.scrollTo(0, 0);
    }, [id]);

    const stockStatus = useMemo(() => {
        return product ? getStockStatus(product.stock) : 'in-stock';
    }, [product]);

    const discountedPrice = useMemo(() => {
        if (!product) return 0;
        return product.price * (1 - product.discountPercentage / 100);
    }, [product]);

    if (loading) {
        return (
            <div>
                <ProductDetailSkeleton />
                <div className="mt-12">
                    <div className="h-6 w-48 skeleton rounded mb-6" />
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <ProductCardSkeleton key={i} />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <ErrorState
                message={error || 'Product not found'}
                onRetry={() => navigate('/inventory')}
            />
        );
    }

    return (
        <div>
            {/* Back Button */}
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-sm text-text-secondary hover:text-primary-600 mb-6 transition-colors"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Inventory
            </button>

            {/* Main Content */}
            <div className="grid lg:grid-cols-2 gap-10">
                {/* Image Gallery */}
                <div>
                    {/* Main Image */}
                    <div className="bg-white rounded-2xl shadow-card border border-gray-100/50 overflow-hidden mb-4">
                        <div className="aspect-square bg-gradient-to-br from-lavender-50 to-primary-50 flex items-center justify-center p-8">
                            <img
                                src={product.images[selectedImageIndex] || product.thumbnail}
                                alt={product.title}
                                className="max-w-full max-h-full object-contain"
                            />
                        </div>
                    </div>

                    {/* Thumbnail Gallery */}
                    {product.images.length > 1 && (
                        <div className="flex gap-3 overflow-x-auto pb-2">
                            {product.images.map((image, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedImageIndex(index)}
                                    className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${selectedImageIndex === index
                                            ? 'border-primary-500 shadow-glow'
                                            : 'border-gray-200 hover:border-primary-300'
                                        }`}
                                >
                                    <img
                                        src={image}
                                        alt={`${product.title} ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Product Info */}
                <div>
                    {/* Category & Brand */}
                    <div className="flex items-center gap-3 mb-3">
                        <span className="px-3 py-1 bg-lavender-100 text-primary-600 text-xs font-medium rounded-lg">
                            {product.category}
                        </span>
                        {product.brand && (
                            <span className="text-sm text-text-muted">{product.brand}</span>
                        )}
                    </div>

                    {/* Title */}
                    <h1 className="text-2xl lg:text-3xl font-bold text-text-primary mb-4">
                        {product.title}
                    </h1>

                    {/* Rating */}
                    <div className="flex items-center gap-3 mb-6">
                        <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <svg
                                    key={star}
                                    className={`w-5 h-5 ${star <= Math.round(product.rating)
                                            ? 'text-amber-400'
                                            : 'text-gray-200'
                                        }`}
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                        </div>
                        <span className="text-sm font-medium text-text-primary">{product.rating}</span>
                        <span className="text-sm text-text-muted">
                            ({product.reviews?.length || 0} reviews)
                        </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-baseline gap-4 mb-6">
                        <span className="text-3xl font-bold text-text-primary">
                            ${discountedPrice.toFixed(2)}
                        </span>
                        {product.discountPercentage > 0 && (
                            <>
                                <span className="text-lg text-text-muted line-through">
                                    ${product.price.toFixed(2)}
                                </span>
                                <span className="px-2 py-1 bg-gradient-primary text-white text-sm font-semibold rounded-lg">
                                    -{Math.round(product.discountPercentage)}% OFF
                                </span>
                            </>
                        )}
                    </div>

                    {/* Stock Status */}
                    <div className="flex items-center gap-4 mb-6">
                        <StockBadge status={stockStatus} stock={product.stock} />
                        <span className="text-sm text-text-muted">
                            {product.availabilityStatus}
                        </span>
                    </div>

                    {/* Description */}
                    <div className="mb-8">
                        <h3 className="text-sm font-semibold text-text-primary mb-2">Description</h3>
                        <p className="text-sm text-text-secondary leading-relaxed">
                            {product.description}
                        </p>
                    </div>

                    {/* Product Details */}
                    <Card className="mb-6">
                        <h3 className="text-sm font-semibold text-text-primary mb-4">Product Details</h3>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <span className="text-text-muted">SKU</span>
                                <p className="font-medium text-text-primary">{product.sku}</p>
                            </div>
                            <div>
                                <span className="text-text-muted">Weight</span>
                                <p className="font-medium text-text-primary">{product.weight}g</p>
                            </div>
                            <div>
                                <span className="text-text-muted">Dimensions</span>
                                <p className="font-medium text-text-primary">
                                    {product.dimensions.width} × {product.dimensions.height} × {product.dimensions.depth} cm
                                </p>
                            </div>
                            <div>
                                <span className="text-text-muted">Min Order Qty</span>
                                <p className="font-medium text-text-primary">{product.minimumOrderQuantity}</p>
                            </div>
                        </div>
                    </Card>

                    {/* Policies */}
                    <div className="flex flex-wrap gap-3">
                        <div className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-xl text-sm">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            {product.warrantyInformation}
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-xl text-sm">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                            {product.shippingInformation}
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-lavender-50 text-primary-700 rounded-xl text-sm">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z" />
                            </svg>
                            {product.returnPolicy}
                        </div>
                    </div>
                </div>
            </div>

            {/* Similar Products */}
            {similarProducts.length > 0 && (
                <div className="mt-12">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-text-primary">
                            Browse Similar Products
                        </h2>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => navigate(`/catalogue/${product.category}`)}
                        >
                            View all in {product.category}
                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Button>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {similarProducts.map((similar) => (
                            <div
                                key={similar.id}
                                onClick={() => navigate(`/product/${similar.id}`)}
                                className="bg-white rounded-xl shadow-card border border-gray-100/50 overflow-hidden cursor-pointer card-hover group"
                            >
                                <div className="h-28 bg-gradient-to-br from-lavender-50 to-primary-50 overflow-hidden">
                                    <img
                                        src={similar.thumbnail}
                                        alt={similar.title}
                                        className="w-full h-full object-contain p-2 group-hover:scale-110 transition-transform duration-300"
                                        loading="lazy"
                                    />
                                </div>
                                <div className="p-3">
                                    <h3 className="text-xs font-medium text-text-primary line-clamp-2 mb-1 group-hover:text-primary-600 transition-colors">
                                        {similar.title}
                                    </h3>
                                    <p className="text-sm font-bold text-text-primary">
                                        ${(similar.price * (1 - similar.discountPercentage / 100)).toFixed(2)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetailPage;
