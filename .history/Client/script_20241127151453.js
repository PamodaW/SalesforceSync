// Placeholder for Salesforce API credentials and user details
const consumerKey = "YOUR_CONSUMER_KEY"; // Replace with your Salesforce consumer key
const consumerSecret = "YOUR_CONSUMER_SECRET"; // Replace with your Salesforce consumer secret
const username = "YOUR_SALESFORCE_USERNAME"; // Replace with your Salesforce username
const password = "YOUR_SALESFORCE_PASSWORD"; // Replace with your Salesforce password

// Variable to store the access token
let accessToken = "";

// Function to authenticate with Salesforce
async function authenticate() {
    try {
        const response = await fetch('http://localhost:3000/authenticate', { // Endpoint for authentication
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

// Function to create a new record in Salesforce
async function createRecord() {
    if (!accessToken || !instanceUrl) {
        await authenticate(); // Authenticate if not already authenticated
    }

    if (accessToken && instanceUrl) {
        const firstName = document.getElementById("firstName").value; // Get input for first name
        const lastName = document.getElementById("lastName").value;   // Get input for last name

        const newContact = {
            FirstName: firstName,
            LastName: lastName,
        };

        try {
            const response = await fetch('http://localhost:3000/createContact', { // Endpoint for creating a contact
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
    } else {
        console.error('Authentication failed. Cannot create record.');
    }
}

// Function to fetch records from Salesforce
async function fetchRecords() {
    if (!accessToken || !instanceUrl) {
        await authenticate(); // Authenticate if not already authenticated
    }

    if (accessToken && instanceUrl) {
        try {
            const response = await fetch('http://localhost:3000/getContacts', { // Endpoint for fetching contacts
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    accessToken: accessToken,
                    instanceUrl: instanceUrl,
                }),
            });

            const contacts = await response.json();

            if (Array.isArray(contacts)) {
                console.log('Contacts fetched successfully:', contacts);
                let output = "<h3>Recent Contacts:</h3>";
                contacts.forEach(contact => {
                    output += `<p>${contact.FirstName} ${contact.LastName}</p>`;
                });
                document.getElementById('output').innerHTML = output;
            } else {
                console.error('Failed to fetch contacts', contacts);
                alert("Failed to fetch contacts: " + JSON.stringify(contacts));
            }
        } catch (error) {
            console.error('Error during contact fetch', error);
        }
    } else {
        console.error('Authentication failed. Cannot fetch contacts.');
    }
}

// Function to clear the output area
async function ClearArea() {
    document.getElementById('output').innerHTML = ""; // Clear the content of the output area
}

// Function to clear input fields
async function ClearFields() {
    document.getElementById('firstName').value = ""; // Clear the first name input field
    document.getElementById('lastName').value = "";  // Clear the last name input field
}
