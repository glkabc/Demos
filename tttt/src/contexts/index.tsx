import { ReactQueryProvider } from './react-query-context';
import { BrowserRouter as Router } from 'react-router-dom';
import { MUIStylesProvider } from './mui-styles-context';
import { EmotionThemeProvider } from './emotion-theme-context';
import { MUIThemeProvider } from './mui-theme-context';
import { SnackbarProvider } from 'notistack';
import { UserProvider } from './user-context';

function AppProvider({ children }: { children?: React.ReactNode }) {
  return (
    <ReactQueryProvider>
      <Router>
        <MUIStylesProvider>
          <SnackbarProvider>
            <UserProvider>
              <MUIThemeProvider>
                <EmotionThemeProvider>{children}</EmotionThemeProvider>
              </MUIThemeProvider>
            </UserProvider>
          </SnackbarProvider>
        </MUIStylesProvider>
      </Router>
    </ReactQueryProvider>
  );
}

export default AppProvider;
