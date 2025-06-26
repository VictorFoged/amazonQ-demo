// script.js
// Handles client-side logic for the Simple Post Feed web app.
// Posts are stored in browser memory (not persisted after refresh).
//
// UI elements:
//   - #postInput: textarea for new post text
//   - #submitPost: button to submit a new post
//   - #postFeed: container for displaying posts
//   - #backgroundMusic: audio element for music playback
//   - #playPauseBtn: button to control music playback
//   - #volumeSlider: slider to control music volume
//
// To change UI behavior, modify the functions below.

// Array to hold posts in memory
let posts = [];

// Get references to DOM elements
const postInput = document.getElementById('postInput');
const submitPost = document.getElementById('submitPost');
const postFeed = document.getElementById('postFeed');

// Music player elements
const backgroundMusic = document.getElementById('backgroundMusic');
const playPauseBtn = document.getElementById('playPauseBtn');
const volumeSlider = document.getElementById('volumeSlider');
const playPauseIcon = playPauseBtn.querySelector('i');

// Initialize music player
function initMusicPlayer() {
    // Set initial volume
    backgroundMusic.volume = volumeSlider.value;
    
    // Play/Pause button event listener
    playPauseBtn.addEventListener('click', togglePlayPause);
    
    // Volume slider event listener
    volumeSlider.addEventListener('input', () => {
        backgroundMusic.volume = volumeSlider.value;
        updateVolumeIcon();
    });
    
    // Update UI when music ends
    backgroundMusic.addEventListener('ended', () => {
        playPauseIcon.className = 'fas fa-play';
    });
}

// Toggle play/pause for music
function togglePlayPause() {
    if (backgroundMusic.paused) {
        backgroundMusic.play()
            .then(() => {
                playPauseIcon.className = 'fas fa-pause';
            })
            .catch(error => {
                console.error('Error playing music:', error);
                alert('Could not play music. Please try again.');
            });
    } else {
        backgroundMusic.pause();
        playPauseIcon.className = 'fas fa-play';
    }
}

// Update volume icon based on current volume
function updateVolumeIcon() {
    const volumeIcon = document.querySelector('.volume-control i');
    const volume = backgroundMusic.volume;
    
    if (volume === 0) {
        volumeIcon.className = 'fas fa-volume-mute';
    } else if (volume < 0.5) {
        volumeIcon.className = 'fas fa-volume-down';
    } else {
        volumeIcon.className = 'fas fa-volume-up';
    }
}

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
    
    // Play a sound effect when posting (optional)
    if (!backgroundMusic.paused) {
        // If music is already playing, we could add a small sound effect here
        // For now, we'll just ensure music is playing when posting
        backgroundMusic.play().catch(e => console.error('Could not play music:', e));
    }
}

// Attach event listener to the submit button
submitPost.addEventListener('click', handlePostSubmit);

// Optional: allow submitting with Ctrl+Enter
postInput.addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        handlePostSubmit();
    }
});

// Initialize the music player
initMusicPlayer();

// Initial render (empty feed)
renderPosts();

// End of script.js
