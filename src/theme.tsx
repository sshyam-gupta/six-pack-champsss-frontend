import { extendTheme } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';

const fonts = { body: 'Poppins', mono: `monospace` };

const breakpoints = createBreakpoints({
  sm: '40em',
  md: '52em',
  lg: '64em',
  xl: '80em',
});

const theme = extendTheme({
  styles: {
    global: props => ({
      '#__next': {
        overflow: 'hidden',
        height: '100vh',
      },
      a: {
        color: props.colorMode === 'dark' ? 'primary.300' : 'primary.500',
      },
    }),
  },

  colors: {
    black: '#16161D',
    mode: {
      light: {
        primaryBg: 'gray.50',
        secondaryBg: '#fff',
      },
      dark: {
        primaryBg: 'gray.900',
        secondaryBg: '#243B53',
      },
    },
    primary: {
      50: '#ffe5ec',
      100: '#fabbc7',
      200: '#f090a5',
      300: '#e86486',
      400: '#e03968',
      500: '#c61f55',
      600: '#9b1639',
      700: '#700d22',
      800: '#45050f',
      900: '#1d0002',
    },
    secondary: {
      50: '#fff8dc',
      100: '#fce9b1',
      200: '#f9db84',
      300: '#f5cc55',
      400: '#f2be26',
      500: '#d9a40d',
      600: '#a88006',
      700: '#785b02',
      800: '#493700',
      900: '#1b1200',
    },
  },
  fonts,
  shadows: {
    default: '0 4px 8px rgba(0,0,0,0.08)',
    hover: '0 8px 24px rgba(0,0,0,0.10)',
    active: '0 6px 20px rgba(0,0,0,0.09)',
    button: '0 2px 4px rgba(0,0,0,0.08)',
    largeHover:
      '0 4px 4.1px rgba(0, 0, 0, 0.012),0 4.9px 5.8px rgba(0, 0, 0, 0.018),0 6.3px 8.4px rgba(0, 0, 0, 0.029),0 8.8px 12.9px rgba(0, 0, 0, 0.05),0 15px 23px rgba(0, 0, 0, 0.11)',
  },
  animations: {
    default: '0.35s cubic-bezier(0.165, 0.84, 0.44, 1)',
    hover: '0.35s cubic-bezier(0.165, 0.84, 0.44, 1)',
    active: '0.35s cubic-bezier(0.165, 0.84, 0.44, 1)',
  },
  breakpoints,
  components: {
    Button: {
      baseStyle: {
        fontWeight: '500',
      },
      variants: {
        solid: props => ({
          bg: 'primary.500',
          color: 'white',
        }),
      },
    },
  },
});

export default theme;
