type ModifierType = {
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
      "default"?: string
    },
    "sorting_key": string
  }[]
}

export type { ModifierType }