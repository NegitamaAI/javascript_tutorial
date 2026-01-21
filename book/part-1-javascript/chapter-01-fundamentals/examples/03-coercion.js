/**
 * 🔄 Example 3: Type Coercion - JavaScript's Automatic Type Conversion
 * Understanding when and how JavaScript converts between types
 */

console.log('🔄 Type Coercion Examples');
console.log('=========================\n');

// 1. String Coercion with + Operator
console.log('1. String Coercion (+):');
console.log('  "5" + 3 =', "5" + 3);           // "53"
console.log('  5 + "3" =', 5 + "3");           // "53"
console.log('  "Hello" + 42 =', "Hello" + 42); // "Hello42"
console.log('  true + "!" =', true + "!");     // "true!"

// 2. Numeric Coercion with Other Operators
console.log('\n2. Numeric Coercion (-, *, /, %):');
console.log('  "5" - 3 =', "5" - 3);           // 2
console.log('  "10" * "2" =', "10" * "2");     // 20
console.log('  "15" / "3" =', "15" / "3");     // 5
console.log('  "7" % "3" =', "7" % "3");       // 1

// 3. Boolean Coercion
console.log('\n3. Boolean Coercion:');
console.log('  true + 1 =', true + 1);         // 2
console.log('  false + 1 =', false + 1);       // 1
console.log('  true * 5 =', true * 5);         // 5
console.log('  false * 5 =', false * 5);       // 0

// 4. Comparison Coercion (== vs ===)
console.log('\n4. Comparison Coercion:');
console.log('  "5" == 5:', "5" == 5);          // true (loose equality)
console.log('  "5" === 5:', "5" === 5);        // false (strict equality)
console.log('  0 == false:', 0 == false);      // true
console.log('  0 === false:', 0 === false);    // false
console.log('  "" == 0:', "" == 0);            // true
console.log('  "" === 0:', "" === 0);          // false

// 5. Falsy Values
console.log('\n5. Falsy Values:');
const falsyValues = [false, 0, -0, 0n, "", null, undefined, NaN];
falsyValues.forEach(value => {
    console.log(`  ${JSON.stringify(value)} is falsy:`, !value);
});

// 6. Truthy Values
console.log('\n6. Truthy Values:');
const truthyValues = [true, 1, -1, "0", "false", [], {}, function() {}];
truthyValues.forEach(value => {
    console.log(`  ${JSON.stringify(value)} is truthy:`, !!value);
});

// 7. Array Coercion Edge Cases
console.log('\n7. Array Coercion Edge Cases:');
console.log('  [] + [] =', JSON.stringify([] + []));           // ""
console.log('  [] + {} =', JSON.stringify([] + {}));           // "[object Object]"
console.log('  {} + [] =', JSON.stringify({} + []));           // "[object Object]"
console.log('  [1] + [2] =', JSON.stringify([1] + [2]));       // "12"
console.log('  [1,2] + [3,4] =', JSON.stringify([1,2] + [3,4])); // "1,23,4"

// 8. Unary + Operator (Convert to Number)
console.log('\n8. Unary + Operator:');
console.log('  +"42" =', +"42");               // 42
console.log('  +"3.14" =', +"3.14");           // 3.14
console.log('  +true =', +true);               // 1
console.log('  +false =', +false);             // 0
console.log('  +null =', +null);               // 0
console.log('  +undefined =', +undefined);     // NaN
console.log('  +[] =', +[]);                   // 0
console.log('  +[5] =', +[5]);                 // 5
console.log('  +[1,2] =', +[1,2]);             // NaN

// 9. The Infamous "baNaNa" Example
console.log('\n9. The "baNaNa" Example:');
const expression = 'b' + 'a' + + 'a' + 'a';
console.log('  \'b\' + \'a\' + + \'a\' + \'a\' =', expression);
console.log('  Breakdown:');
console.log('    \'b\' + \'a\' = "ba"');
console.log('    + \'a\' = NaN (unary + on non-numeric string)');
console.log('    "ba" + NaN = "baNaN"');
console.log('    "baNaN" + \'a\' = "baNaNa"');

// 10. Object to Primitive Conversion
console.log('\n10. Object to Primitive Conversion:');

const obj = {
    valueOf() {
        console.log('    valueOf() called');
        return 42;
    },
    toString() {
        console.log('    toString() called');
        return "object";
    }
};

console.log('  obj + 1:');
console.log('  Result:', obj + 1);  // Calls valueOf() first

console.log('  String(obj):');
console.log('  Result:', String(obj));  // Calls toString() first

// 11. Date Coercion
console.log('\n11. Date Coercion:');
const date = new Date('2024-01-01');
console.log('  date + 1000 =', date + 1000);        // String concatenation
console.log('  date - 1000 =', date - 1000);        // Numeric subtraction
console.log('  +date =', +date);                     // Convert to timestamp

// 12. Practical Coercion Gotchas
console.log('\n12. Practical Gotchas:');

// Sorting numbers as strings
const numbers = [1, 10, 2, 20];
console.log('  [1,10,2,20].sort():', numbers.sort());  // [1, 10, 2, 20]
console.log('  Correct sort:', numbers.sort((a, b) => a - b));

// Checking for empty arrays/objects
console.log('  [] == false:', [] == false);          // true
console.log('  {} == false:', {} == false);          // false
console.log('  Better check - [].length === 0:', [].length === 0);

// NaN comparisons
console.log('  NaN == NaN:', NaN == NaN);            // false
console.log('  NaN === NaN:', NaN === NaN);          // false
console.log('  Number.isNaN(NaN):', Number.isNaN(NaN)); // true

// 13. Best Practices
console.log('\n13. Best Practices:');
console.log('  ✅ Use === for comparisons');
console.log('  ✅ Use Number(), String(), Boolean() for explicit conversion');
console.log('  ✅ Use Array.isArray() instead of typeof');
console.log('  ✅ Use Number.isNaN() instead of isNaN()');
console.log('  ✅ Be explicit about type conversions');

// Demonstration of explicit conversions
function explicitConversions(value) {
    return {
        original: value,
        toNumber: Number(value),
        toString: String(value),
        toBoolean: Boolean(value),
        type: typeof value
    };
}

console.log('\n  Explicit conversion examples:');
['42', true, [], {}, null, undefined].forEach(val => {
    console.log('  ', JSON.stringify(explicitConversions(val)));
});

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        explicitConversions
    };
}
