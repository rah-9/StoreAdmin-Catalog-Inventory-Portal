import React, { memo } from 'react';
import { Product, getStockStatus } from '../../types';
import { useNavigate } from 'react-router-dom';
import { StockBadge } from '../ui/Badge';

interface ProductRowProps {
    product: Product;
}

const ProductRow: React.FC<ProductRowProps> = memo(({ product }) => {
    const navigate = useNavigate();
    const stockStatus = getStockStatus(product.stock);
    const discountedPrice = product.price * (1 - product.discountPercentage / 100);

    const handleClick = () => {
        navigate(`/product/${product.id}`);
    };

    return (
        <div
            onClick={handleClick}
            className="bg-white rounded-xl p-4 flex items-center gap-4 border border-gray-100/50 cursor-pointer hover:shadow-soft hover:border-primary-100 transition-all duration-200 group"
        >
            {/* Product Image */}
            <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-lavender-50 to-primary-50 flex-shrink-0 overflow-hidden">
                <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-full object-contain p-1 group-hover:scale-110 transition-transform duration-300"
                    loading="lazy"
                />
            </div>

            {/* Product Info */}
            <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-text-primary truncate group-hover:text-primary-600 transition-colors">
                    {product.title}
                </h3>
                <p className="text-xs text-text-muted mt-0.5">
                    {product.brand || 'Generic'} • {product.category}
                </p>
            </div>

            {/* Category */}
            <div className="hidden md:block w-28">
                <span className="px-2.5 py-1 bg-lavender-50 text-primary-600 text-xs font-medium rounded-lg">
                    {product.category}
                </span>
            </div>

            {/* Price */}
            <div className="hidden lg:block w-24 text-right">
                <div className="text-sm font-semibold text-text-primary">
                    ${discountedPrice.toFixed(2)}
                </div>
                {product.discountPercentage > 0 && (
                    <div className="text-xs text-text-muted line-through">
                        ${product.price.toFixed(2)}
                    </div>
                )}
            </div>

            {/* Stock Badge */}
            <div className="w-24 flex justify-center">
                <StockBadge status={stockStatus} stock={product.stock} />
            </div>

            {/* Rating */}
            <div className="hidden xl:flex items-center gap-1 w-16">
                <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-sm font-medium text-text-primary">{product.rating}</span>
            </div>

            {/* Arrow */}
            <svg className="w-5 h-5 text-text-muted group-hover:text-primary-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
        </div>
    );
});

ProductRow.displayName = 'ProductRow';

export default ProductRow;
