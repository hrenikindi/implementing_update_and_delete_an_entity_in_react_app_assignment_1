import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; 

const UpdateItem = () => {
    const { id } = useParams(); 
    const API_URI = `http://localhost:8000/doors/${id}`;

    const [item, setItem] = useState(null);
    const [updatedName, setUpdatedName] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const response = await fetch(API_URI);
                if (!response.ok) throw new Error("Failed to fetch item");

                const data = await response.json();
                setItem(data);
                setUpdatedName(data.name); 
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchItem();
    }, [id]); 

    const handleChange = (e) => {
        setUpdatedName(e.target.value);
    };

    const handleUpdate = async () => {
        try {
            const response = await fetch(API_URI, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: updatedName }),
            });

            if (!response.ok) throw new Error("Failed to update item");

            const updatedItem = await response.json();

            
            alert("Item updated successfully!");

            
            setItem(updatedItem);
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) return <p>Loading item...</p>;
    if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
    if (!item) return <p>No item found.</p>;

    return (
        <div>
            <h2>Update Item</h2>


            <p><strong>Current Item:</strong> {item.name}</p>

            
            <input type="text" value={updatedName} onChange={handleChange} />
            <button onClick={handleUpdate}>Update</button>
        </div>
    );
};

export default UpdateItem;
