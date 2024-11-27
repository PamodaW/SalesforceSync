const consumerKey = "3MVG9DREgiBqN9Wn1tmI.eQb32TkvddF9b3fDuruEINt_hdaYKQjLcvpiQLjxDOBfkjuSEbxo6w5s43QjFv1g";
const consumerSecret = "C4EB9041B6BAC0CAEC8BAEDD71447E02CB1F6DF3EBEAA2182215CA18965223B9";
const username = "pamodaw@gmail.com";
const password = "Pamzi2020";

let accessToken = "";

// Step 1: Authenticate to Salesforce
async function authenticate() {
    const response = await fetch('https://test.salesforce.com/services/oauth2/token'
 {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            'grant_type': 'password',
            'client_id': consumerKey,
            'client_secret': consumerSecret,
            'username': username,
            'password': password
        })
    });

    const data = await response.json();
    if (data.access_token) {
        accessToken = data.access_token;
        console.log('Authenticated successfully');
    } else {
        console.error('Authentication failed', data);
    }
}

// Step 2: Create a Record in Salesforce
async function createRecord() {
    if (!accessToken) {
        await authenticate();
    }

    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;

    const newRecord = {
        FirstName: firstName,
        LastName: lastName
    };

    const response = await fetch('https://yourInstance.salesforce.com/services/data/v54.0/sobjects/Contact/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(newRecord)
    });

    const data = await response.json();
    if (data.id) {
        console.log('Record created successfully', data);
        alert("Record created successfully: " + data.id);
    } else {
        console.error('Failed to create record', data);
        alert("Failed to create record");
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
