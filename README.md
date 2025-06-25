# Post Feed Application

## Project Description

This project demonstrates how the future of software development could look like. It's a simple yet functional web application that allows users to create and view posts in a feed interface.

## Features

- Create and publish posts with a simple text input
- View posts in a chronological feed (newest first)
- Clean, responsive user interface
- Submit posts using the button or with Ctrl+Enter keyboard shortcut
- **Theme Selector**: Toggle between light and dark mode using Victor Foged's image as a button
- **AI Theme Generator**: Create custom themes based on text descriptions

## Technology Stack

- **Frontend**: HTML5, CSS3, and vanilla JavaScript
- **Storage**: In-memory (client-side) storage with theme preferences saved in localStorage
- **Design**: Responsive design with modern UI elements and theme support

## Theme Features

### Light/Dark Mode Toggle

The application includes a theme toggle button featuring Victor Foged's image. Clicking this button switches between light and dark modes. The selected theme is saved in localStorage and persists between sessions.

### AI Theme Generator

The AI Theme Generator allows users to create custom themes by entering descriptive text. The application will generate a color scheme based on the input text and apply it to the interface.

### Replacing the Placeholder Image

To use Victor Foged's actual image:

1. Find an appropriate image of Victor Foged
2. Replace the placeholder URL in `index.html` line 14:
   ```html
   <img src="https://via.placeholder.com/50?text=VF" alt="Theme Toggle - Victor Foged" id="themeToggleImg">
   ```
   with the actual image URL:
   ```html
   <img src="path/to/victor-foged-image.jpg" alt="Theme Toggle - Victor Foged" id="themeToggleImg">
   ```

## Future of Software Development

This project exemplifies several aspects of modern and future software development:

1. **Simplicity and Clarity**: Clean code structure with clear separation of concerns
2. **Responsive Design**: Works seamlessly across different device sizes
3. **User Experience Focus**: Intuitive interface with keyboard shortcuts and theme options
4. **Modular Architecture**: Separate HTML, CSS, and JavaScript files for better maintainability
5. **Documentation**: Well-commented code that explains functionality
6. **Personalization**: Theme options that adapt to user preferences

## Getting Started

To run this application:

1. Clone this repository
2. Open `index.html` in your web browser
3. Start creating posts!
4. Try the theme toggle and AI theme generator

## Future Enhancements

- Persistent storage using local storage or a backend database
- User authentication
- Social features like comments and likes
- Rich text formatting options
- More advanced AI theme generation with external API integration

## License

This project is intended for demonstration purposes.