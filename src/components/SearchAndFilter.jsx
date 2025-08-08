import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import '../styles/search&filter.css';
import filterIcon from '../assets/filter.svg';
import closeIcon from '../assets/close.svg';

// This component uses URLSearchParams to manage the URL's query string for filtering and search.
// I use its `get()`, `set()`, and `delete()` methods to interact with individual query parameters.
// `setUrlSearchParams` updates these parameters, triggering navigation and component re-renders.

function SearchAndFilter() {
    const [urlSearchParams, setUrlSearchParams] = useSearchParams();
    const [isOpen, setIsOpen] = useState(false);

    const togglePanel = () => setIsOpen((prev) => !prev);

    // --- Functions to handle changes for each input ---

    // this function checks if there is a search query and if no it deletes it,
    // if there is a q, it sets the user's input to the newSearchParams
    const handleSearchChange = (event) => {
        const newQuery = event.target.value;
        const newSearchParams = new URLSearchParams(urlSearchParams);

        if (newQuery.trim() === '') {
            newSearchParams.delete('q');
        } else {
            newSearchParams.set('q', newQuery);
        }
        setUrlSearchParams(newSearchParams);
    };

    // this function is getting the values from radio inputs,
    // which are empty or default and sets them to the newSearchParams
    const handleRadioChange = (paramName, event) => {
        const newValue = event.target.value;
        const newSearchParams = new URLSearchParams(urlSearchParams);

        if (newValue === '' || newValue === 'default') {
            // check for an empty or default option
            newSearchParams.delete(paramName);
        } else {
            newSearchParams.set(paramName, newValue);
        }
        setUrlSearchParams(newSearchParams);
    };

    // this function is getting the values from date type inputs,
    // which are empty or default and sets them to the newSearchParams
    const handleDateChange = (paramName, event) => {
        const newDate = event.target.value;
        const newSearchParams = new URLSearchParams(urlSearchParams);

        if (newDate === '') {
            newSearchParams.delete(paramName);
        } else {
            newSearchParams.set(paramName, newDate);
        }
        setUrlSearchParams(newSearchParams);
    };

    // this is a function for the ClearAll button, it sets search params to an empty object
    const handleClearAll = () => {
        setUrlSearchParams({});
    };

    return (
        <>
            <button className="filter-toggle" onClick={togglePanel}>
                <img
                    src={isOpen ? closeIcon : filterIcon}
                    alt="Toggle Filter Panel"
                />
            </button>

            <div
                className={`search-and-filter-container ${isOpen ? 'open' : ''}`}
            >
                <h3 className="search-title">SEARCH</h3>
                <form
                    onSubmit={(e) => e.preventDefault()}
                    className="search-form"
                >
                    <input
                        type="text"
                        placeholder="Type to search news..."
                        className="search-input"
                        value={urlSearchParams.get('q') || ''}
                        onChange={handleSearchChange}
                    />
                </form>
                <div className="filter-container">
                    <h3 className="filter-title">SORT BY</h3>
                    <label>
                        <input
                            type="radio"
                            name="sortBy"
                            value="popularity"
                            checked={
                                urlSearchParams.get('sortBy') === 'popularity'
                            }
                            onChange={(e) => handleRadioChange('sortBy', e)}
                        />
                        POPULARITY
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="sortBy"
                            value="publishedAt"
                            checked={
                                urlSearchParams.get('sortBy') === 'publishedAt'
                            }
                            onChange={(e) => handleRadioChange('sortBy', e)}
                        />
                        MOST RECENT
                    </label>
                    <h3 className="filter-title">LANGUAGE</h3>
                    {['es', 'fr', 'it', 'pt', 'ar'].map((lang) => (
                        <label key={lang}>
                            <input
                                type="radio"
                                name="language"
                                value={lang}
                                checked={
                                    urlSearchParams.get('language') === lang
                                }
                                onChange={(e) =>
                                    handleRadioChange('language', e)
                                }
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
                            value={urlSearchParams.get('from') || ''}
                            onChange={(e) => handleDateChange('from', e)}
                        />
                    </label>
                    <label className="filter-date_label">
                        TO:
                        <input
                            type="date"
                            name="to"
                            value={urlSearchParams.get('to') || ''}
                            onChange={(e) => handleDateChange('to', e)}
                        />
                    </label>
                </div>
                {urlSearchParams.toString() !== '' && (
                    <button onClick={handleClearAll} className="clear-btn">
                        Clear all filters & search
                    </button>
                )}
            </div>
        </>
    );
}

export default SearchAndFilter;
