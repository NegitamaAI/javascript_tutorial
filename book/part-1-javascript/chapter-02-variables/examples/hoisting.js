// Hoisting demonstration
console.log(x); // undefined
var x = 1;

// let/const are TDZ
try {
  console.log(y);
} catch (e) {
  console.log('TDZ for y:', e.name);
}
let y = 2;
