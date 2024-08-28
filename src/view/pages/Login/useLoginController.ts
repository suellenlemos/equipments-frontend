import { FormEvent, useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../../../app/hooks/useAuth';
import { checkEmailFormat } from '../../../app/utils/checkEmailFormat';

export const useLoginController = () => {
  const { signIn } = useAuth();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [hasEmailError, setHasEmailError] = useState<boolean>(false);
  const [hasPasswordError, setHasPasswordError] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const checkEmail = () => {
    setHasEmailError(!checkEmailFormat(email));
    setEmail(email);
  };

  const checkPassword = () => {
    setHasPasswordError(password.trim().length < 6);
    setPassword(password);
  };

  const disableSubmit =
    !email || !password || hasEmailError || hasPasswordError || isSubmitting;

  const onSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setIsSubmitting(true);
      try {
        const formData = {
          email: email.trim(),
          password: password.trim(),
        };
        await signIn(formData);
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
    password,
    setPassword,
    hasPasswordError,
    setHasPasswordError,
    isSubmitting,
    setIsSubmitting,
    checkEmail,
    checkPassword,
    disableSubmit,
    onSubmit,
  };
};
