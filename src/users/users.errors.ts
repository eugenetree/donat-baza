export class OauthProviderWasAlreadyUsedError extends Error {
  constructor() {
    super("User already was created using provided oauth provider");
  }
}