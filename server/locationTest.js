const axios = require('axios');

async function getCityName(latitude, longitude) {
    try {
        const response = await axios.get('https://api.example.com/geocode', {
            params: {
                lat: latitude,
                lon: longitude,
                apiKey: 'YOUR_API_KEY' // Replace with your API key
            }
        });

        const city = response.data.city; // Adjust depending on API response structure
        return city;
    } catch (error) {
        console.error('Error fetching city name:', error);
        return null;
    }
}

// Example usage
getCityName(40.7128, -74.0060).then(city => console.log(city));
