const Parse = require('parse/node');

module.exports = {
    createOrder : (req, res) => {
        const newOrder = {
            dishName: req.body.dishName,
            dishQuantity: req.body.dishQuantity,
            dishRemarks: req.body.dishRemarks,
            dishPrice: req.body.dishPrice,
            tableId: req.body.tableId,
            preparedItem: req.body.preparedItem
        }

        if(!newOrder.dishQuantity) {
            return res.status(400).send({ msg: 'Please enter the quantity!' });
        }

        async function createOrder() {
            
            const Order = Parse.Object.extend("Order");
            const order = new Parse.Query(Order);
            order.equalTo("dishName", newOrder.dishName)
            order.equalTo("tableId", newOrder.tableId)

            const chosenOrder = await order.find();  
            
            if(chosenOrder.length == 0) {
                const Order = Parse.Object.extend("Order");
                const order = new Order();

                order.set("dishName", newOrder.dishName);
                order.set("dishQuantity", newOrder.dishQuantity);
                order.set("dishRemarks", newOrder.dishRemarks);
                order.set("dishPrice", newOrder.dishPrice);
                order.set("tableId", newOrder.tableId);
                order.set("preparedDish", newOrder.preparedItem)

                try {
                    let result = order.save()
                    console.log("Trying to save string");
                }
                catch(error) {
                    console.log('Failed to create new object, with error code: ' + error.message);
                }         
            }
            else {
                let item = chosenOrder[0].get("dishQuantity")
                chosenOrder[0].save().then(() => {
                    chosenOrder[0].set("dishQuantity", newOrder.dishQuantity + item);
                    console.log(chosenOrder[0].save());
                    res.send({ msg: "Order updated without duplicating!" })
                    return chosenOrder[0].save();
                });
            }
            
            res.send({ msg: "Dish added to cart!" });
           
        }

        createOrder();
    },

    createKitchenOrder : (req, res) => {
        const newKitchenOrder = {
            dishName: req.body.dishName,
            dishQuantity: req.body.dishQuantity,
            dishRemarks: req.body.dishRemarks,
            dishPrice: req.body.dishPrice,
            tableId: req.body.tableId,
            preparedItem: req.body.preparedItem
        }

        if(!newKitchenOrder.dishQuantity) {
            return res.status(400).send({ msg: 'Please enter the quantity!' });
        }

        async function createKitchenOrder() {
            
            const KitchenOrder = Parse.Object.extend("KitchenOrder");
            const kitchenOrder = new Parse.Query(KitchenOrder);
            kitchenOrder.equalTo("dishName", newKitchenOrder.dishName)
            kitchenOrder.equalTo("tableId", newKitchenOrder.tableId)

            const chosenOrder = await kitchenOrder.find();  
            
            if(chosenOrder.length == 0) {
                const KitchenOrder = Parse.Object.extend("KitchenOrder");
                const kitchenOrder = new KitchenOrder();

                kitchenOrder.set("dishName", newKitchenOrder.dishName);
                kitchenOrder.set("dishQuantity", newKitchenOrder.dishQuantity);
                kitchenOrder.set("dishRemarks", newKitchenOrder.dishRemarks);
                kitchenOrder.set("dishPrice", newKitchenOrder.dishPrice);
                kitchenOrder.set("tableId", newKitchenOrder.tableId);
                kitchenOrder.set("preparedDish", newKitchenOrder.preparedItem)

                try {
                    let result = kitchenOrder.save()
                    console.log("Trying to save string");
                }
                catch(error) {
                    console.log('Failed to create new object, with error code: ' + error.message);
                }         
            }
            else {
                let item = chosenOrder[0].get("dishQuantity")
                chosenOrder[0].save().then(() => {
                    chosenOrder[0].set("dishQuantity", newKitchenOrder.dishQuantity + item);
                    console.log(chosenOrder[0].save());
                    res.send({ msg: "Order updated without duplicating!" })
                    return chosenOrder[0].save();
                });
            }
            
            res.send({ msg: "Dish added to Kitchen Order!" });
           
        }

        createKitchenOrder();
    },

    createTableIdOrder : (req, res) => {
        const newTableIdOrder = {
            tableId: req.body.tableId,
        }

        if(!newTableIdOrder.tableId) {
            return res.status(400).send({ msg: 'Please fill the field!' });
        }

        async function generateTableIdForOrder() {
            const Order = Parse.Object.extend("Order");
            const query = new Parse.Query(Order);
            query.equalTo("tableId", newTableIdOrder.tableId);

            const tableOrder = await query.find();  
            
            if(tableOrder.length == 0) {
                const Order = Parse.Object.extend("Order");
                const tableOrder = new Order();
    
                tableOrder.set("tableId", newTableIdOrder.tableId);
    
                try {
                    let result = tableOrder.save()
                    console.log("Trying to save string");
                }
                catch(error) {
                    console.log('Failed to create new object, with error code: ' + error.message);
                }         
                
                res.send({ msg: "New table order created successfully!" });

            }
            else {
                res.send({ msg: "Table order already exist!" });
            }
        }

        generateTableIdForOrder()

    },

    getOrder: (req, res) => {
        async function retrieveOrder() {
            const Order = Parse.Object.extend("Order");
            const query = new Parse.Query(Order);
            query.equalTo("tableId", req.params.tableId);

            const order = await query.find();  
            res.send(order);
        }

        retrieveOrder();

    },

    getOrders: (req, res) => {
        async function retrieveOrders() {
            const Order = Parse.Object.extend("Order");
            const query = new Parse.Query(Order);

            const order = await query.find();  
            res.send(order);
        }

        retrieveOrders();

    },

    getOrdersKitchen: (req, res) => {
        async function retrieveOrders() {
            const KitchenOrder = Parse.Object.extend("KitchenOrder");
            const query = new Parse.Query(KitchenOrder);

            const order = await query.find();  
            res.send(order);
        }

        retrieveOrders();

    },

    updateOrder: (req, res) => {

        const newData = {
            dishId: req.body.dishId,
            newItemQuantityValue: req.body.newItemQuantityValue
        }

        async function updateOrder() {
            const Order = Parse.Object.extend("Order");
            const query = new Parse.Query(Order)
            query.equalTo("objectId", newData.dishId)

            const chosenOrder = await query.find();  
            console.log(chosenOrder[0])

            chosenOrder[0].save().then(() => {
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

        async function removeOrder() {
            
            const Order = Parse.Object.extend("Order");
            const query = new Parse.Query(Order)
            query.equalTo("objectId", deleteOrder.dishId)

            const chosenItem = await query.find();  
            console.log(chosenItem[0])
            chosenItem[0].destroy().then((order) => {
                console.log(order + " is destroyed")
                res.send({ msg: "order is destroyed" })
            }, (error) => {
                console.log(error)
                res.send({ msg: "error" })
            });

        }
        
        removeOrder();

    },

    updateOrderToServed: (req, res) => {
        const newData = {
            objectId: req.body.objectId,
            preparedItem: req.body.preparedItem
        }

        async function updateOrderToServed() {
            const Order = Parse.Object.extend("Order");
            const query = new Parse.Query(Order)
            query.equalTo("objectId", newData.objectId)

            const chosenOrder = await query.find();  
            console.log(chosenOrder[0])

            chosenOrder[0].save().then(() => {
                chosenOrder[0].set("preparedDish", newData.preparedItem);
                console.log(chosenOrder[0].save());
                res.send({ msg: "Order updated!" })
                return chosenOrder[0].save();
            });
        }

        updateOrderToServed();

    },

    deleteOrderToServed: (req, res) => {
        const deleteOrder = {
            objectId: req.body.objectId,
        }

        async function removeOrderToServed() {
            
            const KitchenOrder = Parse.Object.extend("KitchenOrder");
            const query = new Parse.Query(KitchenOrder)
            query.equalTo("objectId", deleteOrder.objectId)

            const chosenItem = await query.find();  
            console.log(chosenItem[0])
            chosenItem[0].destroy().then((order) => {
                console.log(order + " is destroyed")
                res.send({ msg: "order is destroyed" })
            }, (error) => {
                console.log(error)
                res.send({ msg: "error" })
            });

        }
        
        removeOrderToServed();

    },

    deleteServedOrder: (req, res) => {
        const deleteServedOrder = {
            tableId: req.body.tableId,
        }

        async function removeServedOrder() {
            
            const Order = Parse.Object.extend("Order");
            const query = new Parse.Query(Order)
            query.equalTo("tableId", deleteServedOrder.tableId)

            const chosenItem = await query.find();  
            console.log(chosenItem)
            res.send(chosenItem)
            for (let i = 0; i < chosenItem.length; i++) {
                chosenItem[i].destroy().then((order) => {
                    console.log(order + " is destroyed")
                    res.send({ msg: "order is destroyed" })
                }, (error) => {
                    console.log(error)
                    res.send({ msg: "error" })
                });
            }
        }
        
        removeServedOrder();
    }
}