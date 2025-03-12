import { useState, useEffect } from "react";
import UpdateItem from "./components/UpdateItem";
import axios from "axios";

const API_URI = `http://${import.meta.env.VITE_API_URI}/doors`;

function App() {
  const [itemId, setItemId] = useState(null);

  useEffect(() => {
    const fetchDoors = async () => {
      try {
        const response = await axios.get(API_URI);
        if (response.data.length > 0) {
          setItemId(response.data[0].id); // Assuming there's at least one door
        }
      } catch (error) {
        console.error("Error fetching doors:", error);
      }
    };

    fetchDoors();
  }, []);

  return itemId ? <UpdateItem itemId={itemId} /> : <p>Loading doors...</p>;
}

export default App;