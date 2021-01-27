const express = require('express');
const path = require('path');
const logger = require('./middleware/logger');
const users = require('./routes/api/users');
const keys = require('./constants/keys');
const Parse = require('parse/node');

const app = express();

Parse.initialize(keys.applicationId, keys.javascriptKey);
Parse.serverURL = keys.serverURL;

const createInstallation = async () => {
    const Installation = Parse.Object.extend(Parse.Installation);
    const installation = new Installation();

    installation.set("deviceType", process.platform);

    await installation.save();
}

createInstallation();

// init middleware
// app.use(logger);

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// get member
app.get('/api/users', users.getUser)

// users API routes
app.post('/api/users', users.createUser);

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log('Server started on port ' + PORT));