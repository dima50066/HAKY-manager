import dotenv from 'dotenv';

dotenv.config();

export function env(name: string, defaultValue?: string): string {
  const value = process.env[name];

  if (value) return value;

  if (defaultValue) return defaultValue;

  throw new Error(`Missing: process.env['${name}'].`);
}