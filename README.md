# Daily Motivation Dashboard - Quotes App

A React application that fetches and displays inspirational quotes with a like system to help students find daily motivation.

**[Live Demo](https://quotes-app-midterm.vercel.app/)**

## Features

### Core Functionality
- **Fetch Random Quotes**: Uses `useEffect` to fetch random quotes from the [DummyJSON Quotes API](https://dummyjson.com)
- **Like System**: Toggle quotes as liked/unliked with visual feedback (❤️ / 💔)
- **Liked Quotes List**: View all liked quotes in a persistent collection
- **Search Functionality**: Search through liked quotes by quote text or author
- **Local Storage Persistence**: Liked quotes are saved to browser localStorage and persist across sessions

### UI/UX Features
- **Loading States**: Shows "Loading..." text while fetching
- **Button States**: New Quote button is disabled while fetching to prevent multiple simultaneous requests
- **Like Counter**: Displays the total count of liked quotes
- **Responsive Design**: Clean, centered layout with intuitive controls
- **Remove Likes**: Directly remove quotes from the liked collection

## Getting Started

### Prerequisites
- Node.js and npm installed

### Installation

```bash
# Clone or navigate to the project directory
cd quotes-app-midterm

# Install dependencies
npm install
```

### Running the App

**Development mode:**
```bash
npm run dev
```
The app will open at `http://localhost:5173`

**Build for production:**
```bash
npm build
```

**Preview production build:**
```bash
npm run preview
```

## Project Structure

```
src/
├── App.jsx           # Main component with quote fetching and like system logic
├── App.css           # Styling for the app
├── main.jsx          # React DOM entry point
└── index.css         # Global styles
```

## State Management

The app uses React's `useState` hook to manage:
- `quote`: Current quote text
- `author`: Current quote author
- `loading`: Loading state while fetching
- `likedQuotes`: Array of liked quotes stored in localStorage
- `searchTerm`: Current search filter for liked quotes

## API Integration

Fetches from: `https://dummyjson.com/quotes/random`

Response format:
```json
{
  "quote": "Quote text here",
  "author": "Author Name"
}
```

## Technologies Used

- **React 19.2**: UI framework
- **Vite 7.3**: Build tool and dev server
- **React Compiler**: Performance optimization
- **localStorage**: Client-side data persistence

## How to Use

1. **View a Quote**: The app displays a random quote on load
2. **Get New Quote**: Click "New Quote" button to fetch a new random quote
3. **Like a Quote**: Click "Like ❤️" to save it to your liked collection
4. **View Liked Quotes**: Scroll to the "Liked Quotes" section to see all saved quotes
5. **Search Likes**: Use the search box to filter liked quotes by text or author
6. **Unlike Quotes**: Click "Unlike ❌" next to any liked quote to remove it

## Browser Support

Works on all modern browsers with localStorage support (Chrome, Firefox, Safari, Edge).
