import { useState, useEffect } from 'react';
import {
    useNavigate,
    createSearchParams,
    useSearchParams,
} from 'react-router-dom';
import '../styles/filter.css';

function FilterBar() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const [filterValues, setFilterValues] = useState({
        sortBy: '',
        language: '',
        from: '',
        to: '',
    });

    // Sync state from URL on mount
    useEffect(() => {
        setFilterValues((prev) => ({
            ...prev,
            sortBy: searchParams.get('sortBy') || '',
            language: searchParams.get('language') || '',
            from: searchParams.get('from') || '',
            to: searchParams.get('to') || '',
        }));
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFilterValues((prevFilterValues) => ({
            ...prevFilterValues,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const cleanedValues = Object.fromEntries(
            Object.entries(filterValues).filter(
                ([_, val]) => val?.trim() !== ''
            )
        );

        const queryString = createSearchParams(cleanedValues).toString();
        navigate({
            pathname: '/filter',
            search: `?${queryString}`,
        });
    };

    const handleClearAll = () => {
        setFilterValues({
            q: '',
            sortBy: '',
            language: '',
            from: '',
            to: '',
        });
        navigate('/');
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="filter">
                <h3 className="filter-title">SORT BY</h3>
                <label>
                    <input
                        type="radio"
                        name="sortBy"
                        value="popularity"
                        checked={filterValues.sortBy === 'popularity'}
                        onChange={handleChange}
                    />
                    POPULARITY
                </label>
                <label>
                    <input
                        type="radio"
                        name="sortBy"
                        value="publishedAt"
                        checked={filterValues.sortBy === 'publishedAt'}
                        onChange={handleChange}
                    />
                    MOST RECENT
                </label>

                <h3 className="filter-title">LANGUAGE</h3>
                {['en', 'es', 'fr', 'it', 'pt', 'ar'].map((lang) => (
                    <label key={lang}>
                        <input
                            type="radio"
                            name="language"
                            value={lang}
                            checked={filterValues.language === lang}
                            onChange={handleChange}
                        />
                        {lang.toUpperCase()}
                    </label>
                ))}

                <h3 className="filter-title">PUBLICATION PERIOD</h3>
                <label className="filter-date_label">
                    FROM:
                    <input
                        type="date"
                        name="from"
                        value={filterValues.from || ''}
                        onChange={handleChange}
                    />
                </label>
                <label className="filter-date_label">
                    TO:
                    <input
                        type="date"
                        name="to"
                        value={filterValues.to || ''}
                        onChange={handleChange}
                    />
                </label>

                <button type="submit" className="filter-btn">
                    Apply filters
                </button>
                <button
                    type="button"
                    onClick={handleClearAll}
                    className="clear-btn"
                >
                    Clear All
                </button>
            </form>
        </>
    );
}

export default FilterBar;
