import type { ColumnType } from 'kysely';
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type User = {
  user_id: Generated<number>;
  first_name: string;
  last_name: string;
  profile_picture: string | null;
  email: string;
  phone_number: string;
  password_hash: string | null;
  provider: string | null;
  registered_at: Generated<Timestamp>;
  last_login: Generated<Timestamp>;
};

export type DB = {
  users: User;
};
