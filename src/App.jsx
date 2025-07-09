import Header from './components/Header.jsx';
import Navbar from './components/Navbar';
import Home from './pages/Home.jsx';
import Business from './pages/Business.jsx';
import Technology from './pages/technology.jsx';
import Health from './pages/health.jsx';
import Sport from './pages/sport.jsx';
import Saved from './pages/Saved.jsx';
import Footer from './components/Footer.jsx';
import { Routes, Route } from 'react-router-dom';
import './styles/app.css';

function App() {
    return (
        <div className="newspaper-container">
            <div className="newspaper-page">
                <Header />
                <Navbar />
                <main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/business" element={<Business />} />
                        <Route path="/technology" element={<Technology />} />
                        <Route path="/health" element={<Health />} />
                        <Route path="/sport" element={<Sport />} />
                        <Route path="/saved" element={<Saved />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </div>
    );
}

export default App;
