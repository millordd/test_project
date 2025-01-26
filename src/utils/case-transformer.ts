export const toCamelCase = (item: unknown): unknown => {
  if (Array.isArray(item)) {
    return item.map((el: unknown) => toCamelCase(el));
  }
  if (typeof item === 'function' || item !== Object(item)) {
    return item;
  }

  return Object.fromEntries(
    Object.entries(item as Record<string, unknown>).map(([key, value]: [string, unknown]) => [
      key.replace(/([-_][a-z])/gi, (c) => c.toUpperCase().replace(/[-_]/g, '')),
      toCamelCase(value),
    ])
  );
};

export const toSnakeCase = (item: unknown): unknown => {
  if (Array.isArray(item)) {
    return item.map((el: unknown) => toSnakeCase(el));
  }
  if (typeof item === 'function' || item !== Object(item)) {
    return item;
  }

  return Object.fromEntries(
    Object.entries(item as Record<string, unknown>).map(([key, value]: [string, unknown]) => [
      key.replace(/[A-Z]/g, (match) => `_${match.toLowerCase()}`),
      toSnakeCase(value),
    ])
  );
};
