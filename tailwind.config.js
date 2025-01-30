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
            },
            colors: {
                "neutral": {
                    "50": "#effbfe",
                    "100": "#e0f7fc",
                    "200": "#c1effa",
                    "300": "#a1e7f7",
                    "400": "#82dff5",
                    "500": "#63d7f2",
                    "600": "#4facc2",
                    "700": "#3b8191",
                    "800": "#285661",
                    "900": "#142b30"
                }

            }
        }


    },
    plugins: [require("tailwindcss-animate")],
}