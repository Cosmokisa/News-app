import {
    Card,
    CardContent,
    Typography,
    CardMedia,
    Button,
} from "@mui/material";

function NewsCard({ article }) {
    function onBookmark() {
        alert("Clicked");
    }
    return (
        <Card>
            <CardMedia
                component="img"
                image={article.urlToImage}
                alt={article.title}
            />
            <CardContent>
                <Typography variant="h6">{article.title}</Typography>
                <Typography variant="body2">{article.description}</Typography>
                <Button
                    onClick={onBookmark}
                    variant="outlined"
                >
                    Save
                </Button>
            </CardContent>
        </Card>
    );
}

export default NewsCard;