import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import crypto from 'crypto'; // To hash the password for the HIBP API
import fetch from 'node-fetch'; // For making API requests

dotenv.config({ path: './apicall.env' });

const app = express();
const PORT = process.env.PORT || 55000;

app.use(cors());

// Proxy endpoint to check if a password has been pwned
app.get('/api/check-password', async (req, res) => {
    const { password } = req.query;

    if (!password || password.length === 0) {
        return res.status(400).json({ error: 'Invalid password input' });
    }

    // Hash the password using SHA1 as required by HIBP API
    const hashedPassword = crypto.createHash('sha1').update(password).digest('hex').toUpperCase();
    const prefix = hashedPassword.slice(0, 5);
    const suffix = hashedPassword.slice(5);

    try {
        // Check if the password hash exists in the pwned database
        const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);

        if (response.ok) {
            const data = await response.text();
            const found = data.split('\n').find(line => line.startsWith(suffix));

            if (found) {
                const [hash, count] = found.split(':');
                return res.json({ pwned: true, count: parseInt(count) });
            } else {
                return res.json({ pwned: false });
            }
        } else {
            return res.status(response.status).json({ error: 'Error checking password' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch data from the API' });
    }
});

// Existing endpoint for checking email breach
app.get('/api/check-email', async (req, res) => {
    const { email } = req.query;

    if (!email || !email.includes('@')) {
        return res.status(400).json({ error: 'Invalid email address' });
    }

    try {
        const apiKey = process.env.HIBP_API_KEY;

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

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
