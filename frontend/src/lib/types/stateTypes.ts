// export interface ViewItemsSelectedStateInterface {
//   radios: { [modifierName: string]: string };
//   checkboxes: { [modifierName: string]: { [optionName: string]: boolean } };
// }

export interface ViewItemsRadioSelectedStateInterface {
  type: "RADIO",
  selected_id: number
}

export interface ViewItemsCheckboxSelectedStateInterface {
  type: "CHECKBOX",
  selected_ids: {
    [option_id: number]: boolean
  }
}

export interface ViewItemsSelectedStateInterface {
  [modifierId: number]: (ViewItemsCheckboxSelectedStateInterface | ViewItemsRadioSelectedStateInterface)
}