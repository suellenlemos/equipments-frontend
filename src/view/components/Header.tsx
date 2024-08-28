import {
  Avatar,
  Button,
  Hide,
  IconButton,
  Stack,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { IoLogOutOutline } from 'react-icons/io5';
import { useAuth } from '../../app/hooks/useAuth';
import { getFirstAndLastName } from '../../app/utils/getFirstAndLastName';

export const Header = () => {
  const { user, signOut } = useAuth();

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
        'base': '15px',
        'sm': '15px',
        'md': '15px',
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
        spacing={2}
        justifyContent="center"
        alignItems="center"
        direction="row">
        <Avatar
          name={user?.fullname}
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
            {getFirstAndLastName(user?.fullname)}
          </Text>
        </Hide>
        <Tooltip label="Log out" offset={[0, 2]} hasArrow placement="bottom">
          <IconButton
            _hover={{
              backgroundColor: '#fff',
              fontSize: '28px',
              color: '#1E1E1E',
            }}
            color="#1E1E1E"
            bg="#fff"
            fontSize="24px"
            icon={<IoLogOutOutline />}
            onClick={signOut}
            aria-label="Log out"
          />
        </Tooltip>
      </Stack>
    </Stack>
  );
};
