/**
 * 🧠 Example 2: Memory Model - Stack vs Heap
 * Understanding how JavaScript stores different types of data
 */

console.log('🧠 Memory Model Examples');
console.log('========================\n');

// 1. Stack Storage (Primitives)
console.log('1. Stack Storage - Primitives:');
let num1 = 42;
let num2 = num1;  // Copy value
num2 = 100;

console.log('  num1:', num1);  // 42 (unchanged)
console.log('  num2:', num2);  // 100 (changed)
console.log('  Independent?', num1 !== num2);  // true

let str1 = "Hello";
let str2 = str1;  // Copy value
str2 = "World";

console.log('  str1:', str1);  // "Hello" (unchanged)
console.log('  str2:', str2);  // "World" (changed)

// 2. Heap Storage (Objects)
console.log('\n2. Heap Storage - Objects:');
let obj1 = { name: "Alice", age: 25 };
let obj2 = obj1;  // Copy reference
obj2.age = 30;

console.log('  obj1:', obj1);  // { name: "Alice", age: 30 }
console.log('  obj2:', obj2);  // { name: "Alice", age: 30 }
console.log('  Same reference?', obj1 === obj2);  // true

// 3. Array Reference Behavior
console.log('\n3. Array Reference Behavior:');
let arr1 = [1, 2, 3];
let arr2 = arr1;  // Copy reference
arr2.push(4);

console.log('  arr1:', arr1);  // [1, 2, 3, 4]
console.log('  arr2:', arr2);  // [1, 2, 3, 4]
console.log('  Same array?', arr1 === arr2);  // true

// 4. Creating Independent Copies
console.log('\n4. Creating Independent Copies:');

// Shallow copy methods
let original = { name: "Bob", scores: [85, 90, 78] };

// Method 1: Object.assign
let copy1 = Object.assign({}, original);
copy1.name = "Charlie";
console.log('  Original after Object.assign:', original.name);  // "Bob"
console.log('  Copy1 name:', copy1.name);  // "Charlie"

// Method 2: Spread operator
let copy2 = { ...original };
copy2.name = "David";
console.log('  Original after spread:', original.name);  // "Bob"
console.log('  Copy2 name:', copy2.name);  // "David"

// Shallow copy limitation
copy1.scores.push(95);
console.log('  Original scores after push:', original.scores);  // [85, 90, 78, 95]
console.log('  Nested arrays still shared!');

// 5. Deep Copy (JSON method)
console.log('\n5. Deep Copy:');
let deepOriginal = { 
    name: "Eve", 
    details: { age: 28, city: "NYC" },
    hobbies: ["reading", "coding"]
};

let deepCopy = JSON.parse(JSON.stringify(deepOriginal));
deepCopy.details.age = 30;
deepCopy.hobbies.push("gaming");

console.log('  Original age:', deepOriginal.details.age);  // 28
console.log('  Copy age:', deepCopy.details.age);  // 30
console.log('  Original hobbies:', deepOriginal.hobbies);  // ["reading", "coding"]
console.log('  Copy hobbies:', deepCopy.hobbies);  // ["reading", "coding", "gaming"]

// 6. Memory Usage Demonstration
console.log('\n6. Memory Usage Patterns:');

function createLargeObject() {
    return {
        data: new Array(1000).fill(0).map((_, i) => ({ id: i, value: Math.random() })),
        timestamp: Date.now()
    };
}

// Creating multiple references to same object (efficient)
let sharedData = createLargeObject();
let ref1 = sharedData;
let ref2 = sharedData;
let ref3 = sharedData;

console.log('  Shared references point to same object:', ref1 === ref2 && ref2 === ref3);

// Creating multiple copies (memory intensive)
let copy_1 = { ...createLargeObject() };
let copy_2 = { ...createLargeObject() };
let copy_3 = { ...createLargeObject() };

console.log('  Independent copies are different objects:', 
    copy_1 !== copy_2 && copy_2 !== copy_3);

// 7. Function Parameters (Pass by Value vs Reference)
console.log('\n7. Function Parameters:');

function modifyPrimitive(x) {
    x = x + 10;
    return x;
}

function modifyObject(obj) {
    obj.modified = true;
    return obj;
}

let number = 5;
let result = modifyPrimitive(number);
console.log('  Original number:', number);  // 5 (unchanged)
console.log('  Function result:', result);  // 15

let testObj = { value: 42 };
modifyObject(testObj);
console.log('  Object after function:', testObj);  // { value: 42, modified: true }

// 8. Memory Leak Prevention
console.log('\n8. Memory Leak Prevention:');

function demonstrateMemoryLeak() {
    let largeArray = new Array(100000).fill('data');
    
    // This creates a closure that keeps largeArray in memory
    return function() {
        return largeArray.length;
    };
}

function demonstrateMemoryCleanup() {
    let largeArray = new Array(100000).fill('data');
    let length = largeArray.length;
    
    // Clear reference to allow garbage collection
    largeArray = null;
    
    return function() {
        return length;  // Only stores the number, not the array
    };
}

let leakyFunction = demonstrateMemoryLeak();
let cleanFunction = demonstrateMemoryCleanup();

console.log('  Leaky function result:', leakyFunction());
console.log('  Clean function result:', cleanFunction());
console.log('  Always clear references when done!');

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        createLargeObject,
        modifyPrimitive,
        modifyObject,
        demonstrateMemoryCleanup
    };
}
