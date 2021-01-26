const express = require('express');
const path = require('path');
const logger = require('./middleware/logger');

const app = express();

var routes = require('./routes/api/users');

// init middleware
// app.use(logger);

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// get member
app.get('/api/users', (req, res) => res.json(users))

// users API routes
app.post('/api/users', routes);

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log('Server started on port ' + PORT));