import { Prisma } from "@prisma/client";

export type JsonObject = { [Key in string]?: JsonValue | null }

interface JsonArray extends ReadonlyArray<JsonValue | null> {}

// export type JsonValue = string | number | boolean | JsonObject | JsonArray
export type JsonValue = Prisma.JsonValue;