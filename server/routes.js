const express = require('express');
const router = express.Router();
const axios = require('axios');
const client = require('./db');

// Fetch data from WazirX API and store in database
router.get('/fetch-tickers', async (req, res) => {
    try {
        const response = await axios.get('https://api.wazirx.com/api/v2/tickers');
        const tickers = Object.values(response.data).slice(0, 10);

        // Clear existing data in the tickers table
        await client.query('TRUNCATE TABLE tickers');

        const insertQuery = 'INSERT INTO tickers (name, last, buy, sell, volume, base_unit) VALUES ($1, $2, $3, $4, $5, $6)';
        tickers.forEach(async (ticker) => {
            await client.query(insertQuery, [ticker.name, ticker.last, ticker.buy, ticker.sell, ticker.volume, ticker.base_unit]);
        });

        res.send('Tickers data stored in the database.');
    } catch (error) {
        res.status(500).json({ error: 'Error fetching tickers' });
    }
});
// Get data from the database to display on the frontend
router.get('/tickers', async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM tickers LIMIT 10');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data from the database' });
    }
});

module.exports = router;
