export const isObjectEmpty = (obj) => {
  if (!obj) return true;

  if (typeof obj !== "object") return true;

  return Object.keys(obj).length === 0;
};
