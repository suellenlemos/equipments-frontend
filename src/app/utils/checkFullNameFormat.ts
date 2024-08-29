export const checkFullNameFormat = (fullName: string): boolean => {
  if (/^[\p{L}]+(?: [\p{L}]+)+$/u.test(fullName)) {
    return true;
  }
  return false;
};
