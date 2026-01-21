import { extract } from './type-aware-extractor.js';

console.log('\nDemo extract:\n');
console.log(extract({ now: new Date('2024-01-01'), list: [1, { x: 2 }] }));
