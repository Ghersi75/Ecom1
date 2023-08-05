type testDataType = {
  "section": string,
  "items": {
    "name": string,
    "description": string,
    "price": {
      "sm"?: string,
      "md"?: string,
      "xl"?: string
    },
    "img"?: string
  }[]
}

export type { testDataType };