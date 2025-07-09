import { getNews } from '../services/news-services.js';
import { useState, useEffect } from 'react';
import Article from '../components/Article.jsx';

function Home({ category }) {
    const [articles, setArticles] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadArticles = async () => {
            try {
                const data = await getNews({
                    category: 'general',
                });
                setArticles(data);
            } catch (error) {
                console.error('Failed to load articles:', error);
                setError('Failed to load articles.');
            } finally {
                setLoading(false);
            }
        };

        loadArticles();
    }, [category]);

    return (
        <div>
            {error && <div>{error}</div>}
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div>
                    {articles?.map((article) => (
                        <Article article={article} key={article.url} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Home;
