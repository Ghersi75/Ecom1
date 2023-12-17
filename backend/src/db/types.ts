import type { ColumnType } from 'kysely';
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

import type { ModifierType } from './enums';

export type ItemModifiers = {
  ComboID: Generated<number>;
  ItemID: number;
  ModifierID: number;
  DisplayOrder: Generated<number>;
  IsActive: Generated<number>;
  IsAvailable: Generated<number>;
};
export type ItemOptionPrices = {
  ComboID: Generated<number>;
  ItemID: number;
  OptionID: number;
  Price: number;
  IsActive: Generated<number>;
  IsAvailable: Generated<number>;
};
export type MenuItems = {
  ItemID: Generated<number>;
  Name: string;
  DisplayText: string;
  Description: string | null;
  ImageLink: string | null;
  BasePrice: number | null;
  display_price: number | null;
  DisplayOrder: Generated<number>;
  IsActive: Generated<number>;
  IsAvailable: Generated<number>;
  IsFeatured: Generated<number>;
};
export type ModifierOptions = {
  OptionID: Generated<number>;
  ModifierID: number;
  Name: string;
  DisplayText: string;
  DisplayOrder: Generated<number>;
  IsActive: Generated<number>;
  IsAvailable: Generated<number>;
  BasePrice: number | null;
  SelectionOptionID: number | null;
};
export type Modifiers = {
  ModifierID: Generated<number>;
  Name: Generated<string>;
  DisplayText: Generated<string>;
  Description: string | null;
  IsRequired: Generated<number>;
  MaxSelection: number | null;
  ModifierType: ModifierType;
  DefaultOptionID: number | null;
  DisplayOrder: Generated<number>;
  IsActive: Generated<number>;
  IsAvailable: Generated<number>;
};
export type OptionOptionPrices = {
  ComboID: Generated<number>;
  ParentOptionID: number;
  DependentOptionID: number;
  Price: number;
  IsActive: Generated<number>;
  IsAvailable: Generated<number>;
};
export type Section = {
  SectionID: Generated<number>;
  Name: string;
  DisplayName: string;
  DisplayOrder: Generated<number>;
  IsActive: Generated<number>;
  IsAvailable: Generated<number>;
};
export type SectionItems = {
  ComboID: Generated<number>;
  DisplayOrder: Generated<number>;
  IsActive: Generated<number>;
  IsAvailable: Generated<number>;
  SectionID: number;
  ItemID: number;
};
export type SelectionOptions = {
  SelectionOptionID: Generated<number>;
  OptionName: string;
};
export type User = {
  UserID: Generated<number>;
  Username: string;
  FirstName: string | null;
  LastName: string | null;
  ProfilePicture: string | null;
  Email: string;
  PhoneNumber: string | null;
  PasswordHash: string | null;
  Provider: string;
  RegisterAt: Generated<Timestamp>;
  LastLogin: Generated<Timestamp>;
};
export type DB = {
  ItemModifiers: ItemModifiers;
  ItemOptionPrices: ItemOptionPrices;
  MenuItems: MenuItems;
  ModifierOptions: ModifierOptions;
  Modifiers: Modifiers;
  OptionOptionPrices: OptionOptionPrices;
  SectionItems: SectionItems;
  Sections: Section;
  SelectionOptions: SelectionOptions;
  Users: User;
};
