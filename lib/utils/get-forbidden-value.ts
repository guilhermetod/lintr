export const getForbiddenValues = <T>(values: T[], acceptedValues: T[]): T[] => (
  values.filter((key) => !acceptedValues.includes(key))
);
