type GenericDataType = {
  // Unique id for each item
  "item_id": string,
  // Name of item
  "name": string,
  // Description of item
  "description": string,
  // Image link, likely from S3
  "image_link": string,
  // Whether the item is currently available or not
  "available": boolean,
  // Price stored as just the number `2.50` for example
  "price": {
    "sm"?: string,
    "md"?: string,
    "lg"?: string,
    "xl"?: string,
    "default"?: string
  },
  // Lists of modifiers 
  "modifiers": {
    // Include will be modifiers that are referenced from modifiers table
    "include": string[],
    // Exclude will be modifier ids that are not needed
    // For example choose pasta with lasagna is not necessary
    "exclude": string[],
    // This needs to change to accommodate custom modifier types
    "custom": string[]
  },
  "sorting_key": string
}

export type { GenericDataType };