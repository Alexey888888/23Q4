export function isDefined<T>(value: T): NonNullable<T> {
  if (value === null || value === undefined) throw new Error(`${value} is null or undefined`);
  return value;
}
