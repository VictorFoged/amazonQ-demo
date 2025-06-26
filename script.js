// script.js
// Handles client-side logic for the Simple Post Feed web app.
// Posts are stored in browser memory (not persisted after refresh).
//
// UI elements:
//   - #postInput: textarea for new post text
//   - #imageUrlInput: input for image URL
//   - #nejTilAtomkraftBtn: button to add anti-nuclear power image
//   - #submitPost: button to submit a new post
//   - #postFeed: container for displaying posts
//   - #toggleWind: button to toggle wind turbine animation
//
// To change UI behavior, modify the functions below.

// Array to hold posts in memory
let posts = [];

// URL for the "Nej til atomkraft" image
const nejTilAtomkraftImageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Anti-Atomkraft-Logo.svg/800px-Anti-Atomkraft-Logo.svg.png";

// Get references to DOM elements
const postInput = document.getElementById('postInput');
const imageUrlInput = document.getElementById('imageUrlInput');
const nejTilAtomkraftBtn = document.getElementById('nejTilAtomkraftBtn');
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
    posts.forEach((post, idx) => {
        // Create a post element
        const postDiv = document.createElement('div');
        postDiv.className = 'post';
        
        // Add text content if available
        if (post.text) {
            const textDiv = document.createElement('div');
            textDiv.className = 'post-content';
            textDiv.textContent = post.text;
            postDiv.appendChild(textDiv);
        }
        
        // Add image if available
        if (post.imageUrl) {
            const img = document.createElement('img');
            img.src = post.imageUrl;
            img.className = 'post-image';
            img.alt = 'Post image';
            img.onerror = function() {
                this.onerror = null;
                this.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
            };
            postDiv.appendChild(img);
        }
        
        // Optionally, add more UI features here (e.g., delete button)
        postFeed.appendChild(postDiv);
    });
}

// Handle post submission
function handlePostSubmit() {
    const text = postInput.value.trim();
    const imageUrl = imageUrlInput.value.trim();
    
    // Only post if there's text or an image
    if (text.length === 0 && imageUrl.length === 0) return;
    
    // Create post object
    const post = {
        text: text || null,
        imageUrl: imageUrl || null
    };
    
    // Add new post to the start of the array
    posts.unshift(post);
    
    // Clear inputs
    postInput.value = '';
    imageUrlInput.value = '';
    
    // Re-render posts
    renderPosts();
}

// Handle adding the "Nej til atomkraft" image
function addNejTilAtomkraftImage() {
    imageUrlInput.value = nejTilAtomkraftImageUrl;
    
    // If no text is entered, add a default message
    if (postInput.value.trim() === '') {
        postInput.value = 'Nej til atomkraft';
    }
}

// Attach event listeners
submitPost.addEventListener('click', handlePostSubmit);
nejTilAtomkraftBtn.addEventListener('click', addNejTilAtomkraftImage);

// Optional: allow submitting with Ctrl+Enter
postInput.addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        handlePostSubmit();
    }
});

// Initial render (empty feed)
renderPosts();

// End of script.js
