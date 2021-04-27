export interface RunLintrConfig {
  concurrent?: boolean;
  errorOnEmptyTarget?: boolean;
  exitOnError?: boolean;
  fix?: boolean;
  ignorePatterns?: string[];
  useIcons?: boolean;
  useRoot?: string[];
}
