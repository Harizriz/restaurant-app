const Parse = require('parse/node');
const uuid = require('uuid');

// create user
module.exports = { 
    createUser : (req, res) => {
        const newUser = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password
        };
                
        if(!newUser.firstName || !newUser.lastName || !newUser.email || !newUser.password) {
            return res.status(400).send({ msg: 'Please fill all the fields!' });
        }
        
        // read database to check existing users using email
        async function retrievePerson() {
            const Person = Parse.Object.extend("Person");
            const query = new Parse.Query(Person);
            query.equalTo("email", newUser.email);

            const person = await query.find();  
            
            // if the person's email does not exist in database, create newUser
            if(person.length == 0) {
                const Person = Parse.Object.extend("Person");
                const person = new Person();
    
                person.set("firstname", newUser.firstName);
                person.set("lastname", newUser.lastName);
                person.set("email", newUser.email);
                person.set("password", newUser.password);
    
                try {
                    let result = person.save()
                    console.log("Trying to save string");
                    console.log(result)
                }
                catch(error) {
                    console.log('Failed to create new object, with error code: ' + error.message);
                }
                res.send(newUser);
            }
            else {
                // POST request in postman
                res.send({ msg: "User already exist!" });
            }
        }
                
        retrievePerson();

    },

    getUser : (req, res) => {
        const user = {
            email: req.body.email,
            password: req.body.password
        };

        if(!user.email || !user.password) {
            return res.status(400).send({ msg: 'Please fill all the fields!' });
        }

        // read database to check existing users for authentication
        async function retrieveUser() {
            const Person = Parse.Object.extend("Person");
            const query = new Parse.Query(Person);
            query.equalTo("email", user.email);
            query.equalTo("password", user.password);

            const person = await query.find();  
            console.log(person);

            if(person.length == 0) {
                res.send({ msg: 'Incorrect email or password'});
            }
            else {
                res.send(user);
                res.send({ msg: 'Login successfully!'});
            }
        }

        retrieveUser();

    }
}