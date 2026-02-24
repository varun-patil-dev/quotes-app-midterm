import { useState, useEffect } from "react";
import "./index.css";

function App() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(false);
  const [likedQuotes, setLikedQuotes] = useState([]);

  // Fetch random quote
  const fetchQuote = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "https://dummyjson.com/quotes/random"
      );

      const data = await response.json();

      setQuote(data.quote);
      setAuthor(data.author);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching quote:", error);
      setLoading(false);
    }
  };

  // Load likes from localStorage once
  useEffect(() => {
    const savedLikes = JSON.parse(localStorage.getItem("likes"));
    if (savedLikes) {
      setLikedQuotes(savedLikes);
    }
  }, []);

  // Save likes whenever likedQuotes changes
  useEffect(() => {
    localStorage.setItem("likes", JSON.stringify(likedQuotes));
  }, [likedQuotes]);

  // Fetch quote when app loads
  useEffect(() => {
    fetchQuote();
  }, []);

  // Toggle like/unlike
  const toggleLike = () => {
    const alreadyLiked = likedQuotes.find(
      (item) => item.quote === quote
    );

    if (alreadyLiked) {
      setLikedQuotes(
        likedQuotes.filter((item) => item.quote !== quote)
      );
    } else {
      setLikedQuotes([
        ...likedQuotes,
        { quote: quote, author: author },
      ]);
    }
  };

  const isLiked = likedQuotes.some(
    (item) => item.quote === quote
  );

  return (
    <div className="app">
      <h1 style={{ marginBottom: "30px" }}>
        Daily Motivation Dashboard
      </h1>

      <div className="card">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <p className="quote">"{quote}"</p>
            <p className="author">- {author}</p>
          </>
        )}

        <div className="button-group">
          <button onClick={fetchQuote} disabled={loading}>
            New Quote
          </button>

          <button onClick={toggleLike}>
            {isLiked ? "Unlike 💔" : "Like ❤️"}
          </button>
        </div>

        <p style={{ marginTop: "20px" }}>
          Total Liked: {likedQuotes.length}
        </p>
      </div>

      <div className="liked-section">
        <h2 style={{ marginBottom: "15px" }}>
          Liked Quotes
        </h2>

        {likedQuotes.length === 0 ? (
          <p style={{ color: "var(--text-muted)" }}>
            No liked quotes yet.
          </p>
        ) : (
          likedQuotes.map((item, index) => (
            <div key={index} className="liked-item">
              <p>"{item.quote}"</p>
              <small style={{ color: "var(--text-muted)" }}>
                - {item.author}
              </small>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;