import assert from 'node:assert/strict';
import { typeOf, extract } from '../projects/type-aware-extractor.js';

assert.equal(typeOf(1), 'number');
assert.equal(typeOf([]), 'array');
assert.equal(typeOf(new Date('2020-01-01')), 'date');

const out = extract({ a: 1, d: new Date('2020-01-01'), arr: [2, { b: 3 }] });
assert.equal(out.arr[1].b, 3);
assert.ok(typeof out.d === 'string' && out.d.includes('2020-01-01'));

console.log('✅ extractor tests passed');
