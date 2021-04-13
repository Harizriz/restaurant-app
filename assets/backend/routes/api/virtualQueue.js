const Parse = require('parse/node');

module.exports = {
    addUserToQueue : (req, res) => {
        const newCustomer = {
            pax: req.body.pax,
            virtualQueueNumber: req.body.virtualQueueNumber,
        };
                
        if(!newCustomer.pax || !newCustomer.virtualQueueNumber) {
            return res.status(400).send({ msg: 'Error!' });
        }
        
        // read database to check existing users using email
        async function retrieveCustomer() {
            const Virtual = Parse.Object.extend("Virtual");
            const query = new Parse.Query(Virtual);
            query.equalTo("pax", newCustomer.pax);

            const virtual = await query.find();  
            
            // if the virtual's email does not exist in database, create newCustomer
            if(virtual.length == 0) {
                const Virtual = Parse.Object.extend("Virtual");
                const virtual = new Virtual();
    
                virtual.set("pax", newCustomer.pax);
                virtual.set("virtualQueueNumber", newCustomer.virtualQueueNumber);
    
                try {
                    let result = virtual.save()
                    console.log("Trying to save string");
                    // console.log(result)
                }
                catch(error) {
                    console.log('Failed to create new object, with error code: ' + error.message);
                }
                res.send({ msg: "You are in the queue!" });
            }
            else {
                // POST request in postman
                res.send({ msg: "Tables are full!" });
            }
        }
                
        retrieveCustomer();

    },

    getQueueList : (req, res) => {
        
        // read database to get user's information
        async function retrieveQueueList() {
            const Virtual = Parse.Object.extend("Virtual");
            const query = new Parse.Query(Virtual);

            const virtual = await query.find();  
            // console.log(virtual);
            res.send(virtual);
        }

        retrieveQueueList();

    },

    removeUserFromQueue: (req, res) => {

        const removeUser = {
            queueNumber: req.body.queueNumber,
        }

        // delete a specific table in database
        async function removeCustomer() {
            
            const Virtual = Parse.Object.extend("Virtual");
            const query = new Parse.Query(Virtual)
            query.equalTo("virtualQueueNumber", removeUser.queueNumber)

            const chosenCustomer = await query.find();  
            console.log(chosenCustomer[0])
            chosenCustomer[0].destroy().then((customer) => {
                // the object was deleted successfully
                console.log(customer + " is destroyed")
                res.send({ msg: "customer is destroyed" })
            }, (error) => {
                // delete operation failed
                console.log(error)
                res.send({ msg: "error" })
            });

        }
        
        removeCustomer();

    },
}