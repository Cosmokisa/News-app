import Home from "./pages/Home";
import Saved from "./pages/Saved";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";

function App() {
    return (
        <div>
            <Navbar />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/saved" element={<Saved />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;