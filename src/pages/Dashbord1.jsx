import React, { useState } from "react";

// Basic Dashboard 
function Dashbord1() {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (!query.trim()) return;

    // If looks like a URL, open directly
    if (query.startsWith("http") || query.includes(".")) {
      const url = query.startsWith("http") ? query : "https://" + query;
      window.open(url, "_blank"); // Must use window.open in extension
    } else {
      // Otherwise search Google
      const searchUrl = "https://www.google.com/search?q=" + encodeURIComponent(query) +"_self" ;
      window.open(searchUrl, "_blank");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
      <div className="flex space-x-2">
        <input
          type="text"
          className="px-4 py-2 rounded text-black"
          placeholder="Search or enter URL"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button
          className="px-4 py-2 bg-blue-500 rounded"
          onClick={handleSearch}
        >
          Go
        </button>
      </div>
    </div>
  );
}

export default Dashbord1;
