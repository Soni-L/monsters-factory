
//hashes the a string to a correspoding color code
export const stringToColorCode = (text: string) => {
  // Generate a hash code from the input text
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = text.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Convert hash code to hex
  const color =
    ((hash >> 16) & 0xff).toString(16).padStart(2, "0") +
    ((hash >> 8) & 0xff).toString(16).padStart(2, "0") +
    (hash & 0xff).toString(16).padStart(2, "0");

  return color.toUpperCase();
}
