export default function idGenerator() {
  return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
}

export function passwordGenerator() {
  return (
    Math.random().toString(32).slice(2) +
    "-" +
    Math.random().toString(32).slice(2) +
    "-" +
    Math.random().toString(32).slice(2)
  );
} 