import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      root: {
        color: '#1DA1F2 ',
        fontWeight: 700,
        borderRadius: '35px',
        textTransform: 'none',
        '&$disabled': {
          background: '#1DA1F2 !important',
          color: 'white !important',
          opacity: '.5',
        },
      },
    },

    MuiMenuItem: {
      root: {
        backgroundColor: '#15202B',
        border: 'none',
        '&$selected': {
          backgroundColor: '#1DA1F2',
        },
        '&:hover': {
          backgroundColor: '#1DA1F2',
        },
      },
    },
    MuiIconButton: {
      root: {
        '&:hover': {
          backgroundColor: '#1e3954',
          color: '#1DA1F2 !important',
        },
      },
    },
  },
  palette: {
    primary: {
      main: '#1DA1F2',
    },
    secondary: {
      main: '#E0245E',
    },
    background: {
      default: '#15202B',
    },
    text: {
      primary: '#fff',
      secondary: '#8899A6',
    },
  },
});
