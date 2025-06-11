export const isSingleFuelPage = (path: string): boolean => {
  const regex = /fuel\/vehicle/;
  return regex.test(path);
};
