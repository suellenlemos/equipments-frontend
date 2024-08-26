import { Container, Stack } from '@chakra-ui/react';

import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header';

export const MainLayout = () => {
  return (
    <Container
      data-test-id="Main Container"
      minHeight="100vh"
      minWidth="100%"
      backgroundColor="#fff"
      justifyContent="center"
      alignContent="center"
      padding="0px"
      paddingLeft={{
        'base': '0px',
        'sm': '0px',
        'md': '0px',
        'lg': '70px',
        'xl': '100px',
        '2xl': '100px',
      }}
      paddingRight={{
        'base': '0px',
        'sm': '0px',
        'md': '0px',
        'lg': '70px',
        'xl': '100px',
        '2xl': '100px',
      }}
      paddingBottom={{
        'base': '80px',
        'sm': '80px',
        'md': '50px',
        'lg': '50px',
        'xl': '50px',
        '2xl': '50px',
      }}
      display="flex"
      gap={10}
      margin="0px">
      <Stack
        data-test-id="Stack Main Container"
        minWidth="100%"
        alignItems="center">
        <Header />
        <Outlet />
      </Stack>
    </Container>
  );
};
