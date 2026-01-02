import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

interface LayoutProps {
    children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen bg-gradient-hero">
            {/* Sidebar */}
            <Sidebar />

            {/* Main content area */}
            <div className="ml-64">
                {/* Header */}
                <Header />

                {/* Page content */}
                <main className="p-6">
                    {children || <Outlet />}
                </main>
            </div>
        </div>
    );
};

export default Layout;
