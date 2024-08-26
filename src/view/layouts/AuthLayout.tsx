import { Container } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

export const AuthLayout = () => {
  return (
    <Container
      minHeight="100vh"
      minWidth="100%"
      backgroundColor="#fff"
      justifyContent="center"
      alignContent="center"
      alignItems="center"
      padding="0px"
      paddingLeft={['0px', '100px']}
      paddingRight={['0px', '100px']}
      display="flex"
      margin="0px">
      <Outlet />
    </Container>
  );
};
