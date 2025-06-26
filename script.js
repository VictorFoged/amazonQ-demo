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

// Array of energy-related jokes
const energyJokes = [
    "Why don't scientists trust atoms? Because they make up everything, even energy!",
    "I was going to tell you a joke about electricity, but I was afraid you wouldn't be properly conducted.",
    "What did the light bulb say to its sweetheart? I watt you a lot!",
    "Why did the lights go out? Because they liked each other!",
    "What's an electrician's favorite ice cream flavor? Shock-olate!",
    "Why are wind turbines so cool? Because they're big fans!",
    "What did the nuclear physicist have for lunch? Fission chips!",
    "How many electricians does it take to change a light bulb? Just one, but they charge a lot!",
    "What's a renewable resource's favorite movie? Gone with the Wind!",
    "Why did the solar panel go to school? To get a little brighter!",
    "What did one uranium rod say to another? 'Stop radiating negativity!'",
    "I'm reading a book about anti-gravity. It's impossible to put down!",
    "What's a battery's favorite dance? The electric slide!",
    "Why don't they tell jokes about electricity? Too shocking!",
    "What did the energy bar say to the candy bar? 'I'm the powerhouse here!'"
];

// Get references to DOM elements
const postInput = document.getElementById('postInput');
const submitPost = document.getElementById('submitPost');
const postFeed = document.getElementById('postFeed');

// Render all posts in the feed
function renderPosts() {
    // Clear the feed
    postFeed.innerHTML = '';
    // Add each post as a div
    posts.forEach((text, idx) => {
        // Create a post element
        const postDiv = document.createElement('div');
        postDiv.className = 'post';
        
        // Replace newlines with <br> tags for proper HTML display
        postDiv.innerHTML = text.replace(/\n/g, '<br>');
        
        // Optionally, add more UI features here (e.g., delete button)
        postFeed.appendChild(postDiv);
    });
}

// Get a random joke from the energyJokes array
function getRandomJoke() {
    const randomIndex = Math.floor(Math.random() * energyJokes.length);
    return energyJokes[randomIndex];
}

// Handle post submission
function handlePostSubmit() {
    const text = postInput.value.trim();
    if (text.length === 0) return;
    
    // Get a random energy joke
    const joke = getRandomJoke();
    
    // Combine the user's post with the joke
    const postWithJoke = `${text}\n\n<span>😄 Energy Joke: ${joke}</span>`;
    
    // Add new post to the start of the array
    posts.unshift(postWithJoke);
    
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
