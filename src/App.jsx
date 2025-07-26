import Header from './components/Header.jsx';
import Navbar from './components/Navbar.jsx';
import SearchBar from './components/SearchBar.jsx';
import FilterBar from './components/FilterBar.jsx';
import Search from './pages/Search.jsx';
import Filter from './pages/Filter.jsx';
import Home from './pages/Home.jsx';
import Business from './pages/Business.jsx';
import Technology from './pages/technology.jsx';
import Health from './pages/health.jsx';
import Sport from './pages/sport.jsx';
import Saved from './pages/Saved.jsx';
import Footer from './components/Footer.jsx';
import { Routes, Route } from 'react-router-dom';
import { Element, animateScroll } from 'react-scroll';
import './styles/app.css';

function App() {
    const options = {
        duration: 1000,
        smooth: true,
    };

    return (
        <div className="newspaper-container">
            <Header />
            <Navbar />
            <main className="newspaper-page">
                <div className="sidebar">
                    <SearchBar />
                    <FilterBar />
                </div>
                <Element>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/search" element={<Search />} />
                        <Route path="/filter" element={<Filter />} />
                        <Route path="/business" element={<Business />} />
                        <Route path="/technology" element={<Technology />} />
                        <Route path="/health" element={<Health />} />
                        <Route path="/sport" element={<Sport />} />
                        <Route path="/saved" element={<Saved />} />
                    </Routes>
                </Element>
            </main>
            <Footer />
            <button
                onClick={() => {
                    animateScroll.scrollToTop(options);
                }}
                className="scroll-btn"
            >
                ↑
            </button>
        </div>
    );
}

export default App;
