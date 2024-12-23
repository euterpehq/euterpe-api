export function parseBool(value: any): boolean {
  if (typeof value === 'boolean') {
    return value; // Return the value if it's already a boolean
  }

  if (typeof value === 'string') {
    const normalized = value.trim().toLowerCase();
    if (normalized === 'true') return true;
    if (normalized === 'false') return false;
    if (normalized === '') return false; // Default to false for empty strings
  }

  return false; // Default to false for other invalid inputs
}
