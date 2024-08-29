export const capitalize = (fullName: string): string => {
  return fullName.charAt(0).toUpperCase() + fullName.slice(1).toLowerCase();
};

export const formatFullName = (fullName: string): string => {
  return fullName
    .split(' ')
    .filter((fullName) => fullName.trim().length > 0)
    .map(capitalize)
    .join(' ');
};
