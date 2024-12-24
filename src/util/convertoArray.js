export const convertToArray = (inputString) => {
  if (!inputString) return [];
  return inputString.split(",").map((item) => item.trim());
};
