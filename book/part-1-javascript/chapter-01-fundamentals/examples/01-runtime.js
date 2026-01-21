/**
 * 🔧 Example 1: JavaScript Runtime Understanding
 * Learn how JavaScript executes in different environments
 */

console.log('🚀 JavaScript Runtime Examples');
console.log('===============================\n');

// 1. Runtime Detection
console.log('1. Runtime Environment Detection:');
function detectRuntime() {
    if (typeof window !== 'undefined') {
        return {
            environment: 'Browser',
            engine: navigator.userAgent.includes('Chrome') ? 'V8' : 
                   navigator.userAgent.includes('Firefox') ? 'SpiderMonkey' : 
                   navigator.userAgent.includes('Safari') ? 'JavaScriptCore' : 'Unknown',
            apis: ['DOM', 'fetch', 'localStorage', 'sessionStorage']
        };
    } else if (typeof global !== 'undefined') {
        return {
            environment: 'Node.js',
            engine: 'V8',
            apis: ['fs', 'path', 'http', 'crypto']
        };
    } else {
        return {
            environment: 'Unknown',
            engine: 'Unknown',
            apis: []
        };
    }
}

const runtime = detectRuntime();
console.log('Runtime:', runtime);

// 2. Call Stack Demonstration
console.log('\n2. Call Stack Execution:');
function first() {
    console.log('  → Executing first()');
    second();
    console.log('  ← Returning from first()');
}

function second() {
    console.log('    → Executing second()');
    third();
    console.log('    ← Returning from second()');
}

function third() {
    console.log('      → Executing third()');
    console.log('      ← Returning from third()');
}

first();

// 3. Execution Context Creation
console.log('\n3. Execution Context:');
var globalVariable = 'I am global';

function demonstrateContext() {
    var localVariable = 'I am local';
    
    console.log('  Global context accessible:', globalVariable);
    console.log('  Local context created:', localVariable);
    
    // Inner function creates new context
    function innerFunction() {
        var innerVariable = 'I am inner';
        console.log('  Inner context - Global:', globalVariable);
        console.log('  Inner context - Local:', localVariable);
        console.log('  Inner context - Inner:', innerVariable);
    }
    
    innerFunction();
}

demonstrateContext();

// 4. Web APIs (Browser only)
if (typeof window !== 'undefined') {
    console.log('\n4. Browser Web APIs:');
    console.log('  Available APIs:');
    console.log('  - DOM:', typeof document !== 'undefined');
    console.log('  - Fetch:', typeof fetch !== 'undefined');
    console.log('  - LocalStorage:', typeof localStorage !== 'undefined');
    console.log('  - Geolocation:', typeof navigator.geolocation !== 'undefined');
} else {
    console.log('\n4. Node.js APIs:');
    console.log('  Available APIs:');
    console.log('  - Process:', typeof process !== 'undefined');
    console.log('  - Global:', typeof global !== 'undefined');
    console.log('  - Buffer:', typeof Buffer !== 'undefined');
}

// 5. Runtime Performance
console.log('\n5. Runtime Performance:');
console.time('Runtime Performance Test');

// Simulate some work
let sum = 0;
for (let i = 0; i < 1000000; i++) {
    sum += i;
}

console.timeEnd('Runtime Performance Test');
console.log('  Calculated sum:', sum);

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { detectRuntime, demonstrateContext };
}
