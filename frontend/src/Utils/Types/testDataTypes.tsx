export type testDataType = {
  "section": string,
  "items": {
    "name": string,
    "description": string,
    "price": string | {
      "sm"?: string,
      "md"?: string,
      "xl"?: string
    },
    "img"?: string
  }[]
}