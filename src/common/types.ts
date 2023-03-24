type JsonObject = { [Key in string]?: JsonValue }
interface JsonArray extends Array<JsonValue> { }

// null is omitted as it is better to simply store nothing (NULL) instead of stringified null
export type JsonValue = string | number | boolean | JsonObject | JsonArray