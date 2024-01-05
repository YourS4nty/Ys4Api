// Calling Modules
const express = require('express');
const path = require('path');

// Creating App
const app = express();

// Configuration
const PORT = process.env.PORT || 8080;
app.set('port', PORT);
app.set('json spaces', 2);

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Static Files
app.use(express.static(path.join(__dirname, 'views')));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.use(require(path.join(__dirname, 'views', 'routes', 'app.js')));

// Starting Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
