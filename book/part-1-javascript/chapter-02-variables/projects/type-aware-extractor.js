export function typeOf(value) {
  const raw = Object.prototype.toString.call(value);
  return raw.slice(8, -1).toLowerCase();
}

export function extract(input) {
  const t = typeOf(input);
  switch (t) {
    case 'array':
      return input.map(extract);
    case 'date':
      return input.toISOString();
    case 'object':
      return Object.fromEntries(Object.entries(input).map(([k, v]) => [k, extract(v)]));
    default:
      return input;
  }
}

// Demo when run directly (Node >= 18 with ES modules)
if (import.meta.url === `file://${process.argv[1]}`) {
  console.log(extract({ a: 1, b: [new Date('2024-01-01'), { c: 3 }] }));
}
