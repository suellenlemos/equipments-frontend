import { Avatar, Button, Hide, Stack, Text } from '@chakra-ui/react';

export const Header = () => {
  return (
    <Stack
      position="sticky"
      display="flex"
      width="100%"
      height={{
        'base': '70px',
        'sm': '70px',
        'md': '80px',
        'lg': '100px',
        'xl': '100px',
        '2xl': '100px',
      }}
      paddingLeft={{
        'base': '10px',
        'sm': '10px',
        'md': '10px',
        'lg': '0px',
        'xl': '0px',
        '2xl': '0px',
      }}
      paddingRight={{
        'base': '10px',
        'sm': '10px',
        'md': '10px',
        'lg': '0px',
        'xl': '0px',
        '2xl': '0px',
      }}
      paddingTop={{
        'base': '10px',
        'sm': '10px',
        'md': '20px',
        'lg': '40px',
        'xl': '40px',
        '2xl': '40px',
      }}
      paddingBottom={{
        'base': '10px',
        'sm': '10px',
        'md': '20px',
        'lg': '20px',
        'xl': '20px',
        '2xl': '20px',
      }}
      alignItems={{
        'base': 'center',
        'sm': 'center',
        'md': 'center',
        'lg': 'baseline',
        'xl': 'baseline',
        '2xl': 'baseline',
      }}
      justifyContent="space-between"
      direction="row"
      backgroundColor="#fff"
      borderBottom="1px solid #d1d1d1">
      <Stack
        display="flex"
        alignItems="center"
        justifyContent="flex-start"
        direction="row">
        <Button
          _hover={{
            color: '#847BFB',
            textDecoration: 'none',
            background: '#fff',
          }}
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
            fontSize={['16px', '20px']}
            background="#fff"
            fontWeight="bold">
            .equipments
          </Text>
        </Button>
      </Stack>

      <Stack
        display="flex"
        spacing={1}
        justifyContent="center"
        alignItems="center"
        direction="row">
        <Avatar
          name="Suellen Lemos"
          placeContent="center"
          size="sm"
          color="white"
          background="#344563"
          backgroundColor="#344563"
        />
        <Hide breakpoint="(max-width: 850px)">
          <Text
            color="#1E1E1E"
            fontSize={['12px', '14px']}
            fontWeight="600"
            background="#fff">
            Suellen Lemos
          </Text>
        </Hide>
      </Stack>
    </Stack>
  );
};
