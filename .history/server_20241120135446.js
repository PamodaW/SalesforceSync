import express from 'express';
import fetch from 'node-fetch';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const PORT = 3000; // Make sure this matches the port you are using in the front-end

// Use CORS middleware to allow requests from any origin
app.use(cors());

// Parse incoming requests with JSON payloads
app.use(bodyParser.json());

// Endpoint to handle Salesforce authentication
app.post('/authenticate', async (req, res) => {
    const consumerKey = "3MVG9DREgiBqN9Wn1tmI.eQb32fXpKrWsCOiPp9anMP.XOEs3Rv7Ic_w7Q17wlZtloetkekoWTk5wvuYA8eFB";
    const consumerSecret = "A0E8A1E3413392B2C6332CBA430EEA0D6A9BF24CEB56DDAEEF33126583276774";
    const username = "pamodaw@gmail.com";
    const password = "Pamzi2020yBm8RGuqKhuSUMUayOxBCQAk";

    try {
        const response = await fetch('https://login.salesforce.com/services/oauth2/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                'grant_type': 'password',
                'client_id': consumerKey,
                'client_secret': consumerSecret,
                'username': username,
                'password': password,
            }),
        });

        const data = await response.json();

        if (data.access_token) {
            res.json({
                access_token: data.access_token,
                instance_url: data.instance_url,
            });
        } else {
            res.status(400).json({
                error: 'Authentication failed',
                details: data,
            });
        }
    } catch (error) {
        console.error('Error during Salesforce authentication', error);
        res.status(500).json({
            error: 'Internal Server Error',
        });
    }
});

// Endpoint to create a Contact in Salesforce
app.post('/createContact', async (req, res) => {
    const { accessToken, instanceUrl, contactData } = req.body;

    if (!accessToken || !instanceUrl || !contactData) {
        return res.status(400).json({ error: 'Missing required fields (accessToken, instanceUrl, contactData)' });
    }

    try {
        const response = await fetch(`${instanceUrl}/services/data/v54.0/sobjects/Contact/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify(contactData),
        });

        const data = await response.json();

        if (data.id) {
            res.json({ message: 'Contact created successfully', id: data.id });
        } else {
            res.status(400).json({ error: 'Failed to create contact', details: data });
        }
    } catch (error) {
        console.error('Error during contact creation', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});