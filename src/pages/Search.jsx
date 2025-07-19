import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getNews } from '../services/news-services.js';
import Article from '../components/Article.jsx';

function Search() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!query) return;

        const fetchArticles = async () => {
            setLoading(true);
            try {
                const results = await getNews({ q: query });
                setArticles(results);
                setError(null);
            } catch (err) {
                console.error(err);
                setError('Failed to search articles...');
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, [query]);

    return (
        <>
            {loading && <div className="loading">Searching...</div>}
            {error && <div className="error">{error}</div>}

            <div>
                {articles?.map((article) => (
                    <Article article={article} key={article.url} />
                ))}
            </div>
        </>
    );
}

export default Search;
