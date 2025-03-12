import { useEffect, useState } from "react";
import axios from 'axios';
import PropTypes from "prop-types";

const API_URI = `http://${import.meta.env.VITE_API_URI}/doors`;

const UpdateItem = ({ itemId }) => {
    const [item, setItem] = useState(null);
    const [updatedValue, setUpdatedValue] = useState("");
    const [updating, setUpdating] = useState(false);

    // Fetch the item on component mount or when itemId changes
    useEffect(() => {
        const fetchItem = async () => {
            try {
                const response = await axios.get(`${API_URI}/${itemId}`);
                setItem(response.data);
                setUpdatedValue(response.data.name); 
            } catch (err) {
                console.log(`Error fetching item: ${err.message}`);
            }
        };
        fetchItem();
    }, [itemId]);

    // Handle input changes
    const handleInputChange = (e) => {
        setUpdatedValue(e.target.value);
    };

    // Handle item update
    const handleUpdate = async () => {
        if (!updatedValue.trim()) {
            alert("Name cannot be empty.");
            return;
        }

        setUpdating(true);
        try {
            const response = await axios.put(`${API_URI}/${itemId}`, {
                name: updatedValue,
            });
            setItem(response.data);
            alert("Item updated successfully!");
        } catch (err) {
            console.log(`Error updating item: ${err.message}`);
        } finally {
            setUpdating(false);
        }
    };

    return (
        <div>
            <h2>Update Item</h2>
            {item && (
                <div>
                    <p>Current Name: {item.name}</p>
                    <input
                        type="text"
                        value={updatedValue}
                        onChange={handleInputChange}
                        disabled={updating}
                    />
                    <button onClick={handleUpdate} disabled={updating}>
                        {updating ? "Saving..." : "Update"}
                    </button>
                </div>
            )}
        </div>
    );
};

UpdateItem.propTypes = {
    itemId: PropTypes.string.isRequired,
};

export default UpdateItem;
