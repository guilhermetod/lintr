export const joinArgs = (baseCommand: string, flags: string[] = []): string => [baseCommand, ...flags].filter(Boolean).join(' ');
