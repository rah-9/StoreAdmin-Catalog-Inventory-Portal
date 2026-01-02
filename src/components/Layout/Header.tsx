import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useProductContext } from '../../context/ProductContext';
import useDebounce from '../../hooks/useDebounce';

interface HeaderProps {
    title?: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { setSearch } = useProductContext();
    const [searchValue, setSearchValue] = useState('');

    const debouncedSearch = useDebounce(searchValue, 300);

    // Update search context when debounced value changes
    React.useEffect(() => {
        if (location.pathname === '/inventory' || location.pathname.startsWith('/catalogue/')) {
            setSearch(debouncedSearch);
        }
    }, [debouncedSearch, location.pathname, setSearch]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    const handleSearchFocus = () => {
        if (location.pathname !== '/inventory') {
            navigate('/inventory');
        }
    };

    const getPageTitle = (): string => {
        if (title) return title;

        switch (location.pathname) {
            case '/':
                return 'Welcome';
            case '/inventory':
                return 'Inventory Overview';
            case '/catalogue':
                return 'Catalogue';
            default:
                if (location.pathname.startsWith('/product/')) return 'Product Details';
                if (location.pathname.startsWith('/catalogue/')) return 'Category Products';
                return 'StoreAdmin';
        }
    };

    return (
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-lg border-b border-gray-100/50">
            <div className="flex items-center justify-between px-6 py-4">
                {/* Page Title */}
                <div>
                    <h1 className="text-xl font-semibold text-text-primary">{getPageTitle()}</h1>
                    <p className="text-sm text-text-muted mt-0.5">
                        {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                </div>

                {/* Right side */}
                <div className="flex items-center gap-4">
                    {/* Search */}
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="w-4 h-4 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchValue}
                            onChange={handleSearchChange}
                            onFocus={handleSearchFocus}
                            className="w-64 pl-10 pr-4 py-2.5 text-sm bg-surface-muted border border-transparent rounded-xl focus:outline-none focus:border-primary-300 focus:bg-white focus:ring-2 focus:ring-primary-100 transition-all duration-200"
                        />
                    </div>

                    {/* Notifications */}
                    <button className="relative p-2.5 rounded-xl bg-surface-muted hover:bg-surface-hover transition-colors">
                        <svg className="w-5 h-5 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
                    </button>

                    {/* User Avatar */}
                    <button className="flex items-center gap-3 pl-2 pr-4 py-1.5 rounded-xl hover:bg-surface-hover transition-colors">
                        <div className="w-9 h-9 rounded-full bg-gradient-primary flex items-center justify-center text-white font-semibold text-sm shadow-soft">
                            SM
                        </div>
                        <div className="text-left hidden lg:block">
                            <p className="text-sm font-medium text-text-primary">Store Manager</p>
                        </div>
                        <svg className="w-4 h-4 text-text-muted hidden lg:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
