const express = require('express');
const app = express();
const routes = require('./routes');

// Serve static files from the public folder
app.use(express.static('public'));

// Use routes to handle API
app.use('/', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
