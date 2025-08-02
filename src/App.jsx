import { Routes, Route } from 'react-router-dom';
import { Element, animateScroll } from 'react-scroll';

// components
import Header from './components/header.jsx';
import Navbar from './components/navbar.jsx';
import SearchAndFilter from './components/SearchAndFilter.jsx';
import DisplayArticles from './components/displayArticles.jsx';
import Footer from './components/footer.jsx';

import './styles/app.css';

function App() {
    const options = {
        duration: 2000,
        smooth: true,
    };
    return (
        <div className="newspaper-container">
            <Header />
            <Navbar />
            <main className="newspaper-page">
                <SearchAndFilter className="sidebar" />
                <div className="main-articles-section">
                    <Element>
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <DisplayArticles defaultCategory="general" />
                                }
                            />
                            <Route
                                path="/category/:name"
                                element={<DisplayArticles />}
                            />
                        </Routes>
                    </Element>
                </div>
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
