import { useEffect, useState } from "react";

export default function Home() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/books")
      .then(res => res.json())
      .then(data => setBooks(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Popular Books</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {books.data?.map((book, i) => (
        <div key={i} className="p-4 bg-white shadow rounded">
          <img
            src={book["Image-URL-M"]}
            alt={book["Book-Title"]}
            className="w-full h-40 object-cover rounded mb-2"
          />
          <h3 className="text-md font-medium">{book["Book-Title"]}</h3>
          <p className="text-sm text-gray-600">{book["Book-Author"]}</p>
        </div>
      ))}
      </div>
    </div>
  );
}