import { Heading, Link, Stack, Text } from '@chakra-ui/react';

import { Link as RouterLink } from 'react-router-dom';
import { RegisterForm } from './components/RegisterForm';
import { useRegisterController } from './useRegisterController';

export const Register = () => {
  const {
    fullName,
    email,
    password,
    hasFullNameError,
    hasEmailError,
    isSubmitting,
    hasPasswordError,
    isPasswordVisible,
    rules,
    handlePasswordVisibility,
    handleFullNameChange,
    handleEmailChange,
    handlePasswordChange,
    handleFullNameOnBlur,
    handleEmailOnBlur,
    handlePasswordOnBlur,
    disableSubmit,
    onSubmit,
  } = useRegisterController();

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
          Sign Up
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
            Already have an account?
          </Text>
          <Link
            aria-label="Log in"
            as={RouterLink}
            to="/"
            color="#1E1E1E"
            fontSize="15px"
            letterSpacing={-0.7}
            fontWeight="500"
            _hover={{
              color: '#847BFB',
              textDecoration: 'none',
              background: '#fff',
            }}>
            Log in
          </Link>
        </Stack>
      </Stack>

      <RegisterForm
        fullName={fullName}
        email={email}
        password={password}
        hasFullNameError={hasFullNameError}
        hasEmailError={hasEmailError}
        isSubmitting={isSubmitting}
        hasPasswordError={hasPasswordError}
        isPasswordVisible={isPasswordVisible}
        rules={rules}
        handlePasswordVisibility={handlePasswordVisibility}
        handleFullNameChange={handleFullNameChange}
        handleEmailChange={handleEmailChange}
        handlePasswordChange={handlePasswordChange}
        handleFullNameOnBlur={handleFullNameOnBlur}
        handleEmailOnBlur={handleEmailOnBlur}
        handlePasswordOnBlur={handlePasswordOnBlur}
        disableSubmit={disableSubmit}
        onSubmit={onSubmit}
      />
    </Stack>
  );
};
