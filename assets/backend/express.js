const express = require('express');
const path = require('path');

const app = express();

// set staic folder
// this method helps running the whole html files simultaneouosly
// app.use(express.static(path.join(__dirname, 'a folder name containing multiple html files')))

// get member data from json file
// assume that the members json file is defined before this or somewhere else
// by using postman and include the localhost website including the path initialized below to show the json data in postman
// app.get('/api/members', (req, res) => res.json(members))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log('Server started on port' + PORT));