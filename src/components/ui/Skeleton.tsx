import React from 'react';

interface SkeletonProps {
    className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ className = '' }) => {
    return <div className={`skeleton rounded ${className}`} />;
};

// Product card skeleton
export const ProductCardSkeleton: React.FC = () => (
    <div className="bg-white rounded-2xl shadow-card p-4 border border-gray-100/50">
        <Skeleton className="w-full h-40 rounded-xl mb-4" />
        <Skeleton className="h-4 w-3/4 mb-2" />
        <Skeleton className="h-3 w-1/2 mb-3" />
        <div className="flex justify-between items-center">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-6 w-16 rounded-full" />
        </div>
    </div>
);

// Product row skeleton for table view
export const ProductRowSkeleton: React.FC = () => (
    <div className="bg-white rounded-xl p-4 flex items-center gap-4 border border-gray-100/50">
        <Skeleton className="w-16 h-16 rounded-lg flex-shrink-0" />
        <div className="flex-1 min-w-0">
            <Skeleton className="h-4 w-48 mb-2" />
            <Skeleton className="h-3 w-32" />
        </div>
        <Skeleton className="h-4 w-20 hidden md:block" />
        <Skeleton className="h-4 w-16 hidden lg:block" />
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-4 w-12" />
    </div>
);

// Category card skeleton
export const CategoryCardSkeleton: React.FC = () => (
    <div className="bg-white rounded-2xl shadow-card p-5 border border-gray-100/50">
        <Skeleton className="w-full h-32 rounded-xl mb-4" />
        <Skeleton className="h-5 w-3/4 mx-auto" />
    </div>
);

// Product detail skeleton
export const ProductDetailSkeleton: React.FC = () => (
    <div className="grid lg:grid-cols-2 gap-8">
        <div>
            <Skeleton className="w-full aspect-square rounded-2xl" />
            <div className="flex gap-3 mt-4">
                {[1, 2, 3, 4].map((i) => (
                    <Skeleton key={i} className="w-20 h-20 rounded-lg" />
                ))}
            </div>
        </div>
        <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-5 w-1/2" />
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-20 w-full" />
            <div className="flex gap-3">
                <Skeleton className="h-6 w-24 rounded-full" />
                <Skeleton className="h-6 w-24 rounded-full" />
            </div>
        </div>
    </div>
);

export default Skeleton;
