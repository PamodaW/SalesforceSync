# SalesforceSync (Salesforce Interaction App)

A simple web application that allows users to interact with Salesforce. Users can add new contacts by entering the first and last names and view existing contacts directly from Salesforce. The application is designed with a clean, user-friendly interface, featuring a Salesforce-themed background.

## Features

- **Add New Contacts**: Users can enter the first and last names to create a new contact record in Salesforce.
- **View Existing Contacts**: Users can view a list of existing contacts stored in Salesforce.
- **Clean User Interface**: The app has a simple and appealing UI that includes a Salesforce-themed background.

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Salesforce API**: Used for authentication, creating contacts, and retrieving contact data

## Setup Instructions

### Prerequisites

- **Node.js Version**: 14.x or later
- **Salesforce Connected App**

To interact with Salesforce, you need to create a **Connected App** in Salesforce to obtain the necessary credentials (Consumer Key and Consumer Secret). Follow these steps:

1. **Log in to Salesforce** and go to **Setup**.
2. In the **Quick Find** box, type **App Manager** and click on **App Manager**.
3. Click on **New Connected App**.
4. Fill in the required details:
   - **Connected App Name**: Salesforce Interaction App
   - **API Name**: Salesforce\_Interaction\_App
   - **Contact Email**: [Your Email]
5. Under **API (Enable OAuth Settings)**, check **Enable OAuth Settings**.
6. Set the **Callback URL** to `http://localhost:3000/oauth/callback` (or your application's URL).
7. Select the following **OAuth Scopes**:
   - `Full access (full)`
   - `Access and manage your data (api)`
8. Click **Save** and **Continue**.
9. After saving, you will be provided with the **Consumer Key** and **Consumer Secret**. Use these in your `.env` file. Note: It may take up to 10-15 minutes for the Salesforce Connected App to become active after setup.

Follow these steps to run the project locally:

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/yourusername/salesforce-interaction-app.git
   ```

2. **Install Dependencies**:
   Navigate to the project directory and install the required packages:

   ```bash
   cd salesforce-interaction-app
   npm install
   ```

3. **Set Up Environment Variables**:
   Create a `.env` file in the root directory and add the following details. Replace `your_consumer_key`, `your_consumer_secret`, etc., with the actual values from your Salesforce Connected App:

   ```
   SALESFORCE_CONSUMER_KEY=your_consumer_key
   SALESFORCE_CONSUMER_SECRET=your_consumer_secret
   SALESFORCE_USERNAME=your_salesforce_username
   SALESFORCE_PASSWORD=your_salesforce_password_with_security_token
   ```

4. **Start the Server**:
   For easier development, you can install nodemon to automatically restart the server when changes are made:

   ```bash
   npm install -g nodemon
   nodemon server.js
   ```

   Or you can run the server manually:

   ```bash
   node server.js
   ```

   ```bash
   node server.js
   ```

   The server will start on `http://localhost:3000`.

5. **Open the Application**:
   Open your browser and navigate to `http://localhost:3000` to use the app.

## Usage

- Enter the **First Name** and **Last Name** in the form to create a new Salesforce contact.
- Click **Show Contacts** to view a list of existing contacts stored in Salesforce.

## Folder Structure

- **client/**: Contains the front-end files (`index.html`, `style.css`, `script.js`).
- **server.js**: The Node.js server handling Salesforce interactions.

## Dependencies

- **express**
- **node-fetch**
- **cors**
- **dotenv**

## Copyright

© 2024 Pamoda Wijesinghe

