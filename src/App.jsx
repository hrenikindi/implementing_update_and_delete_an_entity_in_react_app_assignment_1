
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UpdateItem from "./components/UpdateItem";

function App() {
    return (
        <Router>
            <Routes>

                <Route path="/" element={<h1>Welcome! Please enter a valid URL.</h1>} />
                
                
                <Route path="/update/:id" element={<UpdateItem />} />
            </Routes>
        </Router>
    );
}

export default App;
