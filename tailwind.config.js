module.exports = {
    theme: {
        fontSize: {
            'xs': '.75rem',
            'sm': '.875rem',
            'tiny': '.875rem',
            'base': '1rem',
            'lg': '1.125rem',
            'xl': '1.25rem',
            '2xl': '1.5rem',
            '3xl': '1.875rem',
            '4xl': '2.25rem',
            '5xl': '3rem',
            '6xl': '4rem',
            '7xl': '5rem',
        },
        spacing: {
            'sm': '8px',
            'md': '16px',
            'lg': '24px',
            'xl': '48px',
        },
        height: {
            '1/10': '10%',
            '1/5': '20%',
            '1/4': '25%',
            '1/2': '50%',
            '3/4': '75%',
        },
        extend: {}
    },
    variants: {
        backgroundColor: [ 'responsive', 'hover', 'focus', 'active', 'group-hover' ],
        height: [ 'responsive', 'hover', 'focus' ],
        textTransform: [ 'responsive', 'hover', 'focus' ],
        fontSize: [ 'responsive', 'hover', 'focus' ],
        alignItems: [ 'responsive', 'hover', 'focus' ],
        justifyContent: [ 'responsive', 'hover', 'focus' ],
    },
    plugins: []
}
