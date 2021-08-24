import { ThemeProvider } from '@material-ui/core/styles';
import theme from 'styles/theme';

function MUIThemeProvider({ children }: { children: React.ReactNode }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export { MUIThemeProvider };
