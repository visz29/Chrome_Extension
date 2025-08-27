document.getElementById("searchBtn").addEventListener("click", () => {
  const query = document.getElementById("searchInput").value.trim();
  if (query) {
    if (query.startsWith("http") || query.includes(".")) {
      window.location.href = query.startsWith("http") ? query : "https://" + query;
    } else {
      window.location.href = "https://www.google.com/search?q=" + encodeURIComponent(query);
    }
  }
});

document.getElementById("searchInput").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    document.getElementById("searchBtn").click();
  }
});
