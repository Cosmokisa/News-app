require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

// Main route
app.get('/api/news', async (req, res) => {
    try {
        const { q, category, language, sortBy, from, to } = req.query;

        let endPoint;
        let params = {
            pageSize: '50',
            apiKey: process.env.API_KEY,
        };

        if (category) {
            endPoint = 'top-headlines';
            params.category = category;
            if (q) {
                params.q = q;
            }
        } else {
            endPoint = 'everything';
            params.q = q || 'general';
            params.searchIn = 'title';
            if (sortBy) params.sortBy = sortBy;
            if (language) params.language = language;
            if (from) params.from = from;
            if (to) params.to = to;
        }

        // Remove empty params
        params = Object.fromEntries(
            Object.entries(params).filter(
                ([, value]) =>
                    value !== '' && value !== undefined && value !== null
            )
        );

        // Call NewsAPI
        const response = await axios.get(`https://newsapi.org/v2/${endPoint}`, {
            params,
        });

        res.json({ articles: response.data.articles });
    } catch (error) {
        console.error(
            'Error fetching news:',
            error.response?.data || error.message
        );
        res.status(500).json({ error: 'Failed to fetch news' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Backend running on port ${PORT}`);
});
