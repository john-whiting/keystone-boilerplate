export type GetEnvVariablesResult<T extends string> = 
  | { success: true; variables: Record<T, string>; }
  | { success: false; missingVariables: T[]; };

export function getEnvVariables<T extends string>(...variableNames: T[]): GetEnvVariablesResult<T> {
  const missingVariables: T[] = [];
  const variables: Record<T, string> = {} as Record<T, string>;

  for (const variableName of variableNames) {
    const value = process.env[variableName];
    if (value === undefined || value === null) {
      missingVariables.push(variableName);
    } else {
      variables[variableName] = value;
    }
  }

  if (missingVariables.length > 0) {
    return { success: false, missingVariables };
  }

  return { success: true, variables };
}
