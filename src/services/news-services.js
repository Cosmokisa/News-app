import axios from 'axios';

// In dev: use localhost, in prod: use deployed backend URL
const BASE_URL =
    import.meta.env.MODE === 'development'
        ? 'http://localhost:5000/api/news'
        : 'https://news-app-y01n.onrender.com/api/news';

export const getNews = async ({ q, category, language, sortBy, from, to }) => {
    // Params to send to backend
    const params = {};

    if (category) {
        params.category = category;
        if (q) params.q = q;
    } else {
        params.q = q || 'general';
        if (sortBy) params.sortBy = sortBy;
        if (language) params.language = language;
        if (from) params.from = from;
        if (to) params.to = to;
    }

    // Filter out empty or undefined params
    const finalParams = Object.fromEntries(
        Object.entries(params).filter(
            ([, value]) => value !== '' && value !== undefined && value !== null
        )
    );

    try {
        const response = await axios.get(BASE_URL, { params: finalParams });
        return response.data.articles;
    } catch (error) {
        console.error('Error fetching news:', error);
        return [];
    }
};
