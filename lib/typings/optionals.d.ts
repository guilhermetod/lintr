import { OptionalKeys } from '@lib/typings/optional-keys';

export type Optionals<T> = Pick<T, OptionalKeys<T>>;
