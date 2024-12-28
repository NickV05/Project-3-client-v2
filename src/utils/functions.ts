export const capitalizeFirstLetter = (str: string) => {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const generateRandomLicensePlate = (): string => {
  const letters = Array.from({ length: 3 }, () =>
    String.fromCharCode(65 + Math.floor(Math.random() * 26))
  ).join("");
  const numbers = Math.floor(100 + Math.random() * 900).toString();
  return `${letters}${numbers}`;
};
