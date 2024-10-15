import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import dotenv from 'dotenv';


dotenv.config({ path: './apicall.env' });

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());

// Proxy endpoint to handle "Have I Been Pwned?" requests
app.get('/api/check-email', async (req, res) => {
  const { email } = req.query;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  try {
    const apiKey = process.env.HIBP_API_KEY; // Securely stored API key

    const response = await fetch(
      `https://haveibeenpwned.com/api/v3/breachedaccount/${encodeURIComponent(email)}?truncateResponse=false`,
      {
        method: 'GET',
        headers: {
          'hibp-api-key': apiKey,
          'user-agent': 'FraudWatchApp',
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      return res.json(data);
    } else if (response.status === 404) {
      return res.json({ message: 'No breaches found for this email' });
    } else if (response.status === 401) {
      return res.status(401).json({ error: 'Invalid API key' });
    } else if (response.status === 403) {
      return res.status(403).json({ error: 'Forbidden. Check user-agent or API key' });
    } else if (response.status === 429) {
      return res.status(429).json({ error: 'Too many requests. Try again later.' });
    } else {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch data from the API' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
