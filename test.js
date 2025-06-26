// test.js
// Simple tests for the auto-reply feature

// Mock DOM elements
const mockElements = {
    postInput: { value: '' },
    postFeed: { innerHTML: '' }
};

// Mock document.getElementById
document.getElementById = function(id) {
    if (id === 'postInput') return mockElements.postInput;
    if (id === 'postFeed') return mockElements.postFeed;
    if (id === 'submitPost') return { addEventListener: jest.fn() };
    return null;
};

// Mock document.createElement
document.createElement = function() {
    return {
        className: '',
        textContent: '',
        classList: {
            add: jest.fn()
        },
        appendChild: jest.fn()
    };
};

// Import the functions from script.js
// Note: In a real test environment, you would use a module system
// For this simple test, we'll assume the functions are available globally

// Test the shouldTriggerAutoReply function
function testShouldTriggerAutoReply() {
    console.log('Testing shouldTriggerAutoReply function...');
    
    // Test cases that should trigger auto-reply
    const shouldTriggerCases = [
        'Can you check my email?',
        'Hello from Andel',
        'Please send me a mail',
        'Hej, hvordan går det?', // Danish greeting
        'Kære kunde', // Danish for "Dear customer"
    ];
    
    // Test cases that should not trigger auto-reply
    const shouldNotTriggerCases = [
        'Hello world',
        'This is a test post',
        'No keywords here',
        '12345',
        ''
    ];
    
    // Test positive cases
    let allPassed = true;
    shouldTriggerCases.forEach(text => {
        const result = shouldTriggerAutoReply(text);
        if (!result) {
            console.error(`FAIL: "${text}" should trigger auto-reply but didn't`);
            allPassed = false;
        }
    });
    
    // Test negative cases
    shouldNotTriggerCases.forEach(text => {
        const result = shouldTriggerAutoReply(text);
        if (result) {
            console.error(`FAIL: "${text}" should NOT trigger auto-reply but did`);
            allPassed = false;
        }
    });
    
    if (allPassed) {
        console.log('All shouldTriggerAutoReply tests PASSED!');
    }
}

// Test the handlePostSubmit function
function testHandlePostSubmit() {
    console.log('Testing handlePostSubmit function...');
    
    // Mock the posts array
    posts = [];
    
    // Test with a regular post
    mockElements.postInput.value = 'This is a regular post';
    handlePostSubmit();
    
    // Verify the post was added
    if (posts.length !== 1) {
        console.error('FAIL: Regular post was not added to posts array');
        return;
    }
    
    if (posts[0].text !== 'This is a regular post') {
        console.error('FAIL: Regular post text is incorrect');
        return;
    }
    
    if (posts[0].isAutoReply) {
        console.error('FAIL: Regular post was incorrectly marked as auto-reply');
        return;
    }
    
    // Test with a post that should trigger auto-reply
    posts = []; // Reset posts array
    mockElements.postInput.value = 'Please check my email from Andel';
    handlePostSubmit();
    
    // We need to wait for the setTimeout to complete
    setTimeout(() => {
        // Verify both posts were added (original post and auto-reply)
        if (posts.length !== 2) {
            console.error('FAIL: Auto-reply was not added to posts array');
            return;
        }
        
        if (!posts[0].isAutoReply) {
            console.error('FAIL: Auto-reply post was not marked correctly');
            return;
        }
        
        if (!posts[0].text.includes('Tak for din mail')) {
            console.error('FAIL: Auto-reply text is incorrect');
            return;
        }
        
        console.log('All handlePostSubmit tests PASSED!');
    }, 1100); // Wait slightly longer than the setTimeout delay
}

// Run the tests
function runTests() {
    console.log('Running tests for auto-reply feature...');
    testShouldTriggerAutoReply();
    testHandlePostSubmit();
}

// In a real environment, you would use a test runner
// For this simple test, we'll just call the function
console.log('Auto-reply feature tests');
console.log('------------------------');
console.log('Note: These tests are meant to be run in a browser environment');
console.log('with the script.js file loaded first.');
console.log('');
console.log('To run these tests:');
console.log('1. Open the browser console');
console.log('2. Call the runTests() function');
console.log('------------------------');