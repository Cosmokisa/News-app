import axios from 'axios';

// 50 articles each time
// lastest articles for home page
// sidebar: filter by language (5), by category, by phrase, by date (it should work separately and together)
// navbar categories, for example, for business, technology, health, sports

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = 'https://newsapi.org/v2';

export const getNews = async ({
    q = 'keyword',
    category,
    language,
    sortBy,
    from,
    to,
}) => {
    //if category is provided - top-headlines endpoint must be used
    const endPoint = category ? 'top-headlines' : 'everything';
    const params = category
        ? { category, pageSize: '50', apiKey: API_KEY }
        : //for fetching everything else except categories
          {
              q,
              searchIn: 'title',
              language,
              sortBy,
              from,
              to,
              pageSize: '50',
              apiKey: API_KEY,
          };

    try {
        const response = await axios.get(`${BASE_URL}/${endPoint}`, { params });
        return response.data.articles;
    } catch (error) {
        alert(`"Error fetching news:", ${error}`);
        return [];
    }
};
