export const ModifierType = {
  RADIO: 'RADIO',
  CHECKBOX: 'CHECKBOX',
} as const;
export type ModifierType = (typeof ModifierType)[keyof typeof ModifierType];
