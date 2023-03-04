export class DonationPaymentsServiceError extends Error {
  constructor() {
    super("Payments service responded with error");
  }
}