const axios = require('axios');

// funktion som Netlify använder som serverless funktion
exports.handler = async function(event, context) {
    // Hämtar landkoden från query-parametrarna
    const { countryCode } = event.queryStringParameters;
    // Hämtar API-nyckeln från miljövariabler (inställd på Netlify)
    const API_KEY = process.env.NEWSAPI_KEY;

    // Om landkoden saknas, returnera ett felmeddelande
    if (!countryCode) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Saknar landkod' }),
        };
    }

    // URL för att hämta nyheter från NewsAPI
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
            body: JSON.stringify({ message: 'Fel vid hämtning av nyheter', error: error.message }),
        };
    }
};
