import { CheckCircleIcon } from '@chakra-ui/icons';
import {
  Hide,
  List,
  ListIcon,
  ListItem,
  Show,
  Stack,
  Text,
} from '@chakra-ui/react';

interface PasswordValidatorProps {
  rules: {
    minLength: boolean;
    hasLowercase: boolean;
    hasUppercase: boolean;
    hasNumber: boolean;
    hasSpecialChar: boolean;
  };
}

export const PasswordValidator = ({ rules }: PasswordValidatorProps) => {
  return (
    <Stack
      alignItems="left"
      spacing={2}
      justifyContent="center"
      direction="column"
      pt="6px">
      <Text alignItems="center" fontSize="13px" fontWeight="normal">
        Your password must contain at least:
      </Text>
      <Stack alignItems="left" justifyContent="space-between" direction="row">
        <List spacing={1}>
          <ListItem fontSize="13px">
            <ListIcon
              as={CheckCircleIcon}
              color={rules.hasLowercase ? 'green.500' : 'gray.300'}
            />
            one lowercase character
          </ListItem>
          <ListItem fontSize="13px">
            <ListIcon
              as={CheckCircleIcon}
              color={rules.hasUppercase ? 'green.500' : 'gray.300'}
            />
            one uppercase character
          </ListItem>
          <ListItem fontSize="13px">
            <ListIcon
              as={CheckCircleIcon}
              color={rules.hasNumber ? 'green.500' : 'gray.300'}
            />
            one number
          </ListItem>
          <Show breakpoint="(max-width: 850px)">
            <ListItem fontSize="13px">
              <ListIcon
                as={CheckCircleIcon}
                color={rules.hasSpecialChar ? 'green.500' : 'gray.300'}
              />
              one special character
            </ListItem>
            <ListItem fontSize="13px">
              <ListIcon
                as={CheckCircleIcon}
                color={rules.minLength ? 'green.500' : 'gray.300'}
              />
              6 character minimum
            </ListItem>
          </Show>
        </List>
        <Hide breakpoint="(max-width: 850px)">
          <List>
            <ListItem fontSize="13px">
              <ListIcon
                as={CheckCircleIcon}
                color={rules.hasSpecialChar ? 'green.500' : 'gray.300'}
              />
              one special character
            </ListItem>
            <ListItem fontSize="13px">
              <ListIcon
                as={CheckCircleIcon}
                color={rules.minLength ? 'green.500' : 'gray.300'}
              />
              6 character minimum
            </ListItem>
          </List>
        </Hide>
      </Stack>
    </Stack>
  );
};
