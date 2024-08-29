import {
  Button,
  FormControl,
  FormErrorMessage,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
} from '@chakra-ui/react';
import { ChangeEvent, FormEvent } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { PasswordValidator } from './PasswordValidator';

export interface RegisterFormProps {
  fullName: string;
  email: string;
  password: string;
  hasFullNameError: boolean;
  hasEmailError: boolean;
  isSubmitting: boolean;
  hasPasswordError: boolean;
  isPasswordVisible: boolean;
  rules: {
    minLength: boolean;
    hasLowercase: boolean;
    hasUppercase: boolean;
    hasNumber: boolean;
    hasSpecialChar: boolean;
  };
  handlePasswordVisibility: () => void;
  handleFullNameChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleEmailChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handlePasswordChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleFullNameOnBlur: (e: ChangeEvent<HTMLInputElement>) => void;
  handleEmailOnBlur: (e: ChangeEvent<HTMLInputElement>) => void;
  handlePasswordOnBlur: (e: ChangeEvent<HTMLInputElement>) => void;
  disableSubmit: boolean;
  onSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
}

export const RegisterForm = (props: RegisterFormProps) => {
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
  } = props;

  return (
    <form onSubmit={onSubmit}>
      <Stack display="flex" width={['300px', '350px']} spacing={5}>
        <Stack display="flex" width={['300px', '350px']} spacing={2}>
          <Stack display="flex" direction="column" spacing={1}>
            <FormControl id="fullName" isInvalid={hasFullNameError}>
              <Input
                id="fullName"
                fontSize="14px"
                borderColor="#D3D5D8"
                backgroundColor="white"
                focusBorderColor="#44197e"
                type="text"
                placeholder="Full name"
                aria-label="Full name"
                errorBorderColor="#C53030"
                value={fullName}
                onChange={handleFullNameChange}
                onBlur={handleFullNameOnBlur}
              />
              <FormErrorMessage
                color="#C53030"
                fontSize="12px"
                fontWeight="500">
                Please enter your full name
              </FormErrorMessage>
            </FormControl>
          </Stack>
          <Stack display="flex" direction="column" spacing={1}>
            <FormControl id="email" isInvalid={hasEmailError}>
              <Input
                fontSize="14px"
                borderColor="#D3D5D8"
                backgroundColor="white"
                focusBorderColor="#44197e"
                type="email"
                placeholder="Email"
                aria-label="Email"
                autoComplete="email"
                value={email}
                onChange={handleEmailChange}
                onBlur={handleEmailOnBlur}
              />
              <FormErrorMessage
                color="#C53030"
                fontSize="12px"
                fontWeight="500">
                Please enter a valid email address
              </FormErrorMessage>
            </FormControl>
          </Stack>
          <Stack display="flex" direction="column" spacing={1}>
            <FormControl id="fontSize" isInvalid={hasPasswordError}>
              <InputGroup>
                <Input
                  id="password"
                  fontSize="14px"
                  borderColor="#D3D5D8"
                  backgroundColor="white"
                  focusBorderColor="#44197e"
                  type={isPasswordVisible ? 'text' : 'password'}
                  autoComplete="new-password"
                  placeholder="Password"
                  aria-label="Password"
                  value={password}
                  onChange={handlePasswordChange}
                  onBlur={handlePasswordOnBlur}
                />
                {password && (
                  <InputRightElement>
                    {isPasswordVisible ? (
                      <IconButton
                        icon={<FaEyeSlash fontSize="18px" color="#334155" />}
                        size="sm"
                        background="none"
                        onClick={handlePasswordVisibility}
                        aria-label="Hide password"
                        _hover={{
                          color: '#847BFB',
                          textDecoration: 'none',
                          background: '#fff',
                        }}
                      />
                    ) : (
                      <IconButton
                        icon={<FaEye fontSize="18px" color="#334155" />}
                        size="sm"
                        background="none"
                        onClick={handlePasswordVisibility}
                        aria-label="Show password"
                        _hover={{
                          color: '#847BFB',
                          textDecoration: 'none',
                          background: '#fff',
                        }}
                      />
                    )}
                  </InputRightElement>
                )}
              </InputGroup>
              <FormErrorMessage
                color="#C53030"
                fontSize="12px"
                fontWeight="500">
                Please enter a valid password
              </FormErrorMessage>
            </FormControl>
            <PasswordValidator rules={rules} />
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
          Sign up
        </Button>
      </Stack>
    </form>
  );
};
