import '../styles/article.css';
import newsImage from '../assets/newsImage.png';

function NewsCard({ article }) {
    function onBookmark() {
        alert('Clicked');
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
            <button className="article-bookmark" onClick={onBookmark}>
                SAVE
            </button>
        </div>
    );
}

export default NewsCard;
