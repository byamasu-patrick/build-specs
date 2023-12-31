// A function that encodes a string using Base64 encoding
export function encodeUrl(input: string): string {
  return Buffer.from(input).toString("base64"); // Return the Base64-encoded string
}

// A function that decodes a Base64-encoded string
export function decodeUrl(input: string): string {
  return Buffer.from(input, "base64").toString("utf8"); // Return the decoded string
}

export function classNames(
  ...classes: Array<string | undefined | false | null>
): string {
  return classes.filter(Boolean).join(" ");
}

export function convertUnderscoreToCamelCase(str: string) {
  const words = str.split("_");
  const camelCaseWords = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });
  return camelCaseWords.join(" ");
}
