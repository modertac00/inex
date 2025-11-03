export const getValueFromString = (str: string, key: string): string | null => {
  const regex = new RegExp(`${key}=([^;]+)`);
  const match = str.match(regex);
  return match ? match[1] : null;
}