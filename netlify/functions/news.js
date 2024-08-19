const axios = require('axios');

exports.handler = async function(event, context) {
    const { countryCode } = event.queryStringParameters;
    const API_KEY = '19d80c055ab647379e3f4f2c04ed873f'; // Your NewsAPI key

    if (!countryCode) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Missing country code' }),
        };
    }

    const url = `https://newsapi.org/v2/top-headlines?country=${countryCode}&apiKey=${API_KEY}`;

    try {
        const response = await axios.get(url);
        return {
            statusCode: 200,
            body: JSON.stringify(response.data),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error fetching news', error: error.message }),
        };
    }
};
