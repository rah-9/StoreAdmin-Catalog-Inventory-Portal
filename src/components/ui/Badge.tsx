import React from 'react';
import { StockStatus } from '../../types';

interface BadgeProps {
    variant?: 'success' | 'warning' | 'danger' | 'info' | 'default';
    children: React.ReactNode;
    className?: string;
}

const Badge: React.FC<BadgeProps> = ({ variant = 'default', children, className = '' }) => {
    const baseStyles = 'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium';

    const variantStyles = {
        success: 'bg-green-50 text-green-700 border border-green-200',
        warning: 'bg-amber-50 text-amber-700 border border-amber-200',
        danger: 'bg-red-50 text-red-700 border border-red-200',
        info: 'bg-blue-50 text-blue-700 border border-blue-200',
        default: 'bg-gray-50 text-gray-700 border border-gray-200',
    };

    return (
        <span className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
            {children}
        </span>
    );
};

interface StockBadgeProps {
    status: StockStatus;
    stock?: number;
}

export const StockBadge: React.FC<StockBadgeProps> = ({ status, stock }) => {
    const config = {
        'in-stock': { variant: 'success' as const, label: 'In Stock' },
        'low-stock': { variant: 'warning' as const, label: 'Low Stock' },
        'out-of-stock': { variant: 'danger' as const, label: 'Out of Stock' },
    };

    const { variant, label } = config[status];

    return (
        <Badge variant={variant}>
            <span className="w-1.5 h-1.5 rounded-full mr-1.5 bg-current opacity-60" />
            {label}{stock !== undefined && status !== 'out-of-stock' && ` (${stock})`}
        </Badge>
    );
};

export default Badge;
