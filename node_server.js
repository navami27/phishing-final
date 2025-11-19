const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const JSON_FILE_PATH = path.join(__dirname, 'items.json');

// Middleware to parse JSON bodies from POST requests
app.use(express.json());

// --- Helper Functions for File Operations ---

/**
 * Reads the JSON file content and returns a JavaScript array/object.
 */
const readJsonFile = () => {
    try {
        const data = fs.readFileSync(JSON_FILE_PATH, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading JSON file:', err.message);
        // If the file doesn't exist or is invalid, start with an empty array
        return []; 
    }
};

/**
 * Writes a JavaScript array/object to the JSON file.
 * @param {Array<Object>} data - The data to write.
 */
const writeJsonFile = (data) => {
    try {
        // Format the JSON with nice indentation for readability (optional)
        fs.writeFileSync(JSON_FILE_PATH, JSON.stringify(data, null, 2), 'utf8');
    } catch (err) {
        console.error('Error writing JSON file:', err.message);
    }
};

// --- Endpoints ---

/**
 * Endpoint 1: GET /api/items
 * Serves the entire list of items in the required format.
 */
app.get('/api/items', (req, res) => {
    const itemsList = readJsonFile();
    
    // Respond with the raw JSON data (an array of objects)
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(itemsList);
});

/**
 * Endpoint 2: POST /api/items
 * Adds a new item to the list and updates the JSON file.
 */
app.post('/api/items', (req, res) => {
    const newItem = req.body;

    if (!newItem || Object.keys(newItem).length === 0) {
        return res.status(400).json({ message: 'Request body cannot be empty.' });
    }

    const itemsList = readJsonFile();

    // Optional: Add a simple ID to the new item for demonstration purposes
    const newId = itemsList.length > 0 ? itemsList[itemsList.length - 1].id + 1 : 1;
    newItem.id = newId;

    // Append the new item to the list
    itemsList.push(newItem);

    // Persist the updated list back to the file
    writeJsonFile(itemsList);

    // Respond with the newly added item and success message
    res.status(201).json({ 
        message: 'Item added successfully', 
        newItem: newItem,
        totalItems: itemsList.length
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`GET list endpoint: http://localhost:${PORT}/api/items`);
    console.log(`POST add item endpoint: http://localhost:${PORT}/api/items`);
});