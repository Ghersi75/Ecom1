import type { ColumnType } from 'kysely';
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

import type { ModifierType } from './enums';

export type ItemModifiers = {
  combo_id: Generated<number>;
  item_id: number;
  modifier_id: number;
  display_order: Generated<number>;
  is_active: Generated<number>;
  is_available: Generated<number>;
};
export type ItemOptionPrices = {
  combo_id: Generated<number>;
  item_id: number;
  option_id: number;
  price: string;
  is_active: Generated<number>;
  is_available: Generated<number>;
};
export type MenuItems = {
  item_id: Generated<number>;
  name: string;
  display_text: string;
  description: string | null;
  image_link: string | null;
  base_price: string | null;
  display_order: Generated<number>;
  is_active: Generated<number>;
  is_available: Generated<number>;
  is_featured: Generated<number>;
};
export type ModifierOptions = {
  option_id: Generated<number>;
  modifier_id: number;
  name: string;
  display_text: string;
  display_order: Generated<number>;
  is_active: Generated<number>;
  is_available: Generated<number>;
  base_price: string | null;
  selection_option_id: number | null;
};
export type Modifiers = {
  modifier_id: Generated<number>;
  name: Generated<string>;
  display_text: Generated<string>;
  description: string | null;
  is_required: Generated<number>;
  max_selection: number | null;
  modifier_type: ModifierType;
  default_option_id: number | null;
  display_order: Generated<number>;
  is_active: Generated<number>;
  is_available: Generated<number>;
};
export type Section = {
  section_id: Generated<number>;
  name: string;
  display_text: string;
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
  item_id: number;
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
  item_modifiers: ItemModifiers;
  item_option_prices: ItemOptionPrices;
  menu_items: MenuItems;
  modifier_options: ModifierOptions;
  modifiers: Modifiers;
  section_items: SectionItems;
  sections: Section;
  users: User;
};
