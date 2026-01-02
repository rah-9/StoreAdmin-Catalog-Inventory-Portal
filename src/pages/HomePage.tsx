import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const HomePage: React.FC = () => {
    const navigate = useNavigate();

    const features = [
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
            ),
            title: 'Real-time Analytics',
            description: 'Track inventory levels and sales performance in real-time.',
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
            ),
            title: 'Smart Categories',
            description: 'Organize products with intelligent categorization system.',
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            ),
            title: 'Quick Search',
            description: 'Find any product instantly with powerful search.',
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            title: 'Stock Alerts',
            description: 'Never run out of stock with smart notifications.',
        },
    ];

    return (
        <div className="max-w-6xl mx-auto">
            {/* Hero Section */}
            <div className="relative overflow-hidden rounded-3xl bg-white shadow-elevated mb-8">
                {/* Background gradient decoration */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-lavender-200/50 to-primary-200/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-primary-200/30 to-lavender-200/30 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

                <div className="relative px-8 py-16 lg:px-16 lg:py-20">
                    <div className="max-w-2xl">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-lavender-100 text-primary-600 text-sm font-medium mb-6">
                            <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
                            Your inventory, simplified
                        </div>

                        {/* Heading */}
                        <h1 className="text-4xl lg:text-5xl font-bold text-text-primary leading-tight mb-4">
                            Manage your store
                            <span className="text-gradient"> inventory</span> with ease
                        </h1>

                        {/* Subheading */}
                        <p className="text-lg text-text-secondary mb-8 leading-relaxed">
                            A modern dashboard designed for retail managers. Track products, monitor stock levels, and explore your catalogue — all in one place.
                        </p>

                        {/* CTAs */}
                        <div className="flex flex-wrap gap-4">
                            <Button
                                variant="primary"
                                size="lg"
                                onClick={() => navigate('/inventory')}
                                className="shadow-glow"
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                </svg>
                                Inventory Overview
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                onClick={() => navigate('/catalogue')}
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                                Catalogue Overview
                            </Button>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-lavender-100">
                        <div>
                            <p className="text-3xl font-bold text-gradient">200+</p>
                            <p className="text-sm text-text-muted mt-1">Products tracked</p>
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-gradient">24</p>
                            <p className="text-sm text-text-muted mt-1">Categories</p>
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-gradient">99%</p>
                            <p className="text-sm text-text-muted mt-1">Stock accuracy</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Grid */}
            <div className="mb-8">
                <h2 className="text-xl font-semibold text-text-primary mb-6">What you can do</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
                    {features.map((feature, index) => (
                        <Card key={index} hover className="group">
                            <div className="w-12 h-12 rounded-xl bg-lavender-100 text-primary-600 flex items-center justify-center mb-4 group-hover:bg-gradient-primary group-hover:text-white transition-all duration-300">
                                {feature.icon}
                            </div>
                            <h3 className="font-semibold text-text-primary mb-2">{feature.title}</h3>
                            <p className="text-sm text-text-secondary leading-relaxed">{feature.description}</p>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-2 gap-6">
                <Card
                    hover
                    onClick={() => navigate('/inventory')}
                    className="flex items-center gap-5 group cursor-pointer"
                >
                    <div className="w-14 h-14 rounded-2xl bg-gradient-primary flex items-center justify-center flex-shrink-0 shadow-glow">
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                    </div>
                    <div className="flex-1">
                        <h3 className="font-semibold text-text-primary group-hover:text-primary-600 transition-colors">
                            View Full Inventory
                        </h3>
                        <p className="text-sm text-text-muted mt-1">
                            Browse all products with sorting and filtering
                        </p>
                    </div>
                    <svg className="w-5 h-5 text-text-muted group-hover:text-primary-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </Card>

                <Card
                    hover
                    onClick={() => navigate('/catalogue')}
                    className="flex items-center gap-5 group cursor-pointer"
                >
                    <div className="w-14 h-14 rounded-2xl bg-gradient-secondary flex items-center justify-center flex-shrink-0">
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                        </svg>
                    </div>
                    <div className="flex-1">
                        <h3 className="font-semibold text-text-primary group-hover:text-primary-600 transition-colors">
                            Explore Categories
                        </h3>
                        <p className="text-sm text-text-muted mt-1">
                            Discover products organized by category
                        </p>
                    </div>
                    <svg className="w-5 h-5 text-text-muted group-hover:text-primary-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </Card>
            </div>
        </div>
    );
};

export default HomePage;
