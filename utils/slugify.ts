export default function slugify(
  input: string,
  separator: string = "-",
): string {
  return input
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, separator) // Replace spaces with separator
    .replace(/[^a-z0-9\-]/g, "") // Remove non-alphanumeric characters except separator
    .replace(new RegExp(separator + "+", "g"), separator); // Avoid multiple separators
}
