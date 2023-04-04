export const PAYMENT_SYSTEMS = {
  FONDY: 'fondy',
} as const;

export const PAYMENT_SYSTEMS_CALLBACK_URL_PATHS = {
  [PAYMENT_SYSTEMS.FONDY]: 'fondy-callback',
} as const;