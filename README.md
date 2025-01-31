# Tflix - Movie Search Application

A modern React application for searching and discovering movies, featuring trending movies and real-time search functionality.

## Features

- Real-time movie search with debounced input
- Trending movies section
- Responsive grid layout for movie displays
- Integration with TMDB (The Movie Database) API
- Search history tracking with Appwrite backend
- Loading states and error handling
- Responsive design for all screen sizes

## Tech Stack

- React
- Vite
- Tailwind CSS
- react-use (for debounced search)
- Appwrite (backend services)
- TMDB API

## Prerequisites

Before running this project, make sure you have:

1. Node.js installed
2. TMDB API key
3. Appwrite account and project setup
4. Environment variables configured

## Environment Variables

Create a `.env` file in the root directory with:

```
VITE_TMDB_API_KEY=your_tmdb_api_key_here
```

## Project Structure

```
src/
├── components/
│   ├── Search.jsx
│   ├── Spinner.jsx
│   ├── MovieCard.jsx
│   └── Footer.jsx
├── appwrite.js
└── App.jsx
```

## API Integration

The application uses the TMDB API v3 with the following endpoints:

- Movie Search: `/search/movie`
- Discover Movies: `/discover/movie`
- Authentication using Bearer token

## Features in Detail

### Search Functionality
- Debounced search implementation to prevent excessive API calls
- 500ms delay between user input and API request
- Real-time results update

### Trending Movies
- Horizontal scrollable list
- Numbered display of trending movies
- Movie poster display with titles

### Movie Grid
- Responsive grid layout
- Supports various screen sizes
- Displays movie cards with detailed information

### Error Handling
- Loading states with spinner component
- Error message display
- Graceful fallback for failed API requests

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file and add your TMDB API key

4. Run the development server:
```bash
npm run dev
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details

## Acknowledgments

- TMDB API for movie data
- Appwrite for backend services
- React and Vite communities
- Tailwind CSS for styling

## Contact

For any questions or concerns, please open an issue in the repository.
