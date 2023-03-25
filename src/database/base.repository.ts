import { Prisma } from "@prisma/client";
import { BaseEntity } from "./base.entity";
import { PrepareCreateInput, PrismaFieldValue, ProcessPrismaJsonFieldsReturn, } from "./base.repository.type";

  type PrismaModelShape = {
  create: (params: { data: unknown }) => Promise<unknown>;
  findFirst: (params?: { where?: unknown }) => Promise<unknown>;
  findMany: (params?: { where?: unknown }) => Promise<unknown>;
  update: (params: { where: unknown, data: unknown }) => Promise<unknown>;
  delete: (params: { where: unknown }) => Promise<unknown>;
}

export abstract class BaseRepository<
  Entity extends BaseEntity,
  JsonFields extends Array<keyof Entity> = [],
  FieldsWithDefaultValue extends Array<keyof Entity> = []
>{

  constructor(
    private model: PrismaModelShape,
    private jsonFields: JsonFields,
    private fieldsWithDefaultValue: FieldsWithDefaultValue,
  ) { }

  async create(params: {
    data: PrepareCreateInput<Entity, FieldsWithDefaultValue>
  }): Promise<Entity> {
    return this.model.create({
      data: this.processPrismaJsonFields({
        input: params.data,
        fields: this.jsonFields,
        isDataInput: true
      })
    }) as Promise<Entity>;
  };

  async findOne(params: {
    where: Partial<Entity>;
  }): Promise<Entity | null> {
    return this.model.findFirst(params) as Promise<Entity | null>
  }

  async findMany(params: {
    where: Partial<Entity>;
    skip?: number;
    take?: number;
    orderBy?: Record<keyof Entity, 'asc' | 'decs'>;
  }): Promise<Array<Entity>> {
    return this.model.findMany(params) as Promise<Array<Entity>>;
  }

  async updateOne(params: {
    id: number;
    data: Partial<Omit<Entity, keyof BaseEntity>>;
  }): Promise<Entity> {
    return this.model.update({
      where: { id: params.id },
      data: params.data,
    }) as Promise<Entity>;
  }

  async deleteOne(params: {
    id: number;
  }): Promise<void> {
    await this.model.delete({ where: { id: params.id } })
  }


  // - replace incoming 'null' values with fields with Prisma.DbNull
  // - convert json fields in where query from "where: {field: 'abc'}" to "where: {field: {equals: 'abc'}}""
  protected processPrismaJsonFields =
    <Input, IsDataInput extends boolean = false, Fields extends Array<keyof Input> = Array<keyof Input>>({
      input,
      fields,
      isDataInput
    }: {
      input: Input;
      fields: Fields;
      isDataInput?: IsDataInput;
    }): ProcessPrismaJsonFieldsReturn<Input, Fields, IsDataInput> => {
      const inputOnlyJsonFields = fields.reduce((acc, key) => {
        const fieldValue = input[key] === null ? Prisma.DbNull : input[key];
        if (isDataInput) (acc[key] as unknown) = fieldValue;
        else (acc[key] as unknown) = { equals: fieldValue }
        return acc;
      }, {} as { [Key in Fields[number]]: PrismaFieldValue<Input[Key], IsDataInput> })
      return { ...input, ...inputOnlyJsonFields } as ProcessPrismaJsonFieldsReturn<Input, Fields, IsDataInput>;
    }
}