export const getForbiddenValues = <T>(
  values: T[] | ReadonlyArray<T>,
  acceptedValues: T[] | ReadonlyArray<T>,
): T[] => values.filter((key) => !acceptedValues.includes(key));
