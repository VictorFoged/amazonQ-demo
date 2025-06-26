// script.js
// Handles client-side logic for the Simple Post Feed web app.
// Posts are stored in browser memory (not persisted after refresh).
//
// UI elements:
//   - #postInput: textarea for new post text
//   - #submitPost: button to submit a new post
//   - #postFeed: container for displaying posts
//   - #toggleWind: button to toggle wind turbine animation
//
// To change UI behavior, modify the functions below.

// Array to hold posts in memory
let posts = [];

// Get references to DOM elements
const postInput = document.getElementById('postInput');
const submitPost = document.getElementById('submitPost');
const postFeed = document.getElementById('postFeed');
const toggleWindButton = document.getElementById('toggleWind');
const blades = document.querySelector('.blades');

// Wind turbine state
let isWindy = false;

// Toggle wind turbine animation
function toggleWind() {
    isWindy = !isWindy;
    
    if (isWindy) {
        // Start animation
        blades.classList.add('spinning');
        toggleWindButton.textContent = 'Stop blæsevejr';
        toggleWindButton.classList.add('active');
    } else {
        // Stop animation
        blades.classList.remove('spinning');
        toggleWindButton.textContent = 'Aktiver blæsevejr';
        toggleWindButton.classList.remove('active');
    }
}

// Add event listener to wind button
toggleWindButton.addEventListener('click', toggleWind);

// Render all posts in the feed
function renderPosts() {
    // Clear the feed
    postFeed.innerHTML = '';
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
