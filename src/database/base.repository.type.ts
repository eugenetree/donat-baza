import { Prisma } from "@prisma/client";
import { BaseEntity } from "./base.entity";

export type NullableKeys<T> = Exclude<{ [Key in keyof T]: null extends T[Key] ? Key : never }[keyof T], undefined>

// - turn fields containing "null" to optional
// - turn fields that has default value in schema.prisma to optional
export type PrepareCreateInput<Entity, FieldsWithDefaultValue extends Array<keyof Entity>> =
  Omit<Entity, NullableKeys<Entity> | keyof BaseEntity | FieldsWithDefaultValue[number]>
  & { [Key in keyof Pick<Entity, NullableKeys<Entity> | FieldsWithDefaultValue[number]>]?: Entity[Key] }

export type PrismaFieldValue<InputValue, IsDataInput> =
  true extends IsDataInput
  ? Exclude<InputValue, null> | typeof Prisma.DbNull
  : { equals: Exclude<InputValue, null> | typeof Prisma.DbNull }

export type ProcessPrismaJsonFieldsReturn<
  Input,
  Fields extends Array<keyof Input>,
  IsDataInput extends boolean,
> = { [Key in keyof Input]:
    Key extends Fields[number]
    ? PrismaFieldValue<Input[Key], IsDataInput>
    : Input[Key]
  }