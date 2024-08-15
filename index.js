const express = require('express');
const bodyParser = require('body-parser');
const { sequelize, Department, Employee } = require('./models');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// API routes

app.get('/api/employees', async (req, res) => {
    const employees = await Employee.findAll();
    res.json(employees);
});

app.get('/api/departments', async (req, res) => {
    const departments = await Department.findAll();
    res.json(departments);
});

app.post('/api/employees', async (req, res) => {
    const employee = await Employee.create(req.body);
    res.status(201).json(employee);
});

app.delete('/api/employees/:id', async (req, res) => {
    const id = req.params.id;
    await Employee.destroy({ where: { id } });
    res.status(204).send(); // No content response
});

app.put('/api/employees/:id', async (req, res) => {
    const id = req.params.id;
    const [updated] = await Employee.update(req.body, {
        where: { id }
    });
    if (updated) {
        const updatedEmployee = await Employee.findOne({ where: { id } });
        res.json(updatedEmployee);
    } else {
        res.status(404).json({ error: 'Employee not found' });
    }
});

// Error handling
app.use((req, res) => {
    res.status(404).json({ error: 'Not Found' });
});

// Start the server
const startServer = async () => {
    await sequelize.sync();
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
};

startServer();
