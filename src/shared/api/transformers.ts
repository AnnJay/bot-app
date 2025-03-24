export const camelCase = (value: string): string => {
  return value.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
};

export const snakeCase = (value: string): string => {
  return value.replace(/([A-Z])/g, (letter) => `_${letter.toLowerCase()}`);
};

export const isFormData = (value: unknown): boolean => {
  return typeof FormData !== "undefined" && value instanceof FormData;
};

export const isObject = (value: unknown): boolean => {
  return value !== null && typeof value === "object" && !Array.isArray(value);
};

export const isString = (value: unknown): boolean => {
  return typeof value === "string";
};

export const transformKeys = (
  data: Record<string, any>,
  transformer: (key: string) => string
): Record<string, any> => {
  if (isFormData(data)) {
    return data;
  }

  if (Array.isArray(data)) {
    return data.map((item) => transformKeys(item, transformer));
  }

  if (isObject(data)) {
    return Object.fromEntries(
      Object.entries(data).map(([key, value]) => [
        transformer(key),
        transformKeys(value, transformer),
      ])
    );
  }

  return data;
};
