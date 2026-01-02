import React from 'react';
import Button from '../ui/Button';

interface LoadMoreButtonProps {
    onClick: () => void;
    loading: boolean;
    hasMore: boolean;
}

const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({
    onClick,
    loading,
    hasMore,
}) => {
    if (!hasMore) {
        return (
            <div className="text-center py-8">
                <p className="text-sm text-text-muted">You've reached the end of the list</p>
            </div>
        );
    }

    return (
        <div className="flex justify-center py-8">
            <Button
                variant="secondary"
                size="lg"
                onClick={onClick}
                isLoading={loading}
                className="min-w-[180px]"
            >
                {loading ? 'Loading...' : 'Load More Products'}
            </Button>
        </div>
    );
};

export default LoadMoreButton;
