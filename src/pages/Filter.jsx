// I wanted to use useEffect to fetch data on each input click for the filter component, but in that case,
// there will be redundant API calls, so maybe it's better to create a controlled component to keep everything predictable, and clean.

import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getNews } from '../services/news-services.js';
import Article from '../components/Article.jsx';

function Filter() {
    const [fetchedArticles, setFetchedArticles] = useState([]);
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const loadArticles = async () => {
            const filterValues = Object.fromEntries(searchParams.entries());

            if (!filterValues.q) {
                filterValues.q = 'general';
            }

            try {
                const articles = await getNews(filterValues);
                console.log('Fetched articles:', articles);
                setFetchedArticles(articles || []);
            } catch (error) {
                console.error('Failed to load articles:', error);
                setFetchedArticles([]);
            }
        };

        if ([...searchParams.entries()].length > 0) {
            loadArticles();
        }
    }, [searchParams]);

    return (
        <div>
            {fetchedArticles.length > 0 ? (
                fetchedArticles.map((article) => (
                    <Article article={article} key={article.url} />
                ))
            ) : (
                <p>
                    No articles found for the selected filters. Try a different
                    combination.
                </p>
            )}
        </div>
    );
}

export default Filter;
