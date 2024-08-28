export const getFirstAndLastName = (fullName?: string) => {
  const name = fullName?.split(' ');
  const firstName = name?.[0];
  const lastName = name?.[name.length - 1];

  return `${firstName || ''} ${lastName || ''}`;
};
