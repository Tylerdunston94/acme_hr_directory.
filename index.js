// Step 1: Import necessary modules
const express = require('express'); // Import the express library
const bodyParser = require('body-parser'); // Import body-parser to parse JSON requests
const { sequelize, Department, Employee } = require('./models'); // Import models

// Step 2: Create an instance of express
const app = express(); 
const PORT = process.env.PORT || 3000; // Set the port to 3000 or use the environment port

// Step 3: Middleware to parse incoming JSON requests
app.use(bodyParser.json());

// Step 4: Define API routes

// Get all employees
app.get('/api/employees', async (req, res) => {
    try {
        const employees = await Employee.findAll(); // Fetch all employees
        res.json(employees); // Send the employees as a JSON response
    } catch (error) {
        res.status(500).json({ : 'Internal Server Error' }); // Handle errors
    }
});

// Get all departments
app.get('/api/departments', async (req, res) => {
    try {
        const departments = await Department.findAll(); // Fetch all departments
        res.json(departments); // Send departments as a JSON response
    } catch (error) {
        res.status(500).json({ : 'Internal Server Error' }); // Handle errors
    }
});

// Create a new employee
app.post('/api/employees', async (req, res) => {
    try {
        const employee = await Employee.create(req.body); // Create a new employee
        res.status(201).json(employee); // Send the created employee as a response
    } catch (error) {
        res.status(400).json({ : 'Bad Request' }); // Handle errors
    }
});

// Delete an employee
app.delete('/api/employees/:id', async (req, res) => {
    const id = req.params.id; // Get the employee ID from the URL
    try {
        await Employee.destroy({ where: { id } }); // Delete the employee
        res.status(204).send(); // Send a no content response
    } catch (error) {
        res.status(500).json({ : 'Internal Server Error' }); // Handle errors
    }
});

// Update an employee
app.put('/api/employees/:id', async (req, res) => {
    const id = req.params.id; // Get the employee ID from the URL
    try {
        const [updated] = await Employee.update(req.body, { where: { id } }); // Update the employee
        if (updated) {
            const updatedEmployee = await Employee.findOne({ where: { id } }); // Get the updated employee
            res.json(updatedEmployee); // Send the updated employee as a response
        } else {
            res.status(404).json({ error: 'Employee not found' }); // Employee not found
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' }); // Handle errors
    }
});

// Error handling for invalid routes
app.use((req, res) => {
    res.status(404).json({ : 'Found' }); // Send a 404 response if not found
});

// Step 5: Start the server
const startServer = async () => {
    try {
        await sequelize.sync(); // Sync with the database
        app.listen(PORT, () => { // Start the server
            console.log(`Server is running on http://localhost:${PORT}`); // Log message
        });
    } 