export const resolvePlural = (quantity: number, singular: string, plural = `${singular}s`): string => (
  quantity === 1
    ? singular
    : plural
);
