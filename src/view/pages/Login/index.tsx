import { Button, Heading, Input, Link, Stack, Text } from '@chakra-ui/react';
import { useLoginController } from './useLoginController';

export const Login = () => {
  const {
    email,
    setEmail,
    hasEmailError,
    setHasEmailError,
    password,
    setPassword,
    hasPasswordError,
    setHasPasswordError,
    isSubmitting,
    checkEmail,
    checkPassword,
    disableSubmit,
    onSubmit,
  } = useLoginController();

  return (
    <Stack
      display="flex"
      direction="column"
      alignItems="center"
      justifyContent="center"
      spacing={10}>
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

      <form onSubmit={onSubmit}>
        <Stack display="flex" width="300px" spacing={5}>
          <Stack display="flex" width="300px" spacing={2}>
            <Stack display="flex" direction="column" spacing={1}>
              <Input
                id="email"
                fontSize="14px"
                borderColor="#D3D5D8"
                backgroundColor="white"
                focusBorderColor="#44197e"
                type="email"
                placeholder="Email"
                aria-label="Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value.toLowerCase().trim());
                  setHasEmailError(false);
                }}
                onBlur={(e) => {
                  setEmail(e.target.value.toLowerCase());
                  checkEmail();
                }}
              />
              {hasEmailError && (
                <Text fontSize="12px" color="#C53030" fontWeight="500" pl="4px">
                  Please enter a valid email
                </Text>
              )}
            </Stack>
            <Stack display="flex" direction="column" spacing={1}>
              <Input
                id="password"
                fontSize="14px"
                borderColor="#D3D5D8"
                backgroundColor="white"
                focusBorderColor="#44197e"
                type="password"
                placeholder="Password"
                aria-label="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value.trim());
                  setHasPasswordError(false);
                }}
                onBlur={(e) => {
                  setPassword(e.target.value);
                  checkPassword();
                }}
              />
              {hasPasswordError && (
                <Text fontSize="12px" color="#C53030" fontWeight="500" pl="4px">
                  Please enter your password
                </Text>
              )}
            </Stack>
          </Stack>
          <Button
            type="submit"
            isLoading={isSubmitting}
            isDisabled={disableSubmit}
            height="45px"
            fontSize="14px"
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
