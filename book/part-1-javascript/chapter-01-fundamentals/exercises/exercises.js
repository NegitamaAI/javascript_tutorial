/**
 * 🧪 Chapter 1 Exercises - Practice JavaScript Fundamentals
 */

// Exercise 1: Memory Investigation
console.log('🧠 Exercise 1: Memory Investigation');
console.log('=====================================');

function memoryTest() {
    // Primitive values (Stack)
    let num1 = 42;
    let num2 = num1;
    num2 = 100;
    
    console.log('Primitive test:');
    console.log('num1:', num1); // 42
    console.log('num2:', num2); // 100
    console.log('Independent? ', num1 !== num2); // true
    
    // Reference values (Heap)
    let obj1 = { count: 42 };
    let obj2 = obj1;
    obj2.count = 100;
    
    console.log('\nReference test:');
    console.log('obj1.count:', obj1.count); // 100
    console.log('obj2.count:', obj2.count); // 100
    console.log('Same reference? ', obj1 === obj2); // true
    
    // Creating independent copies
    let obj3 = { ...obj1 }; // Shallow copy
    obj3.count = 200;
    
    console.log('\nShallow copy test:');
    console.log('obj1.count:', obj1.count); // 100
    console.log('obj3.count:', obj3.count); // 200
    console.log('Independent? ', obj1 !== obj3); // true
}

memoryTest();

// Exercise 2: Type Coercion Mastery
console.log('\n🔄 Exercise 2: Type Coercion Predictions');
console.log('==========================================');

function coercionQuiz() {
    const tests = [
        { expression: "1 + '2' + 3", expected: "123" },
        { expression: "1 + +'2' + 3", expected: 6 },
        { expression: "'A' - 'B' + 2", expected: NaN },
        { expression: "'A' - 'B' + '2'", expected: "NaN2" },
        { expression: "true + true", expected: 2 },
        { expression: "false + 1", expected: 1 },
        { expression: "'5' == 5", expected: true },
        { expression: "'5' === 5", expected: false }
    ];
    
    tests.forEach(test => {
        const actual = eval(test.expression);
        const correct = actual === test.expected || 
                       (Number.isNaN(actual) && Number.isNaN(test.expected));
        
        console.log(`${test.expression} = ${actual} ${correct ? '✅' : '❌'}`);
        if (!correct) {
            console.log(`  Expected: ${test.expected}`);
        }
    });
}

coercionQuiz();

// Exercise 3: Console Debugging Utility
console.log('\n🐛 Exercise 3: Advanced Console Debugging');
console.log('==========================================');

function createDebugger(name, level = 'info') {
    const levels = { error: 0, warn: 1, info: 2, debug: 3 };
    const currentLevel = levels[level] || 2;
    
    return {
        error(message, data) {
            if (currentLevel >= 0) {
                console.group(`❌ ${name} - ERROR`);
                console.error(message);
                if (data) console.table(data);
                console.trace();
                console.groupEnd();
            }
        },
        
        warn(message, data) {
            if (currentLevel >= 1) {
                console.group(`⚠️ ${name} - WARNING`);
                console.warn(message);
                if (data) console.log(data);
                console.groupEnd();
            }
        },
        
        info(message, data) {
            if (currentLevel >= 2) {
                console.group(`ℹ️ ${name} - INFO`);
                console.info(message);
                if (data) console.log(data);
                console.groupEnd();
            }
        },
        
        debug(message, data) {
            if (currentLevel >= 3) {
                console.group(`🔍 ${name} - DEBUG`);
                console.log(message);
                if (data) console.dir(data);
                console.groupEnd();
            }
        },
        
        time(label) {
            console.time(`⏱️ ${name} - ${label}`);
        },
        
        timeEnd(label) {
            console.timeEnd(`⏱️ ${name} - ${label}`);
        },
        
        assert(condition, message) {
            console.assert(condition, `${name}: ${message}`);
        }
    };
}

// Demo the debugger
const automationDebugger = createDebugger('AutomationEngine', 'debug');

automationDebugger.info('Starting automation sequence');
automationDebugger.time('click-operation');

setTimeout(() => {
    automationDebugger.debug('Element found', { 
        selector: '#submit-btn', 
        coordinates: { x: 100, y: 200 } 
    });
    
    automationDebugger.timeEnd('click-operation');
    automationDebugger.warn('Element not visible, retrying...');
    
    automationDebugger.assert(false, 'This will show an assertion error');
}, 100);

// Exercise 4: Execution Context Exploration
console.log('\n🌐 Exercise 4: Execution Context');
console.log('=================================');

var globalVar = 'I am global';

function outerFunction() {
    var outerVar = 'I am outer';
    
    function innerFunction() {
        var innerVar = 'I am inner';
        
        console.log('From inner function:');
        console.log('- globalVar:', globalVar);
        console.log('- outerVar:', outerVar);
        console.log('- innerVar:', innerVar);
    }
    
    console.log('From outer function:');
    console.log('- globalVar:', globalVar);
    console.log('- outerVar:', outerVar);
    // console.log('- innerVar:', innerVar); // Would cause error
    
    innerFunction();
}

outerFunction();

// Exercise 5: DOM Selector Practice
console.log('\n🎯 Exercise 5: DOM Selector Practice');
console.log('====================================');

function selectorPractice() {
    // Create test elements
    const testContainer = document.createElement('div');
    testContainer.innerHTML = `
        <div id="main-content">
            <button class="primary-btn" data-action="submit">Submit</button>
            <button class="secondary-btn" data-action="cancel">Cancel</button>
            <input type="text" name="username" placeholder="Username">
            <input type="password" name="password" placeholder="Password">
        </div>
    `;
    
    // Selector generation function
    function generateSelector(element) {
        // Priority: data-action > id > name > class > tag
        if (element.dataset.action) {
            return `[data-action="${element.dataset.action}"]`;
        }
        if (element.id) {
            return `#${element.id}`;
        }
        if (element.name) {
            return `[name="${element.name}"]`;
        }
        if (element.className) {
            return `.${element.className.split(' ')[0]}`;
        }
        return element.tagName.toLowerCase();
    }
    
    // Test selector generation
    const elements = testContainer.querySelectorAll('*');
    elements.forEach(el => {
        const selector = generateSelector(el);
        console.log(`Element: ${el.tagName} -> Selector: ${selector}`);
    });
}

if (typeof document !== 'undefined') {
    selectorPractice();
} else {
    console.log('DOM not available in this environment');
}

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        memoryTest,
        coercionQuiz,
        createDebugger
    };
}
