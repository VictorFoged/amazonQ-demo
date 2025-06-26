// script.js
// Handles client-side logic for the Simple Post Feed web app.
// Posts are stored in browser memory (not persisted after refresh).
//
// UI elements:
//   - #postInput: textarea for new post text
//   - #submitPost: button to submit a new post
//   - #postFeed: container for displaying posts
<<<<<<< Q-DEV-issue-34-1750925192
//   - #dancingCatContainer: container for the dancing cat animation
//   - #energySong: audio element for the energy-themed song
=======
//   - #toggleWind: button to toggle wind turbine animation
>>>>>>> main
//
// To change UI behavior, modify the functions below.

// Array to hold posts in memory
let posts = [];

// Get references to DOM elements
const postInput = document.getElementById('postInput');
const submitPost = document.getElementById('submitPost');
const postFeed = document.getElementById('postFeed');
<<<<<<< Q-DEV-issue-34-1750925192
const dancingCatContainer = document.getElementById('dancingCatContainer');
const energySong = document.getElementById('energySong');

// Energy-themed songs array - we'll use a free sample for demonstration
const energySongs = [
    'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'
];
=======
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
>>>>>>> main

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

// Function to show dancing cat and play energy song
function showCatAndPlaySong() {
    // Select a random energy song
    const randomSong = energySongs[Math.floor(Math.random() * energySongs.length)];
    energySong.src = randomSong;
    
    // Play the song
    energySong.play().catch(error => {
        console.error('Error playing the song:', error);
        // Some browsers require user interaction before playing audio
        console.log('Note: Some browsers require user interaction before playing audio');
    });
    
    // Show the dancing cat
    dancingCatContainer.classList.add('show-cat');
    
    // Hide the cat after animation completes (5 seconds)
    setTimeout(() => {
        dancingCatContainer.classList.remove('show-cat');
        // Stop the song after the animation ends
        energySong.pause();
        energySong.currentTime = 0;
    }, 5000);
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
    
    // Show dancing cat and play energy song
    showCatAndPlaySong();
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
