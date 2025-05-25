export type SchemaError = {
  errors: string[];
  path: string;
}[];

export function isSchemaError(error: unknown): error is SchemaError {
  // Basic array check
  if (!Array.isArray(error)) return false;

  return error.every((item: unknown): item is SchemaError[0] => {
    // Must be an object
    if (typeof item !== "object" || item === null) return false;

    const { errors, path } = item as Partial<{
      errors: unknown;
      path: unknown;
    }>;

    // Check 'path' is a string
    if (typeof path !== "string") return false;

    // Check 'errors' is an array of strings
    if (!Array.isArray(errors)) return false;

    return errors.every((err) => typeof err === "string");
  });
}
