import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Product, getStockStatus } from '../../types';
import { StockBadge } from '../ui/Badge';

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = memo(({ product }) => {
    const navigate = useNavigate();
    const stockStatus = getStockStatus(product.stock);

    const handleClick = () => {
        navigate(`/product/${product.id}`);
    };

    const discountedPrice = product.price * (1 - product.discountPercentage / 100);

    return (
        <div
            onClick={handleClick}
            className="bg-white rounded-2xl shadow-card border border-gray-100/50 overflow-hidden cursor-pointer card-hover group"
        >
            {/* Image Container */}
            <div className="relative h-44 bg-gradient-to-br from-lavender-50 to-primary-50 overflow-hidden">
                <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                />
                {product.discountPercentage > 0 && (
                    <div className="absolute top-3 left-3 px-2 py-1 bg-gradient-primary text-white text-xs font-semibold rounded-lg shadow-soft">
                        -{Math.round(product.discountPercentage)}%
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-4">
                {/* Category */}
                <p className="text-xs text-text-muted uppercase tracking-wide mb-1">
                    {product.category}
                </p>

                {/* Title */}
                <h3 className="text-sm font-semibold text-text-primary line-clamp-2 mb-2 group-hover:text-primary-600 transition-colors">
                    {product.title}
                </h3>

                {/* Brand */}
                <p className="text-xs text-text-secondary mb-3">
                    {product.brand || 'Generic'}
                </p>

                {/* Price and Stock */}
                <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-1.5">
                        <span className="text-lg font-bold text-text-primary">
                            ${discountedPrice.toFixed(2)}
                        </span>
                        {product.discountPercentage > 0 && (
                            <span className="text-xs text-text-muted line-through">
                                ${product.price.toFixed(2)}
                            </span>
                        )}
                    </div>
                    <StockBadge status={stockStatus} />
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mt-3">
                    <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                                key={star}
                                className={`w-3.5 h-3.5 ${star <= Math.round(product.rating)
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
                    <span className="text-xs text-text-muted">({product.rating})</span>
                </div>
            </div>
        </div>
    );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;
