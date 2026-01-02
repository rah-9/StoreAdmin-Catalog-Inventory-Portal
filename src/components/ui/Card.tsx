import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    hover?: boolean;
    padding?: 'none' | 'sm' | 'md' | 'lg';
    onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
    children,
    className = '',
    hover = false,
    padding = 'md',
    onClick,
}) => {
    const baseStyles = 'bg-white rounded-2xl shadow-card border border-gray-100/50';

    const paddingStyles = {
        none: '',
        sm: 'p-3',
        md: 'p-5',
        lg: 'p-6',
    };

    const hoverStyles = hover
        ? 'cursor-pointer card-hover hover:border-primary-100'
        : '';

    return (
        <div
            className={`${baseStyles} ${paddingStyles[padding]} ${hoverStyles} ${className}`}
            onClick={onClick}
            role={onClick ? 'button' : undefined}
            tabIndex={onClick ? 0 : undefined}
        >
            {children}
        </div>
    );
};

export default Card;
