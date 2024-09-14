const { Client } = require('pg');

// Set up PostgreSQL client
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'hodlinfo',
    password: 'admin',
    port: 5432
});

client.connect()
    .then(() => console.log('Connected to PostgreSQL'))
    .catch(err => console.error('Connection error:', err.stack));

module.exports = client;
