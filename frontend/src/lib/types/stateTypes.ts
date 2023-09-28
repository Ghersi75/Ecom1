// export interface ViewItemsSelectedStateInterface {
//   radios: { [modifierName: string]: string };
//   checkboxes: { [modifierName: string]: { [optionName: string]: boolean } };
// }

export interface ViewItemsRadioSelectedStateInterface {
  type: "RADIO",
  selected_id: number,
  price: ViewItemPriceType
}

export interface ViewItemsCheckboxSelectedStateInterface {
  type: "CHECKBOX",
  selected_ids: {
    [option_id: number]: {
      selected: boolean,
      price: ViewItemPriceType
    }
  }
}

export interface ViewItemsSelectedStateInterface {
  [modifierId: number]: (ViewItemsCheckboxSelectedStateInterface | ViewItemsRadioSelectedStateInterface)
}

export type ViewItemPriceType = number | {
    modifier_id: number,
    [modifier_option_id: number]: number
  } | null