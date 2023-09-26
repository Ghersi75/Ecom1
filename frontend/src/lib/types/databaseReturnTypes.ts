// Used for kysely types that use generated
// Since Generated doesn't actually matter in this context, and removing each one, Generated<Type> = Type just makes more sense
// Ex: `Generated<number>` behaves the same as `number`
type Generated<T> = T

// Base MenuItems interface 
interface BaseMenuItemsInterface {
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
}

// Base Sections interface 
interface BaseSectionsInterface {
  section_id: Generated<number>;
  name: string;
  display_text: string;
  display_order: Generated<number>;
  is_active: Generated<number>;
  is_available: Generated<number>;
}

// Sections interface with items matching the section for item viewing page 
export interface MenuSectionsType extends BaseSectionsInterface {
  items: BaseMenuItemsInterface[] | [] | undefined;
}

// Base interface for Modifiers
interface BaseModifiersInterface {
  modifier_id: Generated<number>;
  name: Generated<string>;
  display_text: Generated<string>;
  description: string | null;
  is_required: Generated<number>;
  max_selection: number | null;
  modifier_type: "RADIO" | "CHECKBOX";
  default_option_id: number | null;
  display_order: Generated<number>;
  is_active: Generated<number>;
  is_available: Generated<number>;
}

export interface BaseModifierOptionsInterface {
  option_id: Generated<number>;
  modifier_id: number;
  name: string;
  display_text: string;
  display_order: Generated<number>;
  is_active: Generated<number>;
  is_available: Generated<number>;
  base_price: string | null;
  selection_option_id: number | null;
  price: {
    modifier_id: number,
    [option_id: number]: string
  } | null
}

export interface ViewItemModifierInterface extends BaseModifiersInterface {
  modifier_options: BaseModifierOptionsInterface[] | [] | undefined
}


export interface ViewItemMenuItemInterface extends BaseMenuItemsInterface {
  modifiers: ViewItemModifierInterface[] | [] | undefined
}

export { }