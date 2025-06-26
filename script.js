// script.js
// Handles client-side logic for the Simple Post Feed web app.
// Posts are stored in browser memory (not persisted after refresh).
//
// UI elements:
//   - #postInput: textarea for new post text
//   - #authorInput: input field for author name
//   - #submitPost: button to submit a new post
//   - #postFeed: container for displaying posts
//
// To change UI behavior, modify the functions below.

// Array to hold posts in memory
let posts = [];

// Get references to DOM elements
const postInput = document.getElementById('postInput');
const authorInput = document.getElementById('authorInput');
const submitPost = document.getElementById('submitPost');
const postFeed = document.getElementById('postFeed');

// Render all posts in the feed
function renderPosts() {
    // Clear the feed
    postFeed.innerHTML = '';
    // Add each post as a div
    posts.forEach((post, idx) => {
        // Create a post element
        const postDiv = document.createElement('div');
        postDiv.className = 'post';
        
        // Create post content
        const postContent = document.createElement('div');
        postContent.className = 'post-content';
        postContent.textContent = post.text;
        
        // Create author element if author exists
        if (post.author) {
            const authorElement = document.createElement('div');
            authorElement.className = 'post-author';
            authorElement.textContent = `Posted by: ${post.author}`;
            postDiv.appendChild(authorElement);
        }
        
        // Add post content
        postDiv.appendChild(postContent);
        
        // Optionally, add more UI features here (e.g., delete button)
        postFeed.appendChild(postDiv);
    });
}

// Handle post submission
function handlePostSubmit() {
    const text = postInput.value.trim();
    if (text.length === 0) return;
    
    const author = authorInput.value.trim();
    
    // Add new post to the start of the array
    posts.unshift({
        text: text,
        author: author
    });
    
    // Clear inputs
    postInput.value = '';
    authorInput.value = '';
    
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
