import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsJsonable() {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isJsonable',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];
          try {
						const stringifiedValue = JSON.stringify(value);
						return stringifiedValue !== undefined;
					} catch {
						return false;
					}
        },
      },
    });
  };
}