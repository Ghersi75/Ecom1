import type { ColumnType } from 'kysely';
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type MenuItems = {
  item_id: Generated<number>;
  name: string;
  display_name: string;
  description: string | null;
  image_link: string | null;
  base_price: string | null;
  display_order: Generated<number>;
  is_active: Generated<number>;
  is_available: Generated<number>;
  is_featured: Generated<number>;
  section_id: number;
};
export type Section = {
  section_id: Generated<number>;
  name: string;
  display_name: string;
  display_order: Generated<number>;
  is_active: Generated<number>;
  is_available: Generated<number>;
};
export type SectionItems = {
  combo_id: Generated<number>;
  display_order: Generated<number>;
  is_active: Generated<number>;
  is_available: Generated<number>;
  section_id: number;
};
export type User = {
  user_id: Generated<number>;
  username: string;
  first_name: string | null;
  last_name: string | null;
  profile_picture: string | null;
  email: string;
  phone_number: string | null;
  password_hash: string | null;
  provider: string;
  registered_at: Generated<Timestamp>;
  last_login: Generated<Timestamp>;
};
export type DB = {
  menu_items: MenuItems;
  SectionItems: SectionItems;
  sections: Section;
  users: User;
};
