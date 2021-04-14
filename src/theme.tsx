import { extendTheme } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';

const fonts = { mono: `'Poppins', monospace` };

const breakpoints = createBreakpoints({
  sm: '40em',
  md: '52em',
  lg: '64em',
  xl: '80em',
});

const theme = extendTheme({
  colors: {
    black: '#16161D',
    mode: {
      light: {
        primaryBg: 'grey.50',
        secondaryBg: 'grey.100',
      },
      dark: {
        primaryBg: 'grey.900',
        secondaryBg: 'grey.800',
      },
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
});

export default theme;
