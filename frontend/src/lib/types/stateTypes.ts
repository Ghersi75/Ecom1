export interface ViewItemsSelectedStateInterface {
  radios: { [modifierName: string]: string };
  checkboxes: { [modifierName: string]: { [optionName: string]: boolean } };
}