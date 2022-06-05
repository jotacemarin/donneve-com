export const clearSession = () => sessionStorage.clear();

export const getItem = (key) => {
  const rawValue = sessionStorage.getItem(key);

  try {
    return JSON.parse(rawValue);
  } catch (error) {
    return rawValue;
  }
};

export const setItem = (key, rawValue) => {
  let value = rawValue;

  if (typeof rawValue === "object") {
    value = JSON.stringify(rawValue);
  }

  return sessionStorage.setItem(key, value);
};

export const delItem = (key) => sessionStorage.removeItem(key);
