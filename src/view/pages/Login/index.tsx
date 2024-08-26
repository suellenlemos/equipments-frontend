import { Button, Heading, Input, Link, Stack, Text } from '@chakra-ui/react';

export const Login = () => {
  return (
    <Stack
      display="flex"
      direction="column"
      alignItems="center"
      justifyContent="center">
      <Stack
        display="flex"
        direction="column"
        alignItems="center"
        spacing={6}
        justifyContent="center">
        <Heading fontSize="40px" color="#847BFB" letterSpacing={-0.5}>
          Welcome
        </Heading>
        <Stack
          display="flex"
          direction="column"
          alignItems="center"
          spacing={1}
          justifyContent="center">
          <Text
            color="#1E1E1E"
            fontSize="15px"
            letterSpacing={-0.7}
            fontWeight="500">
            Don't have an account?
          </Text>
          <Link
            aria-label="Sign up"
            color="#1E1E1E"
            fontSize="15px"
            letterSpacing={-0.7}
            fontWeight="500"
            _hover={{
              color: '#847BFB',
              textDecoration: 'none',
              background: '#fff',
            }}>
            Sign Up
          </Link>
        </Stack>
      </Stack>

      <form>
        <Stack display="flex" width="300px" spacing={4}>
          <Input
            fontSize="14px"
            borderColor="#D3D5D8"
            backgroundColor="white"
            focusBorderColor="#44197e"
            type="email"
            placeholder="Email"
          />
          <Input
            fontSize="14px"
            borderColor="#D3D5D8"
            backgroundColor="white"
            focusBorderColor="#44197e"
            type="password"
            placeholder="Password"
          />
          <Button
            height="45px"
            fontSize="14px"
            type="submit"
            bg="#847BFB"
            color="white"
            _hover={{
              bg: '#6626BE',
              color: 'white',
            }}>
            Log in
          </Button>
        </Stack>
      </form>
    </Stack>
  );
};
