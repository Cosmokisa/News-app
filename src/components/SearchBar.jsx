import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/search.css';

function SearchBar() {
    const [inputValue, setInputValue] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;
        navigate('/search?q=' + encodeURIComponent(inputValue.trim()));
        console.log(encodeURIComponent(inputValue.trim()));
        setInputValue('');
    };

    return (
        <form onSubmit={handleSubmit} className="search-form">
            <input
                type="text"
                placeholder="Type to search..."
                className="search-input"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <button type="submit" className="search-btn">
                Search
            </button>
        </form>
    );
}

export default SearchBar;
