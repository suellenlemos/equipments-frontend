import { Button, Container, Stack, Text } from '@chakra-ui/react';
import { FaChartBar } from 'react-icons/fa';
import { Outlet } from 'react-router-dom';

export const MainLayout = () => {
  return (
    <Container
      minHeight="100vh"
      minWidth="100%"
      backgroundColor="#fff"
      justifyContent="center"
      alignContent="center"
      display="flex"
      margin="0px"
      padding="0px">
      <Stack minWidth="100%" alignItems="center" backgroundColor="#fff">
        <Stack
          justifyContent="flex-start"
          alignItems="center"
          alignContent="center"
          width="100%"
          height="70px"
          display="flex"
          direction="row"
          spacing={8}
          position="sticky"
          pl={['10px', '20px']}
          pr={['10px', '20px']}
          pt="20px"
          pb="20px"
          backgroundColor="#F6F6F6"
          border="1px solid #d1d1d1">
          <FaChartBar size="28px" color="#44197e" />

          <Button
            _hover={{
              color: '#44197e',
              textDecoration: 'none',
              background: '#F6F6F6',
            }}
            fontSize="16px"
            background="#F6F6F6"
            padding="0px"
            fontWeight="bold"
            borderRadius="0px"
            as="a"
            href="/">
            <Text
              borderRadius="0px"
              border="none"
              borderBottom="2px transparent solid"
              padding="0px"
              lineHeight="1.50"
              _hover={{
                color: '#44197e',
                textDecoration: 'none',
                background: '#F6F6F6',
                border: 'none',
                borderBottom: '2px #ff564d solid',
                borderRadius: '0px',
                padding: '0px',
              }}
              fontSize="16px"
              background="#F6F6F6"
              fontWeight="bold">
              Equipments
            </Text>
          </Button>
        </Stack>
        <Outlet />
      </Stack>
    </Container>
  );
};
