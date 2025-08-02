import axios from 'axios';

// 50 articles each time
// lastest articles for home page
// sidebar: filter by language (5), by category, by phrase, by date (it should work separately and together)
// navbar categories, for example, for business, technology, health, sports

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = 'https://newsapi.org/v2';

// This component receives Parameters:It accepts defined parameters (e.g., `category`, `q` for search query, `sortBy`, `page`)
// that are prepared by the calling component (like `DisplayArticles`, which extracts them from the URL via `useParams()` and `useSearchParams()`).
// Constructs API Requests:* It constructs the correct API endpoint URL and request body/headers based on the received parameters.
// It executes the asynchronous HTTP request to the News API using Axios.
// It processes the API response (converting JSON) and returns the raw article data back to the calling component.
// It includes error handling for network issues or API-specific errors.

export const getNews = async ({ q, category, language, sortBy, from, to }) => {
    let endPoint;
    //object which will collect the params before sending
    let rawParams = {
        pageSize: '50',
        apiKey: API_KEY,
    };
    //here it accepts the data from the calling component
    if (category) {
        endPoint = 'top-headlines';
        rawParams.category = category;
        if (q) {
            rawParams.q = q || 'general';
        }
    } else {
        endPoint = 'everything';
        rawParams.q = q || 'general';
        rawParams.searchIn = 'title';
        if (sortBy) {
            rawParams.sortBy = sortBy;
        }
        if (language) {
            rawParams.language = language;
        }
        if (from) {
            rawParams.from = from;
        }
        if (to) {
            rawParams.to = to;
        }
    }
    // here I am filtering all empty, undefined or null values
    const finalParams = Object.fromEntries(
        Object.entries(rawParams).filter(
            ([, value]) => value !== '' && value !== undefined && value !== null
        )
    );

    // them I use finalParams params to call specific data
    try {
        const response = await axios.get(`${BASE_URL}/${endPoint}`, {
            params: finalParams,
        });
        return response.data.articles;
    } catch (error) {
        alert(`"Error fetching news:", ${error}`);
        return [];
    }
};
