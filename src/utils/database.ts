import { getEnvVariables } from "./env";

export function getDatabaseURL(): string {
  const databaseComponents = getEnvVariables("DB_NAME", "DB_USER", "DB_PASS", "DB_HOST", "DB_PORT");

  if (!databaseComponents.success) {
    throw new Error(`Missing environment variables: ${databaseComponents.missingVariables.join(", ")}`);
  }

  const { DB_HOST, DB_PORT, DB_NAME, DB_PASS, DB_USER } = databaseComponents.variables;

  return `postgresql://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;
}

export function getShadowDatabaseURL(): string {
  const databaseComponents = getEnvVariables("DB_SHADOW_NAME", "DB_USER", "DB_PASS", "DB_HOST", "DB_PORT");

  if (!databaseComponents.success) {
    throw new Error(`Missing environment variables: ${databaseComponents.missingVariables.join(", ")}`);
  }

  const { DB_HOST, DB_PORT, DB_SHADOW_NAME, DB_PASS, DB_USER } = databaseComponents.variables;

  return `postgresql://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_SHADOW_NAME}`;
}