/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#f5f3ff',
                    100: '#ede9fe',
                    200: '#ddd6fe',
                    300: '#c4b5fd',
                    400: '#a78bfa',
                    500: '#8b5cf6',
                    600: '#7c3aed',
                    700: '#6d28d9',
                    800: '#5b21b6',
                    900: '#4c1d95',
                },
                lavender: {
                    50: '#faf8ff',
                    100: '#f3eeff',
                    200: '#e9e0ff',
                    300: '#d6c7fe',
                    400: '#bba0fc',
                    500: '#9f75f8',
                    600: '#8b4eef',
                    700: '#7a3cd9',
                    800: '#6633b5',
                    900: '#542c93',
                },
                accent: {
                    purple: '#a855f7',
                    blue: '#3b82f6',
                    pink: '#ec4899',
                    gradient: 'linear-gradient(135deg, #a855f7 0%, #6366f1 100%)',
                },
                surface: {
                    light: '#ffffff',
                    muted: '#f8fafc',
                    hover: '#f1f5f9',
                },
                text: {
                    primary: '#1e293b',
                    secondary: '#64748b',
                    muted: '#94a3b8',
                }
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
            },
            boxShadow: {
                'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
                'card': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05)',
                'elevated': '0 10px 40px -10px rgba(0, 0, 0, 0.1)',
                'glow': '0 0 20px rgba(139, 92, 246, 0.15)',
            },
            borderRadius: {
                'xl': '1rem',
                '2xl': '1.25rem',
                '3xl': '1.5rem',
            },
            backgroundImage: {
                'gradient-primary': 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
                'gradient-secondary': 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
                'gradient-sidebar': 'linear-gradient(180deg, #f3eeff 0%, #e9e0ff 100%)',
                'gradient-hero': 'linear-gradient(135deg, #faf8ff 0%, #f3eeff 50%, #e9e0ff 100%)',
            },
            animation: {
                'fade-in': 'fadeIn 0.3s ease-out',
                'slide-up': 'slideUp 0.3s ease-out',
                'pulse-soft': 'pulseSoft 2s infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                pulseSoft: {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0.7' },
                },
            },
        },
    },
    plugins: [],
}
