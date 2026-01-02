import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Category } from '../../types';

interface CategoryCardProps {
    category: Category;
    thumbnailUrl?: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, thumbnailUrl }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/catalogue/${category.slug}`);
    };

    // Format category name (capitalize each word)
    const formatName = (name: string) => {
        return name
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    return (
        <div
            onClick={handleClick}
            className="bg-white rounded-2xl shadow-card border border-gray-100/50 overflow-hidden cursor-pointer card-hover group"
        >
            {/* Image */}
            <div className="relative h-36 bg-gradient-to-br from-lavender-50 to-primary-50 overflow-hidden">
                {thumbnailUrl ? (
                    <img
                        src={thumbnailUrl}
                        alt={category.name}
                        className="w-full h-full object-contain p-6 group-hover:scale-110 transition-transform duration-300"
                        loading="lazy"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <svg className="w-12 h-12 text-primary-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                    </div>
                )}

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Content */}
            <div className="p-4 text-center">
                <h3 className="text-sm font-semibold text-text-primary group-hover:text-primary-600 transition-colors">
                    {formatName(category.name)}
                </h3>
                <p className="text-xs text-text-muted mt-1">
                    View products →
                </p>
            </div>
        </div>
    );
};

export default CategoryCard;
