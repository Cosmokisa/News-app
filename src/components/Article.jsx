import '../styles/article.css';
import newsImage from '../assets/newsImage.png';
import { useArticleContext } from '../contexts/ArticleContext';

function Article({ article }) {
    const { isSaved, addToSaved, removeFromSaved } = useArticleContext();

    const saved = isSaved(article.url);

    function onBookmark(e) {
        e.preventDefault();

        if (saved) removeFromSaved(article.url);
        else addToSaved(article);
    }
    return (
        <div className="article">
            <h3 className="article-title">{article.title}</h3>
            <p className="article-author">
                {article.author ? 'By ' + article.author : ''}
            </p>
            <img
                className="article-img"
                src={article.urlToImage || newsImage}
                alt="article image"
            />
            <p className="article-content">{article.content}</p>
            <a className="article-link" href={article.url}>
                Read more »
            </a>
            <button
                className={`article-bookmark ${saved ? 'active' : ''}`}
                onClick={onBookmark}
                aria-label={saved ? 'Remove from saved' : 'Save article'}
            >
                <svg
                    className="bookmark-icon"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M6 2C4.89 2 4 2.9 4 4v18l8-5.33L20 22V4c0-1.1-.9-2-2-2H6z" />
                </svg>
            </button>
        </div>
    );
}

export default Article;
