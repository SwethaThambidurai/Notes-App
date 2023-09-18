import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Notes = () => {
  const baseUrl = "http://localhost:8000/api/notes";
  console.log(baseUrl);

  const [data, setData] = useState([]);
  const [isloading, setIsloading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await fetch(baseUrl);
        console.log(response);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        console.log(data);
        setData(data);
        setIsloading(false);
      } catch (error) {
        setError("Error. Failed to fetch data. Please try again");
        setIsloading(false);
      }
    };
    fetchdata();
  }, []);

  return (
    <div>
      {isloading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul className="notes">
          <li className="add-note-button">
            <Link to={`/add-note`}>+</Link>
          </li>

          {data.map((item) => (
            <li key={item._id}>
              <Link to={`/note/${item._id}`}>
                <h3>{item.title}</h3>
                <p>
                  {item.description.length > 50
                    ? `${item.description.substring(0, 50)}...`
                    : item.description}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notes;
