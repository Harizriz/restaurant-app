const uuid = require('uuid');

// create user
module.exports = (req, res) => {
    const newUser = {
        id: uuid.v4(),
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        email: req.body.email,
        password: req.body.password
    };
    
    console.log(req.body);

    console.log("Here!");

    if(!newUser.firstname || !newUser.lastname || !newUser.email || !newUser.password) {
        return res.status(400).json({ msg: 'Please include firstname, lastname, email and password' });
    }

}