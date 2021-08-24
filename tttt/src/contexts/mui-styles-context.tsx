import { StylesProvider } from '@material-ui/core/styles';

function MUIStylesProvider({ children }: { children: React.ReactNode }) {
  return <StylesProvider injectFirst>{children}</StylesProvider>;
}

export { MUIStylesProvider };
