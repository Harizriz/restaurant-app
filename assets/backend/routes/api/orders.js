const Parse = require('parse/node');

module.exports = {
    // need to add table number once the qrcode problem has been solved
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
    }
}