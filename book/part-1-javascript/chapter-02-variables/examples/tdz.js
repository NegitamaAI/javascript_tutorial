function tdzDemo() {
  try {
    console.log(a); // TDZ
  } catch (e) {
    console.log('TDZ caught:', e.name);
  }
  let a = 10;
  console.log('a =', a);
}

tdzDemo();
