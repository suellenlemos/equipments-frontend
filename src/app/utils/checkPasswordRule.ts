export const checkPasswordRule = (password: string): boolean => {
  if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{6,}$/.test(password)) {
    return true;
  }
  return false;
};
