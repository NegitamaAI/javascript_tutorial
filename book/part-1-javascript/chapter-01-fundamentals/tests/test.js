/**
 * 🧪 Chapter 1 Tests - Verify JavaScript Fundamentals
 */

// Simple test framework
function test(description, testFn) {
    try {
        testFn();
        console.log(`✅ ${description}`);
    } catch (error) {
        console.log(`❌ ${description}`);
        console.error(`   Error: ${error.message}`);
    }
}

function assert(condition, message) {
    if (!condition) {
        throw new Error(message || 'Assertion failed');
    }
}

console.log('🧪 Running Chapter 1 Tests');
console.log('============================\n');

// Test 1: Memory Model Understanding
test('Memory Model - Primitives vs References', () => {
    // Primitive test
    let a = 5;
    let b = a;
    b = 10;
    assert(a === 5, 'Primitive a should remain 5');
    assert(b === 10, 'Primitive b should be 10');
    
    // Reference test
    let obj1 = { value: 5 };
    let obj2 = obj1;
    obj2.value = 10;
    assert(obj1.value === 10, 'obj1.value should be 10 (shared reference)');
    assert(obj2.value === 10, 'obj2.value should be 10');
    assert(obj1 === obj2, 'obj1 and obj2 should reference same object');
});

// Test 2: Type Coercion
test('Type Coercion Rules', () => {
    assert('5' + 3 === '53', 'String concatenation should work');
    assert('5' - 3 === 2, 'String to number conversion should work');
    assert(true + 1 === 2, 'Boolean to number conversion should work');
    assert('5' == 5, 'Loose equality should allow coercion');
    assert('5' !== 5, 'Strict inequality should prevent coercion');
});

// Test 3: Execution Context
test('Execution Context and Scope', () => {
    var globalVar = 'global';
    
    function testScope() {
        var localVar = 'local';
        assert(globalVar === 'global', 'Should access global variable');
        assert(localVar === 'local', 'Should access local variable');
        return localVar;
    }
    
    assert(testScope() === 'local', 'Function should return local variable');
    assert(globalVar === 'global', 'Global variable should remain accessible');
});

// Test 4: Console Methods (basic functionality)
test('Console Methods Availability', () => {
    assert(typeof console.log === 'function', 'console.log should be available');
    assert(typeof console.error === 'function', 'console.error should be available');
    assert(typeof console.warn === 'function', 'console.warn should be available');
    assert(typeof console.info === 'function', 'console.info should be available');
    assert(typeof console.table === 'function', 'console.table should be available');
    assert(typeof console.time === 'function', 'console.time should be available');
    assert(typeof console.timeEnd === 'function', 'console.timeEnd should be available');
});

// Test 5: Automation Recorder (if available)
if (typeof require !== 'undefined') {
    try {
        const BasicAutomationRecorder = require('./automation-recorder.js');
        
        test('BasicAutomationRecorder Class', () => {
            const recorder = new BasicAutomationRecorder();
            assert(recorder instanceof BasicAutomationRecorder, 'Should create instance');
            assert(Array.isArray(recorder.actions), 'Should have actions array');
            assert(recorder.isRecording === false, 'Should start not recording');
            assert(typeof recorder.startRecording === 'function', 'Should have startRecording method');
            assert(typeof recorder.stopRecording === 'function', 'Should have stopRecording method');
        });
        
    } catch (error) {
        console.log('⚠️ BasicAutomationRecorder tests skipped (browser environment needed)');
    }
}

// Test 6: Advanced Type Coercion Edge Cases
test('Advanced Type Coercion Edge Cases', () => {
    assert([] + [] === '', 'Empty arrays should concatenate to empty string');
    assert([] + {} === '[object Object]', 'Array + object should stringify object');
    assert(+[] === 0, 'Empty array should convert to 0');
    assert(+[1] === 1, 'Single element array should convert to number');
    assert(isNaN(+[1,2]), 'Multi-element array should convert to NaN');
});

// Test 7: Variable Hoisting Behavior
test('Variable Hoisting Behavior', () => {
    // Test var hoisting
    function testVarHoisting() {
        assert(typeof hoistedVar === 'undefined', 'Hoisted var should be undefined before declaration');
        var hoistedVar = 'initialized';
        assert(hoistedVar === 'initialized', 'Hoisted var should be initialized after assignment');
    }
    
    testVarHoisting();
});

// Test 8: Function Types and Behavior
test('Function Declaration vs Expression', () => {
    // Function declaration (hoisted)
    assert(typeof declaredFunction === 'function', 'Function declaration should be hoisted');
    
    function declaredFunction() {
        return 'declared';
    }
    
    // Function expression (not hoisted)
    assert(typeof expressionFunction === 'undefined', 'Function expression should not be hoisted');
    
    var expressionFunction = function() {
        return 'expression';
    };
    
    assert(typeof expressionFunction === 'function', 'Function expression should be function after assignment');
});

console.log('\n🎯 Test Summary Complete');
console.log('Run with: node test.js');
console.log('Or in browser: Open demo.html and check console');
