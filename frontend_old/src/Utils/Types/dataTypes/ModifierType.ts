type ModifierType = {
  [modifier_id: string]: {
    "header": string,
    "required": boolean,
    "type": "radio" | "checkbox",
    "choices": {
      "name": string,
      "price": {
        "sm"?: string,
        "md"?: string,
        "lg"?: string,
        "xl"?: string,
        "default"?: string,
        "linked_price"?: string
      },
      "sorting_key": string
    }
  }
}

export type { ModifierType }