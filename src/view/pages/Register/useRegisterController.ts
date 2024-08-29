import { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import { toast } from 'react-toastify';

import { useAuth } from '../../../app/hooks/useAuth.ts';
import { authService } from '../../../app/services/authService.ts';
import { checkEmailFormat } from '../../../app/utils/checkEmailFormat';
import { checkFullNameFormat } from '../../../app/utils/checkFullNameFormat';
import { checkPasswordRule } from '../../../app/utils/checkPasswordRule';
import { formatFullName } from '../../../app/utils/formatFullName';

export const useRegisterController = () => {
  const { signIn } = useAuth();

  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [hasFullNameError, setHasFullNameError] = useState<boolean>(false);
  const [hasEmailError, setHasEmailError] = useState<boolean>(false);
  const [hasPasswordError, setHasPasswordError] = useState<boolean>(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [rules, setRules] = useState({
    minLength: false,
    hasLowercase: false,
    hasUppercase: false,
    hasNumber: false,
    hasSpecialChar: false,
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handlePasswordVisibility = useCallback(() => {
    setIsPasswordVisible(!isPasswordVisible);
  }, [isPasswordVisible]);

  const checkFullName = () => {
    setHasFullNameError(!checkFullNameFormat(fullName));
    setFullName(fullName);
  };

  const checkEmail = () => {
    setHasEmailError(!checkEmailFormat(email));
    setEmail(email);
  };

  const checkPassword = () => {
    setHasPasswordError(!checkPasswordRule(password.trim()));
    setPassword(password);
  };

  const isPasswordValid = () => {
    return Object.values(rules).every((rule) => rule === true);
  };

  const checkPasswordRules = (pwd: string) => {
    return {
      minLength: /^.{6,}$/.test(pwd),
      hasLowercase: /(?=.*[a-z])/.test(pwd),
      hasUppercase: /(?=.*[A-Z])/.test(pwd),
      hasNumber: /(?=.*\d)/.test(pwd),
      hasSpecialChar: /(?=.*[^\w\s])/.test(pwd),
    };
  };

  const handleFullNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFullName(e.target.value);
    setHasFullNameError(false);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value.trim());
    setHasEmailError(false);
  };

  const handlePasswordChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value.trim());
      setRules(checkPasswordRules(e.target.value.trim()));
      setHasPasswordError(false);
    },
    []
  );

  const handleFullNameOnBlur = (e: ChangeEvent<HTMLInputElement>) => {
    setFullName(e.target.value);
    checkFullName();
  };

  const handleEmailOnBlur = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    checkEmail();
  };

  const handlePasswordOnBlur = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    checkPassword();
  };

  const disableSubmit =
    !fullName ||
    !email ||
    !password ||
    hasFullNameError ||
    hasEmailError ||
    !isPasswordValid() ||
    hasPasswordError ||
    isSubmitting;

  const onSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!checkEmailFormat(email)) {
        setHasEmailError(true);
        return;
      }

      setIsSubmitting(true);
      try {
        const formData = {
          fullname: formatFullName(fullName),
          email: email.trim(),
          password: password.trim(),
        };
        await authService.register(formData);
        setIsSubmitting(false);
        signIn({
          email: formData.email,
          password: formData.password,
        });
      } catch (error: any) {
        setIsSubmitting(false);
        toast.error(String(error.message));
      }
    },
    [email, password]
  );

  return {
    fullName,
    setFullName,
    hasFullNameError,
    setHasFullNameError,
    email,
    setEmail,
    hasEmailError,
    setHasEmailError,
    password,
    setPassword,
    isSubmitting,
    setIsSubmitting,
    rules,
    hasPasswordError,
    setHasPasswordError,
    isPasswordVisible,
    handlePasswordVisibility,
    checkFullName,
    checkEmail,
    checkPassword,
    isPasswordValid,
    handleFullNameChange,
    handleEmailChange,
    handlePasswordChange,
    handleFullNameOnBlur,
    handleEmailOnBlur,
    handlePasswordOnBlur,
    disableSubmit,
    onSubmit,
  };
};
