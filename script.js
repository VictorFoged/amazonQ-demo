// script.js
// Handles client-side logic for the Simple Post Feed web app.
// Posts are stored in browser memory (not persisted after refresh).
//
// UI elements:
//   - #postInput: textarea for new post text
//   - #submitPost: button to submit a new post
//   - #postFeed: container for displaying posts
//
// To change UI behavior, modify the functions below.

// Array to hold posts in memory
let posts = [];

// Get references to DOM elements
const postInput = document.getElementById('postInput');
const submitPost = document.getElementById('submitPost');
const postFeed = document.getElementById('postFeed');

// Auto-reply message template (Autosvar:andel - joke)
const autoReplyMessage = `Tak for din mail. Jeg er til til afdelingsdag torsdag d. 26. juni og læser derfor kun min mail sporadisk. Hvis din henvendelse haster, er du derfor meget velkommen til at kontakte mig på 29 38 41 13.

Rigtig god dag.

De bedste hilsner
Sofie Hvemon`;

// Render all posts in the feed
function renderPosts() {
    // Clear the feed
    postFeed.innerHTML = '';
    // Add each post as a div
    posts.forEach((post, idx) => {
        // Create a post element
        const postDiv = document.createElement('div');
        postDiv.className = 'post';
        
        // Check if the post is an auto-reply
        if (post.isAutoReply) {
            postDiv.classList.add('auto-reply');
        }
        
        postDiv.textContent = post.text;
        // Optionally, add more UI features here (e.g., delete button)
        postFeed.appendChild(postDiv);
    });
}

// Check if a post should trigger an auto-reply
function shouldTriggerAutoReply(text) {
    // Keywords that might indicate an email or message requiring auto-reply
    const keywords = ['mail', 'email', 'e-mail', 'besked', 'kontakt', 'hej', 'goddag', 'kære', 'hallo', 'andel'];
    
    // Convert text to lowercase for case-insensitive matching
    const lowerText = text.toLowerCase();
    
    // Check if any keyword is present in the text
    return keywords.some(keyword => lowerText.includes(keyword.toLowerCase()));
}

// Handle post submission
function handlePostSubmit() {
    const text = postInput.value.trim();
    if (text.length === 0) return;
    
    // Add new post to the start of the array
    posts.unshift({
        text: text,
        isAutoReply: false
    });
    
    // Check if this post should trigger an auto-reply
    if (shouldTriggerAutoReply(text)) {
        // Add auto-reply post
        setTimeout(() => {
            posts.unshift({
                text: autoReplyMessage,
                isAutoReply: true
            });
            renderPosts();
        }, 1000); // Small delay to simulate response time
    }
    
    // Clear input
    postInput.value = '';
    
    // Re-render posts
    renderPosts();
}

// Attach event listener to the submit button
submitPost.addEventListener('click', handlePostSubmit);

// Optional: allow submitting with Ctrl+Enter
postInput.addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        handlePostSubmit();
    }
});

// Initial render (empty feed)
renderPosts();

// End of script.js
