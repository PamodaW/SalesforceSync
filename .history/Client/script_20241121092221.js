const consumerKey = "3MVG9DREgiBqN9Wn1tmI.eQb32fXpKrWsCOiPp9anMP.XOEs3Rv7Ic_w7Q17wlZtloetkekoWTk5wvuYA8eFB";
const consumerSecret = "A0E8A1E3413392B2C6332CBA430EEA0D6A9BF24CEB56DDAEEF33126583276774";
const username = "pamodaw@gmail.com";
const password = "Pamzi2020yBm8RGuqKhuSUMUayOxBCQAk";

let accessToken = "";

async function authenticate() {
    try {
        const response = await fetch('http://localhost:3000/authenticate', {
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
// Assuming the accessToken and instanceUrl are set after authentication

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
            const response = await fetch('http://localhost:3000/createContact', {  // Matches the server port
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



// Step 3: Fetch Records from Salesforce
async function fetchRecords() {
    if (!accessToken || !instanceUrl) {
        await authenticate();
    }

    if (accessToken && instanceUrl) {
        try {
            const response = await fetch('http://localhost:3000/getContacts', {
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
                let output = "<h3>Fetched Contacts:</h3>";
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

//clear the Area
async function ClearArea(){
    document.getElementById('output')
            .innerHTML = "";
}

async f
      

