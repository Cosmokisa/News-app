import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useLocation } from 'react-router-dom'; // hooks to read URL
import { getNews } from '../services/news-services.js';
import Article from './Article.jsx';

//DisplayArticles component is fetching and displaying articles.
//
// It uses `useParams()` to get the article category from the URL path.
// It uses `useSearchParams()` to read search queries and filters from the URL's query string.
// Based on this URL information, it prepares parameters for the `getNews` API call.
// Changes to the URL cause the component to trigger a new API call (using the `getNews` service).
// Once data is returned, it displays the fetched articles on the screen.

function DisplayArticles({ defaultCategory }) {
    const [fetchedArticles, setFetchedArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // reading the params from URL
    const { name: categoryFromUrl } = useParams();
    const [urlSearchParams] = useSearchParams();
    const location = useLocation();

    useEffect(() => {
        const loadArticles = async () => {
            //get values from the URL
            const query = urlSearchParams.get('q');
            const sortBy = urlSearchParams.get('sortBy');
            const language = urlSearchParams.get('language');
            const from = urlSearchParams.get('from');
            const to = urlSearchParams.get('to');

            // sets the category based on which route was chosen, it compares the name.
            let activeCategory = categoryFromUrl;

            //sets category to default if there is no filter or search params in URL
            const noSearchParamsActive =
                !query && !sortBy && !language && !from && !to;
            if (location.pathname === '/' && noSearchParamsActive) {
                activeCategory = defaultCategory;
            }

            const paramsToFetch = {
                q: query || '',
                category: activeCategory || '',
                sortBy: sortBy || '',
                language: language || '',
                from: from || '',
                to: to || '',
            };

            try {
                const data = await getNews(paramsToFetch);
                setFetchedArticles(data);
            } catch (error) {
                console.error('Failed to load articles:', error);
                setError('Failed to load articles.');
            } finally {
                setLoading(false);
            }
        };

        loadArticles();
    }, [categoryFromUrl, urlSearchParams, location.pathname, defaultCategory]);

    return (
        <div>
            {fetchedArticles.length > 0 ? (
                fetchedArticles.map((article) => (
                    <Article article={article} key={article.url} />
                ))
            ) : (
                <div
                    style={{
                        textAlign: 'center',
                        height: '100vw',
                    }}
                >
                    <p
                        style={{
                            fontFamily: "'Lora', serif",
                            fontStyle: 'italic',
                            fontSize: '1rem',
                            color: '#444444',
                            marginTop: '4rem',
                        }}
                    >
                        No articles found for your current criteria.
                    </p>
                </div>
            )}
        </div>
    );
}

export default DisplayArticles;
