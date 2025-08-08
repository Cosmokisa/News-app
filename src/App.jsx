import { Routes, Route } from 'react-router-dom';
import { Element, animateScroll } from 'react-scroll';
import { useLocation } from 'react-router-dom';

// components
import Header from './components/Header.jsx';
import Navbar from './components/Navbar.jsx';
import Saved from './components/Saved.jsx';
import SearchAndFilter from './components/SearchAndFilter.jsx';
import DisplayArticles from './components/DisplayArticles.jsx';
import Footer from './components/Footer.jsx';
import { ArticleProvider } from './contexts/ArticleContext.jsx';

import './styles/app.css';

function App() {
    const location = useLocation();
    const isHomePage = location.pathname === '/';

    const options = {
        duration: 2000,
        smooth: true,
    };
    return (
        <ArticleProvider>
            <div className="newspaper-container">
                <Header />
                <Navbar />
                <main className="newspaper-page">
                    <div className="filter">
                        {isHomePage && <SearchAndFilter />}
                    </div>
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
                                <Route path="/saved" element={<Saved />} />
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
        </ArticleProvider>
    );
}

export default App;
