// src/i18n.ts

export const locales = ['en', 'hi', 'gu'] as const;

export const localePrefix = 'always'; // or 'as-needed'

export const defaultLocale = 'en';

export type Locale = (typeof locales)[number];
