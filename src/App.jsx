import { useState, useEffect } from "react";
import "./index.css";

function App() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(false);

  const [likedQuotes, setLikedQuotes] = useState(() => {
    const saved = localStorage.getItem("likes");
    return saved ? JSON.parse(saved) : [];
  });

  const [searchTerm, setSearchTerm] = useState("");

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

  // Save likes
  useEffect(() => {
    localStorage.setItem("likes", JSON.stringify(likedQuotes));
  }, [likedQuotes]);

  // Fetch on load
  useEffect(() => {
    fetchQuote();
  }, []);

  // Toggle like from main card
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

  // 🔥 Remove like directly from list
  const removeLike = (quoteToRemove) => {
    setLikedQuotes(
      likedQuotes.filter((item) => item.quote !== quoteToRemove)
    );
  };

  const isLiked = likedQuotes.some(
    (item) => item.quote === quote
  );

  // Filter liked quotes
  const filteredQuotes = likedQuotes.filter((item) =>
    item.quote.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.author.toLowerCase().includes(searchTerm.toLowerCase())
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

        {/* Search */}
        <input
          type="text"
          placeholder="Search liked quotes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "100%",
            padding: "8px",
            marginBottom: "15px",
            background: "var(--bg-soft)",
            border: "1px solid var(--border-subtle)",
            color: "var(--text-primary)",
            borderRadius: "6px"
          }}
        />

        {filteredQuotes.length === 0 ? (
          <p style={{ color: "var(--text-muted)" }}>
            No matching quotes found.
          </p>
        ) : (
          filteredQuotes.map((item, index) => (
            <div key={index} className="liked-item">
              <p>"{item.quote}"</p>
              <small style={{ color: "var(--text-muted)" }}>
                - {item.author}
              </small>

              {/* 🔥 Unlike button inside list */}
              <div style={{ marginTop: "10px" }}>
                <button onClick={() => removeLike(item.quote)}>
                  Unlike ❌
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;