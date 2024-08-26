import { Button, Container, Stack, Text } from '@chakra-ui/react';

import { Outlet } from 'react-router-dom';

export const MainLayout = () => {
  return (
    <Container
      minHeight="100vh"
      minWidth="100%"
      backgroundColor="#fff"
      justifyContent="center"
      alignContent="center"
      padding="0px"
      paddingLeft={['20px', '100px']}
      paddingRight={['20px', '100px']}
      display="flex"
      margin="0px">
      <Stack minWidth="100%" alignItems="center">
        <Stack
          justifyContent="flex-start"
          alignItems="baseline"
          alignContent="center"
          width="100%"
          height="100px"
          display="flex"
          direction="row"
          spacing="250px"
          position="sticky"
          pr={['10px', '20px']}
          pt="45px"
          pb="20px"
          backgroundColor="#fff"
          borderBottom="1px solid #d1d1d1">
          <Button
            _hover={{
              color: '#847BFB',
              textDecoration: 'none',
              background: '#fff',
            }}
            fontSize="16px"
            background="#fff"
            padding="0px"
            fontWeight="bold"
            borderRadius="0px"
            as="a"
            href="/">
            <Text
              borderRadius="0px"
              _hover={{
                color: '#847BFB',
                textDecoration: 'none',
                background: '#fff',
              }}
              color="#1E1E1E"
              border="none"
              padding="0px"
              lineHeight="1.50"
              fontSize="20px"
              background="#fff"
              fontWeight="bold">
              .equipments
            </Text>
          </Button>
        </Stack>
        <Outlet />
      </Stack>
    </Container>
  );
};
