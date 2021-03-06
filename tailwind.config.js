const displayUtility = ({ addUtilities }) => {
    const display = {
        '.contents': {
            'display': 'contents',
        },
    }
    addUtilities (display, [ 'responsive', 'hover', 'focus' ])
}

const justifySelfUtility = ({ addUtilities }) => {
    const justifySelf = {
        '.justify-self-auto': {
            'justify-self': 'auto',
        },
        '.justify-self-normal': {
            'justify-self': 'normal',
        },
        '.justify-self-stretch': {
            'justify-self': 'stretch',
        },
        '.justify-self-center': {
            'justify-self': 'center',
        },
        '.justify-self-start': {
            'justify-self': 'start',
        },
        '.justify-self-end': {
            'justify-self': 'end',
        },
        '.justify-self-left': {
            'justify-self': 'left',
        },
        '.justify-self-right': {
            'justify-self': 'right',
        },
    }
    addUtilities (justifySelf, [ 'responsive', 'hover', 'focus' ])
}


const COLORS = {
    ORANGE: '#ED8E21',
    ORANGE_DARK: '#B57122',
    BLUE_SOFT: '#2491BF',
    BLUE: '#57CDFF',
    BLUE_DARK: '#052533',
}

const COLORSv2 = {
    ORANGE: '#E83A0E',
    ORANGE_DARK: '#4F1405',
    BLUE_SOFT: '#02507D',
    BLUE: '#022F7D',
    BLUE_DARK: '#012438',
}

module.exports = {
    theme: {
        textColor: {
            'rc-orange': COLORS.ORANGE,
            'rc-orange-dark': COLORS.ORANGE_DARK,
            'rc-blue-soft': COLORS.BLUE_SOFT,
            'rc-blue': COLORS.BLUE,
            'rc-blue-dark': COLORS.BLUE_DARK,
            'rc-v2-orange': COLORSv2.ORANGE,
            'rc-v2-orange-dark': COLORSv2.ORANGE_DARK,
            'rc-v2-blue-soft': COLORSv2.BLUE_SOFT,
            'rc-v2-blue': COLORSv2.BLUE,
            'rc-v2-blue-dark': COLORSv2.BLUE_DARK,
        },
        backgroundColor: {
            'rc-orange': COLORS.ORANGE,
            'rc-orange-dark': COLORS.ORANGE_DARK,
            'rc-blue-soft': COLORS.BLUE_SOFT,
            'rc-blue': COLORS.BLUE,
            'rc-blue-dark': COLORS.BLUE_DARK,
            'rc-v2-orange': COLORSv2.ORANGE,
            'rc-v2-orange-dark': COLORSv2.ORANGE_DARK,
            'rc-v2-blue-soft': COLORSv2.BLUE_SOFT,
            'rc-v2-blue': COLORSv2.BLUE,
            'rc-v2-blue-dark': COLORSv2.BLUE_DARK,
        },
        borderColor: {
            'rc-orange': COLORS.ORANGE,
            'rc-orange-dark': COLORS.ORANGE_DARK,
            'rc-blue-soft': COLORS.BLUE_SOFT,
            'rc-blue': COLORS.BLUE,
            'rc-blue-dark': COLORS.BLUE_DARK,
            'rc-v2-orange': COLORSv2.ORANGE,
            'rc-v2-orange-dark': COLORSv2.ORANGE_DARK,
            'rc-v2-blue-soft': COLORSv2.BLUE_SOFT,
            'rc-v2-blue': COLORSv2.BLUE,
            'rc-v2-blue-dark': COLORSv2.BLUE_DARK,
        },
        boxShadow: {
            'left': '-4px 0 4px -4px rgba(0, 0, 0, .25)',
            'top': '0 -4px 4px -4px rgba(0, 0, 0, .25)',
            'right': '4px 0 4px -4px rgba(0, 0, 0, .25)',
            'bottom': '0px 4px 4px rgba(0, 0, 0, 0.25)',
        },
        zIndex: {
            'inf': '2147483647',
            'neg': '-1',
            '100': '100',
            '200': '200'
        },
        spacing: {
            '1/2': '50%',
            '1/3': '33.333333%',
            '2/3': '66.666667%',
            '1/4': '25%',
            '2/4': '50%',
            '3/4': '75%',
            '1/5': '20%',
            '2/5': '40%',
            '3/5': '60%',
            '4/5': '80%',
            '1/6': '16.666667%',
            '2/6': '33.333333%',
            '3/6': '50%',
            '4/6': '66.666667%',
            '5/6': '83.333333%',
            '1/12': '8.333333%',
            '2/12': '16.666667%',
            '3/12': '25%',
            '4/12': '33.333333%',
            '5/12': '41.666667%',
            '6/12': '50%',
            '7/12': '58.333333%',
            '8/12': '66.666667%',
            '9/12': '75%',
            '10/12': '83.333333%',
            '11/12': '91.666667%',
            '7/25': '28%',
            '48/50': '96%',
            '9/10': '90%',
        },
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
            '8xl': '6rem',
            '9xl': '7rem',
            '10xl': '8rem',
            '11xl': '9rem',
        },
        width: {
            '045': '45rem',
            '026': '26rem',
            '031': '31rem',
            '027': '27rem',
            '025': '25rem',
            '022': '22rem',
            '021': '21.5rem',
            '019': '19rem',
            '018': '18.5rem',
            '012': '12rem',
            '08': '8rem',
            'header': '11.25rem',
            '2header': '22.50rem',
        },
        height: {
            '045': '45rem',
            '026': '26rem',
            '031': '31rem',
            '027': '27rem',
            '025': '25rem',
            '022': '22rem',
            '021': '21.5rem',
            '019': '19rem',
            '018': '18.5rem',
            '012': '12rem',
            '08': '8rem',
            'header': '11.25rem',
            '2header': '22.50rem',
        },
        fontFamily: {
            "Righteous": [ 'Righteous' ],
        },
        gridTemplateColumns: {
            '13': 'repeat(13, minmax(0, 1fr))',
            '14': 'repeat(14, minmax(0, 1fr))',
            '15': 'repeat(15, minmax(0, 1fr))',
            '16': 'repeat(16, minmax(0, 1fr))',
            '17': 'repeat(17, minmax(0, 1fr))',
            '18': 'repeat(18, minmax(0, 1fr))',
            '19': 'repeat(19, minmax(0, 1fr))',
            '20': 'repeat(20, minmax(0, 1fr))',
            '21': 'repeat(21, minmax(0, 1fr))',
            '22': 'repeat(22, minmax(0, 1fr))',
            '23': 'repeat(23, minmax(0, 1fr))',
            '24': 'repeat(24, minmax(0, 1fr))',
        },
        display: {
            'contents': 'contents'
        },
        extend: {},
    },
    variants: {
        backgroundColor: [ 'responsive', 'hover', 'focus', 'active', 'group-hover' ],
        height: [ 'responsive', 'hover', 'focus' ],
        textTransform: [ 'responsive', 'hover', 'focus' ],
        fontSize: [ 'responsive', 'hover', 'focus' ],
        alignItems: [ 'responsive', 'hover', 'focus' ],
        justifyContent: [ 'responsive', 'hover', 'focus' ],
        borderColor: [ 'responsive', 'hover', 'focus', 'focus-within' ],
        borderStyle: [ 'responsive', 'hover', 'focus' ],
        borderWidth: [ 'responsive', 'hover', 'focus' ],
        spacing: [ 'responsive', 'hover', 'focus', 'focus-within' ],
        outline: [ 'focus', 'responsive', 'hover' ],
        zIndex: [ 'responsive', 'hover', 'focus', 'focus-within' ],
        boxShadow: [ 'responsive', 'hover', 'focus', 'active', 'group-hover' ],
        textColor: [ 'responsive', 'hover', 'focus', 'active', 'group-hover' ],
        inset: [ 'responsive', 'hover', 'focus' ],
        fontFamily: [ 'responsive', 'hover', 'focus' ],
        margin: [ 'responsive', 'hover', 'focus' ],
        padding: [ 'responsive', 'hover', 'focus' ],
    },
    plugins: [
        displayUtility,
        justifySelfUtility,
    ]
}
