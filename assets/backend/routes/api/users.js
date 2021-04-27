const Parse = require('parse/node');

module.exports = { 
    createUser : (req, res) => {
        const newUser = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            subpoint: 0
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
                person.set("subpoint", newUser.subpoint);
    
                try {
                    let result = person.save()
                    console.log("Trying to save string");
                }
                catch(error) {
                    console.log('Failed to create new object, with error code: ' + error.message);
                }
                res.send(newUser);
            }
            else {
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

            if(person.length == 0) {
                res.send({ msg: 'Incorrect email or password'});
            }
            else {
                res.send(user);
                res.send({ msg: 'Login successfully!'});
            }
        }

        retrieveUser();

    },

    getUserInfo : (req, res) => {
        async function retrieveUser() {
            const Person = Parse.Object.extend("Person");
            const query = new Parse.Query(Person);
            query.equalTo("email", req.params.email);

            const person = await query.find();  
            console.log(person);
            res.send(person);
        }

        retrieveUser();

    },

    updateUserPassword: (req, res) => {
        const passwordInformation = {
            userId: req.body.userId,
            newPassword: req.body.newPassword,
            confirmNewPassword: req.body.confirmNewPassword
        }

        async function updatePassword() {
            const Person = Parse.Object.extend("Person");
            const query = new Parse.Query(Person)
            query.equalTo("objectId", passwordInformation.userId)

            const password = await query.find();  
            console.log(password[0])

            password[0].save().then(() => {
                password[0].set("password", passwordInformation.confirmNewPassword);
                console.log(password[0].save());
                res.send({ msg: "Password updated!" })
                return password[0].save();
            });
        }

        updatePassword();

    },

    updateUserPoints: (req, res) => {
        const data = {
            email: req.body.email,
            points: req.body.points,
        }

        async function updatePoint() {
            const Person = Parse.Object.extend("Person");
            const query = new Parse.Query(Person)
            query.equalTo("email", data.email)

            const password = await query.find();  
            console.log(password[0])

            password[0].save().then(() => {
                password[0].set("subpoint", data.points);
                console.log(password[0].save());
                res.send({ msg: "subpoint updated!" })
                return password[0].save();
            });
        }

        updatePoint();

    },

    deleteUserPoints: (req, res) => {
        const data = {
            email: req.body.email,
            points: req.body.points,
        }

        async function deletePoint() {
            const Person = Parse.Object.extend("Person");
            const query = new Parse.Query(Person)
            query.equalTo("email", data.email)

            const points = await query.find();  
            console.log(points[0])

            points[0].save().then(() => {
                points[0].set("subpoint", data.points);
                console.log(points[0].save());
                res.send({ msg: "subpoint updated!" })
                return points[0].save();
            });
        }

        deletePoint();

    }

}