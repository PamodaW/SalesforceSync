import express from 'express';
import fetch from 'node-fetch';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const PORT = 5000;

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
async function createRecord() {
    if (!accessToken || !instanceUrl) {
        await authenticate();
    }

    if (accessToken && instanceUrl) {
        const firstName = document.getElementById("firstName").value;
        const lastName = document.getElementById("lastName").value;

        const newContact = {
            FirstName: firstName,
            LastName: lastName,
        };

        try {
            const response = await fetch('http://localhost:5000/createContact', {  // Make sure the URL is correct
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    accessToken: accessToken,
                    instanceUrl: instanceUrl,
                    contactData: newContact,
                }),
            });

            // Make sure to parse the response correctly
            const data = await response.json();

            if (data.id) {
                console.log('Contact created successfully', data);
                alert(`Contact created successfully: ${data.id}`);
            } else {
                console.error('Failed to create contact', data);
                alert("Failed to create contact: " + JSON.stringify(data));
            }
        } catch (error) {
            console.error('Error during contact creation', error);
        }
    } else {
        console.error('Authentication failed. Cannot create record.');
    }
}



// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
