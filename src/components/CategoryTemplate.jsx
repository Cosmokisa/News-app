import { getNews } from '../services/news-services.js';
import { useState, useEffect } from 'react';
import Article from './Article.jsx';

function CategoryTemplate({ category }) {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const loadArticles = async () => {
            try {
                const data = await getNews({ category });
                setArticles(data);
            } catch (error) {
                console.error('Failed to load articles:', error);
            }
        };

        loadArticles();
    }, [category]);

    return (
        <div>
            {articles.map((article) => (
                <Article article={article} key={article.url} />
            ))}
        </div>
    );
}

export default CategoryTemplate;
