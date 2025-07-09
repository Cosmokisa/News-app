import '../styles/article.css';

function NewsCard({ article }) {
    function onBookmark() {
        alert('Clicked');
    }
    return (
        <div className="article">
            <button className="article-bookmark" onClick={onBookmark}>
                Save
            </button>
            <h3 className="article-title">{article.title}</h3>
            <p className="article-author"> By {article.author}</p>
            <img
                className="article-img"
                src={article.urlToImage}
                alt="article image"
            />
            <p className="article-content">{article.content}</p>
            <a className="article-link" href={article.url}>
                Read more »
            </a>
        </div>
    );
}

export default NewsCard;
