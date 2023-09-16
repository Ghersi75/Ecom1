import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationOptions,
  registerDecorator
} from "class-validator";

@ValidatorConstraint({ async: false })
export class IsPasswordRequiredBasedOnProviderConstraint implements ValidatorConstraintInterface {
  validate(password: string | null | undefined, args: ValidationArguments): boolean {
      const relatedProvider = (args.object as any).provider;
      if (relatedProvider === "credentials") {
          // Check IsString() as well
          return password != null && typeof password === "string" && password.trim() !== "";
      }
      return true;
  }

  defaultMessage(args: ValidationArguments): string {
      return "Password is required when provider is 'credentials'.";
  }
}

export function IsPasswordRequiredBasedOnProvider(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
      registerDecorator({
          target: object.constructor,
          propertyName: propertyName,
          options: validationOptions,
          constraints: [],
          validator: IsPasswordRequiredBasedOnProviderConstraint
      });
  };
}
