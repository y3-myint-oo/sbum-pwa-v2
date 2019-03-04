import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
    palette: {
      primary:{
        main:"#357a38",
      },
      secondary: {
        main: '#f44336',
      },
    },
    typography: {
      // Use the system font
      fontFamily: 'NotoSansZawgyi'
    },
});

