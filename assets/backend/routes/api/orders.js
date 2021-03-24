const Parse = require('parse/node');

module.exports = {
    // need to add order number once the qrcode problem has been solved
    createOrder : (req, res) => {
        const newOrder = {
            dishName: req.body.dishName,
            dishQuantity: req.body.dishQuantity,
            dishRemarks: req.body.dishRemarks,
            dishPrice: req.body.dishPrice,
        }

        if(!newOrder.dishQuantity) {
            return res.status(400).send({ msg: 'Please enter the quantity!' });
        }

        // read database to check existing users using email
        async function createOrder() {
            
            const Order = Parse.Object.extend("Order");
            const order = new Order();

            order.set("dishName", newOrder.dishName);
            order.set("dishQuantity", newOrder.dishQuantity);
            order.set("dishRemarks", newOrder.dishRemarks);
            order.set("dishPrice", newOrder.dishPrice);

            try {
                let result = order.save()
                console.log("Trying to save string");
                // console.log(result)
            }
            catch(error) {
                console.log('Failed to create new object, with error code: ' + error.message);
            }         
            
            // res.send(newOrder);
            res.send({ msg: "Dish added to cart!" });
           
        }

        createOrder();
    },

    getOrder: (req, res) => {

        // get order by unique idNumber because there are
        // a lot of customers ordering at the same time
        async function retrieveOrder() {
            const Order = Parse.Object.extend("Order");
            const query = new Parse.Query(Order);
            // query.exists("qrCodeValue")

            const order = await query.find();  
            // console.log(order);
            res.send(order);
        }

        retrieveOrder();

    },

    // need to include table number
    updateOrder: (req, res) => {

        const newData = {
            dishId: req.body.dishId,
            newItemQuantityValue: req.body.newItemQuantityValue
        }

        async function updateOrder() {
            const Order = Parse.Object.extend("Order");
            const query = new Parse.Query(Order)
            query.equalTo("objectId", newData.dishId)
            // query.equalTo("tableNumber", newData.dishId)

            const chosenOrder = await query.find();  
            console.log(chosenOrder[0])

            chosenOrder[0].save().then(() => {
                // Now let's update it with some new data. In this case, only cheatMode and score
                // will get sent to the cloud. playerName hasn't changed.
                chosenOrder[0].set("dishQuantity", newData.newItemQuantityValue);
                console.log(chosenOrder[0].save());
                res.send({ msg: "Order updated!" })
                return chosenOrder[0].save();
            });
        }

        updateOrder();

    },

    deleteOrder: (req, res) => {

        const deleteOrder = {
            dishId: req.body.dishId,
        }

        // delete a specific order in database
        async function removeOrder() {
            
            const Order = Parse.Object.extend("Order");
            const query = new Parse.Query(Order)
            query.equalTo("objectId", deleteOrder.dishId)

            const chosenItem = await query.find();  
            console.log(chosenItem[0])
            chosenItem[0].destroy().then((order) => {
                // the object was deleted successfully
                console.log(order + " is destroyed")
                res.send({ msg: "order is destroyed" })
            }, (error) => {
                // delete operation failed
                console.log(error)
                res.send({ msg: "error" })
            });

        }
        
        removeOrder();

    }
}