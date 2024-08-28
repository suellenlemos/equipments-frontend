import { FormEvent, useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../../../app/hooks/useAuth';
import { checkEmailFormat } from '../../../app/utils/checkEmailFormat';

export const useLoginController = () => {
  const { signIn } = useAuth();

  const [email, setEmail] = useState<string>('');

  const [hasEmailError, setHasEmailError] = useState(false);

  const emailErrorMessage = 'Please enter a valid email';

  const [password, setPassword] = useState<string>('');

  const [hasPasswordError, setHasPasswordError] = useState(false);

  const passwordErrorMessage = 'Please enter your password';

  const [isSubmitting, setIsSubmitting] = useState(false);

  const checkEmail = () => {
    setHasEmailError(!checkEmailFormat(email));
    setEmail(email);
  };

  const checkPassword = () => {
    setHasPasswordError(password.trim().length < 3);
    setPassword(password);
  };

  const disableSubmit =
    !email || !password || hasEmailError || hasPasswordError || isSubmitting;

  const onSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setIsSubmitting(true);
      try {
        const params = {
          email: email.trim(),
          password: password.trim(),
        };
        await signIn(params);
        setIsSubmitting(false);
      } catch (error: any) {
        setIsSubmitting(false);
        toast.error(String(error.message));
      }
    },
    [email, password]
  );

  return {
    email,
    setEmail,
    hasEmailError,
    setHasEmailError,
    emailErrorMessage,
    password,
    setPassword,
    hasPasswordError,
    setHasPasswordError,
    passwordErrorMessage,
    isSubmitting,
    setIsSubmitting,
    checkEmail,
    checkPassword,
    disableSubmit,
    onSubmit,
  };
};
