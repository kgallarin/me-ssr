export const STORAGE_KEYS = {
  THEME: 'theme',
  AUTH_TOKEN: 'jwt:auth_token',
} as const;
export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];

export const API = {
  TIMEOUT_MS: 30_000,
} as const;

export const enum Theme {
  LIGHT = 0,
  DARK = 1,
}

export const BASE_TOAST_TOP_POS = ['top', 'top-right', 'top-left'] as const;

export const BASE_TOAST_RIGHT_POS = [
  'top',
  'bottom',
  'top-right',
  'bottom-right',
] as const;
