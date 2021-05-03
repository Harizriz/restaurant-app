const Parse = require('parse/node');

module.exports = { 
    createUserLogin : (req, res) => {
        const newUserLogin = {
            email: req.body.email,
            counter: req.body.counter
        };
                
        if (!newUserLogin.email) {
            return res.status(400).send({ msg: 'Error' });
        }
        
        // read database to check existing users using email
        async function retrieveUser() {
            const UserLogin = Parse.Object.extend("UserLogin");
            const query = new Parse.Query(UserLogin);
            query.equalTo("email", newUserLogin.email);

            const userLogin = await query.find();  
            
            // if the user's email does not exist in database, create newUserLogin
            if(userLogin.length == 0) {
                const UserLogin = Parse.Object.extend("UserLogin");
                const userLogin = new UserLogin();
    
                userLogin.set("email", newUserLogin.email);
                userLogin.set("counter", newUserLogin.counter);

                try {
                    let result = userLogin.save()
                    console.log("Trying to save string");
                }
                catch(error) {
                    console.log('Failed to create new object, with error code: ' + error.message);
                }
                res.send(newUserLogin);
            }
            else {
                res.send({ msg: "User already logged in!" });
            }
        }
                
        retrieveUser();

    },

    deleteUserLogin: (req, res) => {
        const removeUser = {
            queueNumber: req.body.queueNumber,
        }

        async function removeUserLogin() {
            
            const UserLogin = Parse.Object.extend("UserLogin");
            const query = new Parse.Query(UserLogin)
            query.equalTo("counter", removeUser.queueNumber)

            const chosenUser = await query.find();  
            console.log(chosenUser[0])
            chosenUser[0].destroy().then((user) => {
                console.log(user + " is destroyed")
                res.send({ msg: "user is destroyed" })
            }, (error) => {
                console.log(error)
                res.send({ msg: "error" })
            });

        }
        
        removeUserLogin();

    },

    getLastUserCounter : (req, res) => {
        async function retrieveQueueList() {
            const UserLogin = Parse.Object.extend("UserLogin");
            const query = new Parse.Query(UserLogin);
            query.limit(1)
            query.descending("counter")

            const userLogin = await query.find();  
            res.send(userLogin);
        }

        retrieveQueueList();

    },

}