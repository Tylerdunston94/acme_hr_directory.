const { sequelize, Department, Employee } = require('./models');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const hr = await Department.create({ name: 'Human Resources' });
    const it = await Department.create({ name: 'IT' });

    await Employee.bulkCreate([
        { name: 'Alice', department_id: hr.id },
        { name: 'Bob', department_id: it.id },
        { name: 'Charlie', department_id: hr.id }
    ]);

    console.log('Database has been seeded!');
};

seedDatabase().catch(console.error);
