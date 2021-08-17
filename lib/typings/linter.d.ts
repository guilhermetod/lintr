export interface Linter {
  name: string;
  command: string;
  icon?: string | null;
  forceRoot?: boolean;
  fixFlag?: string;
  pattern?: string;
  root?: string;
}
