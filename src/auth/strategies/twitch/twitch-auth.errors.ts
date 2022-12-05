export class IncorrectCallbackUrlError extends Error {
  constructor() {
    super("Incorrect callback url was passed from to method");
  }
}