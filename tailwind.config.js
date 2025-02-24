/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: false,
    corePlugins: {
        preflight: false,
    },
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx,css}',
    ],
    theme: {
        extend: {
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)'
            }
        }
    },
    plugins: [require("tailwindcss-animate")],
}