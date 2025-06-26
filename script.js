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

// Render all posts in the feed
function renderPosts() {
    // Store the logo element before clearing
    const logo = document.querySelector('.andel-logo');
    const logoHTML = logo ? logo.innerHTML : `
        <svg width="60" height="20" viewBox="0 0 60 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M5,10 L10,5 L15,10 L10,15 Z" fill="#0000ff" />
            <text x="20" y="14" fill="#0000ff" font-weight="bold" font-family="Arial, sans-serif">Andel</text>
        </svg>
    `;
    
    // Clear the feed
    postFeed.innerHTML = '';
    
    // Re-add the logo first
    const logoDiv = document.createElement('div');
    logoDiv.className = 'andel-logo';
    logoDiv.innerHTML = logoHTML;
    postFeed.appendChild(logoDiv);
    
    // Add each post as a div
    posts.forEach((text, idx) => {
        // Create a post element
        const postDiv = document.createElement('div');
        postDiv.className = 'post';
        postDiv.textContent = text;
        // Optionally, add more UI features here (e.g., delete button)
        postFeed.appendChild(postDiv);
    });
}

// Handle post submission
function handlePostSubmit() {
    const text = postInput.value.trim();
    if (text.length === 0) return;
    // Add new post to the start of the array
    posts.unshift(text);
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
