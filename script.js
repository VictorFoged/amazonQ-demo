// script.js
// Handles client-side logic for the Simple Post Feed web app.
// Posts are stored in browser memory (not persisted after refresh).
//
// UI elements:
//   - #postInput: textarea for new post text
//   - #submitPost: button to submit a new post
//   - #postFeed: container for displaying posts
//   - #themeToggle: button to toggle between light and dark mode
//   - #themeInput: input for AI theme generator
//   - #generateTheme: button to generate custom theme
//
// To change UI behavior, modify the functions below.

// Array to hold posts in memory
let posts = [];

// Get references to DOM elements
const postInput = document.getElementById('postInput');
const submitPost = document.getElementById('submitPost');
const postFeed = document.getElementById('postFeed');
const themeToggle = document.getElementById('themeToggle');
const themeInput = document.getElementById('themeInput');
const generateTheme = document.getElementById('generateTheme');
const html = document.documentElement;

// Theme functionality
// Check for saved theme preference or use default
const getCurrentTheme = () => {
    return localStorage.getItem('theme') || 'light';
};

// Apply the current theme
const applyTheme = (theme) => {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
};

// Toggle between light and dark themes
const toggleTheme = () => {
    const currentTheme = getCurrentTheme();
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
};

// Initialize theme from saved preference
const initTheme = () => {
    const savedTheme = getCurrentTheme();
    applyTheme(savedTheme);
};

// AI Theme Generator
const generateCustomTheme = () => {
    const themeDescription = themeInput.value.trim();
    if (themeDescription.length === 0) return;
    
    // Simple theme generation based on input text
    // In a real implementation, this would call an AI service
    const colors = generateColorsFromText(themeDescription);
    
    // Apply the generated theme
    applyCustomTheme(colors);
    
    // Clear the input
    themeInput.value = '';
};

// Generate colors based on text input (simplified version)
const generateColorsFromText = (text) => {
    // This is a simplified version that generates colors based on the text
    // In a real implementation, this would use an AI service
    
    // Generate a hash from the text
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
        hash = text.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    // Generate primary color
    const h = Math.abs(hash % 360);
    const s = 60 + Math.abs((hash >> 8) % 40); // 60-100%
    const l = 40 + Math.abs((hash >> 16) % 20); // 40-60%
    
    const primaryColor = `hsl(${h}, ${s}%, ${l}%)`;
    const textColor = l > 50 ? '#222' : '#f4f4f4';
    const bgColor = l > 50 ? '#f4f4f4' : '#222';
    const containerBg = l > 50 ? '#fff' : '#333';
    const postBg = l > 50 ? '#f9f9f9' : '#444';
    
    return {
        primary: primaryColor,
        text: textColor,
        background: bgColor,
        container: containerBg,
        post: postBg
    };
};

// Apply custom theme
const applyCustomTheme = (colors) => {
    // Create a custom theme
    document.documentElement.style.setProperty('--button-bg', colors.primary);
    document.documentElement.style.setProperty('--button-hover', adjustBrightness(colors.primary, -20));
    document.documentElement.style.setProperty('--background-color', colors.background);
    document.documentElement.style.setProperty('--container-bg', colors.container);
    document.documentElement.style.setProperty('--text-color', colors.text);
    document.documentElement.style.setProperty('--post-bg', colors.post);
    document.documentElement.style.setProperty('--post-text', colors.text);
    
    // Save the custom theme
    localStorage.setItem('customTheme', JSON.stringify(colors));
};

// Helper function to adjust brightness of a color
const adjustBrightness = (color, percent) => {
    // For HSL colors
    if (color.startsWith('hsl')) {
        const hslMatch = color.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
        if (hslMatch) {
            const h = parseInt(hslMatch[1]);
            const s = parseInt(hslMatch[2]);
            const l = Math.max(0, Math.min(100, parseInt(hslMatch[3]) + percent));
            return `hsl(${h}, ${s}%, ${l}%)`;
        }
    }
    return color;
};

// Load custom theme if available
const loadCustomTheme = () => {
    const customTheme = localStorage.getItem('customTheme');
    if (customTheme) {
        applyCustomTheme(JSON.parse(customTheme));
    }
};

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

// Initialize the application
function init() {
    // Initialize theme
    initTheme();
    
    // Load custom theme if available
    loadCustomTheme();
    
    // Attach event listeners
    submitPost.addEventListener('click', handlePostSubmit);
    themeToggle.addEventListener('click', toggleTheme);
    generateTheme.addEventListener('click', generateCustomTheme);
    
    // Optional: allow submitting with Ctrl+Enter
    postInput.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            handlePostSubmit();
        }
    });
    
    // Initial render (empty feed)
    renderPosts();
}

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', init);
