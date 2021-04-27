const express = require('express');
const path = require('path');
const logger = require('./middleware/logger');
const user = require('./routes/api/user');
const users = require('./routes/api/users');
const tables = require('./routes/api/tables');
const menus = require('./routes/api/menus');
const orders = require('./routes/api/orders');
const virtualQueue = require('./routes/api/virtualQueue');
const coupons = require('./routes/api/coupons');
const keys = require('./constants/keys');
const Parse = require('parse/node');

const app = express();

Parse.initialize(keys.applicationId, keys.javascriptKey);
Parse.serverURL = keys.serverURL;

const createInstallation = async () => {
    const Installation = Parse.Object.extend(Parse.Installation);
    const installation = new Installation();

    installation.set("deviceType", process.platform);

    await installation.save();
}

createInstallation();

// init middleware
// app.use(logger);

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// USER LOGIN LOG

// create new login log for user
app.post('/api/user', user.createUserLogin);

// remove user from login
app.delete('/api/user/:email', user.deleteUserLogin);

// get a user with the highest counter number
app.get('/api/user/lastuser', user.getLastUserCounter);

// USERS

// get member
app.post('/api/users/login', users.getUser);

// create member
app.post('/api/users', users.createUser);

// get user info
app.get('/api/users/:email', users.getUserInfo);

// update user password
app.put('/api/users/:id', users.updateUserPassword);

// update user's points
app.put('/api/users/points/:email', users.updateUserPoints);

// delete user's points if redeemed
app.put('/api/users/points/redeem/:email', users.deleteUserPoints);


// TABLES

// create table
app.post('/api/tables', tables.createTable);

// get table
app.get('/api/tables', tables.getTableInfo);

// delete a row in table
app.delete('/api/tables/:id', tables.deleteTable);

// update a row in table
app.put('/api/tables/:id', tables.updateTable);

// update table's occupant status
app.put('/api/tables/status/:id', tables.updateTableStatus);

// update to checkout customer
app.put('/api/tables/checkout/:id', tables.checkoutTable);

// MENUS

// create a menu
app.post('/api/menus', menus.createMenu);

// get menus
app.get('/api/menus', menus.getMenus);

// delete a menu
app.delete('/api/menus/:id', menus.deleteMenu);

// delete all dishes if the menu is deleted
app.delete('/api/menus/dishes/:id', menus.deleteDishes);

// delete a dish
app.delete('/api/menus/dish/:id', menus.deleteDish);

// update a dish
app.put('/api/menus/dish/:id', menus.updateDish);

// create a dish
app.post('/api/menus/dishes', menus.createDish);

// get dishes
app.get('/api/menus/:menuId', menus.getDishes);

// ORDERS

// add dish to cart
app.post('/api/orders', orders.createOrder);

// add dish to kitchen order
app.post('/api/orders/kitchen', orders.createKitchenOrder);

// add table number to order list
app.post('/api/orders/tableId', orders.createTableIdOrder);

// get order by id number for cart
app.get('/api/orders/:tableId', orders.getOrder);

// get all orders
app.get('/api/orders', orders.getOrders);

// get all orders for kitchen helper
app.get('/api/orders/kitchen/kit', orders.getOrdersKitchen);

// update an item in the cart
app.put('/api/orders/:itemId', orders.updateOrder);

// remove an item from the cart
app.delete('/api/orders/:itemId', orders.deleteOrder);

// update the order to prepared for kitchen helper
app.put('/api/orders/order/:itemId', orders.updateOrderToServed);

// delete the prepared order for kitchen helper
app.delete('/api/orders/order/:itemId', orders.deleteOrderToServed);

// delete the an order in order list
app.delete('/api/orders/waiter/:tableId', orders.deleteServedOrder);

// VIRTUAL QUEUE

// add customer to virtual queue
app.post('/api/virtualQueue', virtualQueue.addUserToQueue);

// get virtual queue list
app.get('/api/virtualQueue/list', virtualQueue.getQueueList);

// remove customer from queue
app.delete('/api/virtualQueue/:queueNumber', virtualQueue.removeUserFromQueue);

// COUPONS

// create table
app.post('/api/coupons', coupons.createCoupon);

// get table
app.get('/api/coupons', coupons.getCoupons);

// delete a row in table
app.delete('/api/coupons/:id', coupons.deleteCoupon);

// get a specific coupon and validate
app.get('/api/coupons/customer/:couponName', coupons.getCoupon);

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log('Server started on port ' + PORT));