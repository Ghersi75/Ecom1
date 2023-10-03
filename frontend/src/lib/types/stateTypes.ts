// export interface ViewItemsSelectedStateInterface {
//   radios: { [modifierName: string]: string };
//   checkboxes: { [modifierName: string]: { [optionName: string]: boolean } };
// }

export interface ViewItemsRadioSelectedStateInterface {
  type: "RADIO",
  selected_id: number,
  display_text: string,
  price: ViewItemPriceType
}

export interface ViewItemsCheckboxSelectedStateInterface {
  type: "CHECKBOX",
  selected_ids: {
    [option_id: number]: {
      display_text: string
      price: ViewItemPriceType
    }
  }
}

export type ViewItemsModifierType = ViewItemsCheckboxSelectedStateInterface | ViewItemsRadioSelectedStateInterface

export interface ViewItemsSelectedStateInterface {
  [modifierId: number]: ViewItemsModifierType
}

export type ViewItemPriceType = number | {
    modifier_id: number,
    [modifier_option_id: number]: number
  } | null