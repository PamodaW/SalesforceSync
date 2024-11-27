const consumerKey = "3MVG9DREgiBqN9Wn1tmI.eQb32fXpKrWsCOiPp9anMP.XOEs3Rv7Ic_w7Q17wlZtloetkekoWTk5wvuYA8eFB";
const consumerSecret = "A0E8A1E3413392B2C6332CBA430EEA0D6A9BF24CEB56DDAEEF33126583276774";
const username = "pamodaw@gmail.com";
const password = "Pamzi2020yBm8RGuqKhuSUMUayOxBCQAk";

let accessToken = ""00D8d000009sUIT!AR8AQEFsBSONPNcFNyPwHsMYngoLlieqJjJ1mOKW1ukM6H8r.wWtdHys7_tpjXPMFB3OONEW68UWANG6as5gu1Eo0EP233UA";

async function authenticate() {
    try {
        const response = await fetch('http://localhost:5000/authenticate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();
        if (data.access_token) {
            accessToken = data.access_token;
            instanceUrl = data.instance_url;
            console.log('Authenticated successfully');
        } else {
            console.error('Authentication failed', data);
            alert("Authentication failed: " + JSON.stringify(data));
        }
    } catch (error) {
        console.error('Error during authentication', error);
    }
}


// Step 2: Create a Record in Salesforce
async function createRecord() {
    if (!accessToken) {
        await authenticate();
    }

    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;

    const newContact = {
        FirstName: firstName,
        LastName: lastName,
    };

    try {
        const response = await fetch('http://localhost:5000/createContact', {
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
}


// Step 3: Fetch Records from Salesforce
async function fetchRecords() {
    if (!accessToken) {
        await authenticate();
    }

    const response = await fetch('https://yourInstance.salesforce.com/services/data/v54.0/query/?q=SELECT+FirstName,LastName+FROM+Contact+LIMIT+10', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });

    const data = await response.json();
    if (data.records) {
        console.log('Records fetched successfully', data.records);
        let output = "<h3>Fetched Records:</h3>";
        data.records.forEach(record => {
            output += `<p>${record.FirstName} ${record.LastName}</p>`;
        });
        document.getElementById('output').innerHTML = output;
    } else {
        console.error('Failed to fetch records', data);
        alert("Failed to fetch records");
    }
}
