import { useArticleContext } from '../contexts/ArticleContext.jsx';
import Article from './Article.jsx';
import '../styles/saved.css';

function Saved() {
    const { saved } = useArticleContext();

    if (saved?.length) {
        return (
            <div>
                {saved.map((article) => (
                    <Article article={article} key={article.url} />
                ))}
            </div>
        );
    }

    return (
        <div className="no-saved">
            <h2 className="no-saved_title">No saved articles yet</h2>
            <p className="no-saved_text">
                Start adding articles to your saved and they will appear here!
            </p>
        </div>
    );
}

export default Saved;
