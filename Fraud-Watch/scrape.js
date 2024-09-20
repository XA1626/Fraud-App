const axios = require('axios');
const express = require('express');
const app = express();

let cachedEvents = []; // Store the scraped data in memory

// Function to fetch event data from the target API
const fetchEventData = async () => {
    console.log('Starting event data fetch...');  // Debugging log to check script execution

    try {
        const response = await axios.get('https://infosec-conferences.com/parts-api/googlesheet.php', {
            headers: {
                'accept': 'application/json, text/javascript, */*; q=0.01',
                'cookie': '_gid=GA1.2.1821646813.1726815370; ...',
                'referer': 'https://infosec-conferences.com/',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36'
            }
        });

        const rawData = response.data;
        console.log('Raw Data:', rawData);  // Inspect the structure of the raw data

        // Ensure that you parse and display the event data properly:
        cachedEvents = rawData.values.slice(1).map(event => {
            return {
                name: event[0],
                date: event[1],
                type: event[2],
                country: event[3],
                region: event[4],
                city: event[6],
                format: event[7],
                url: event[8]
            };
        });

        console.log('Parsed Events:', cachedEvents);  // Display the parsed events in the console
        return cachedEvents;
    } catch (error) {
        console.error('Error fetching event data:', error);
        return [];
    }
};

// Automatically fetch event data when the server starts
fetchEventData();

// Define an endpoint to return the cached event data
app.get('/events', (req, res) => {
    if (cachedEvents.length === 0) {
        return res.status(500).json({ message: 'No events cached. Try again later.' });
    }
    res.json(cachedEvents);
});

// Set up the server to listen on a specific port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
