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
            return res.status(400).json({ msg: 'Please include firstname, lastname, email and password' });
        }
        
        // TODO read database to check existing users using email
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
        res.send({
            msg: 'Hello World'
        });

        // TODO read the database to get user's data given by email by frontend
        // if email does not exist (fail) notify the user
        // wrong password also need to display the user

        // TODO make sure password is the same as the database (compare)

    }
}