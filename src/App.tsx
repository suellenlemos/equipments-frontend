import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { createTheme, ThemeProvider } from '@mui/material';
import { deepmerge } from '@mui/utils';
import { Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Router } from './Router';

const muiTheme = createTheme();
const chakraTheme = extendTheme();

const theme = deepmerge(chakraTheme, muiTheme);

export const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <ChakraProvider>
          <ToastContainer
            position="top-right"
            autoClose={7000}
            transition={Slide}
            closeOnClick
            pauseOnFocusLoss
            draggable
          />
          <Router />
        </ChakraProvider>
      </ThemeProvider>
    </>
  );
};
