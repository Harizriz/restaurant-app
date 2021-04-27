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
        
        async function retrieveCustomer() {
            const Virtual = Parse.Object.extend("Virtual");
            const query = new Parse.Query(Virtual);
            query.equalTo("pax", newCustomer.pax);

            const virtual = await query.find();  
            
            if(virtual.length == 0) {
                const Virtual = Parse.Object.extend("Virtual");
                const virtual = new Virtual();
    
                virtual.set("pax", newCustomer.pax);
                virtual.set("virtualQueueNumber", newCustomer.virtualQueueNumber);
    
                try {
                    let result = virtual.save()
                    console.log("Trying to save string");
                }
                catch(error) {
                    console.log('Failed to create new object, with error code: ' + error.message);
                }
                res.send({ msg: "You are in the queue!" });
            }
            else {
                res.send({ msg: "Tables are full!" });
            }
        }
                
        retrieveCustomer();

    },

    getQueueList : (req, res) => {
        async function retrieveQueueList() {
            const Virtual = Parse.Object.extend("Virtual");
            const query = new Parse.Query(Virtual);

            const virtual = await query.find();  
            res.send(virtual);
        }

        retrieveQueueList();

    },

    removeUserFromQueue: (req, res) => {
        const removeUser = {
            queueNumber: req.body.queueNumber,
        }

        async function removeCustomer() {
            
            const Virtual = Parse.Object.extend("Virtual");
            const query = new Parse.Query(Virtual)
            query.equalTo("virtualQueueNumber", removeUser.queueNumber)

            const chosenCustomer = await query.find();  
            console.log(chosenCustomer[0])
            chosenCustomer[0].destroy().then((customer) => {
                console.log(customer + " is destroyed")
                res.send({ msg: "customer is destroyed" })
            }, (error) => {
                console.log(error)
                res.send({ msg: "error" })
            });

        }
        
        removeCustomer();

    },
}