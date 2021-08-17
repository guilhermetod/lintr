export const concatenate = (...sentences: string[]): string => sentences.filter(Boolean).join(' and ');
