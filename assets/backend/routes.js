const express = require('express');
const path = require('path');
const logger = require('./middleware/logger');
const users = require('./routes/api/users');
const tables = require('./routes/api/tables');
const menus = require('./routes/api/menus');
const orders = require('./routes/api/orders');
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

// get member
app.post('/api/users/login', users.getUser);

// create member
app.post('/api/users', users.createUser);

// get user info
app.get('/api/users/:email', users.getUserInfo);

// update user password
app.put('/api/users/:id', users.updateUserPassword);

// create table
app.post('/api/tables', tables.createTable);

// get table
app.get('/api/tables', tables.getTableInfo);

// delete a row in table
app.delete('/api/tables/:id', tables.deleteTable);

// update a row in table
app.put('/api/tables/:id', tables.updateTable);

// create a menu
app.post('/api/menus', menus.createMenu);

// get menus
app.get('/api/menus', menus.getMenus);

// delete a menu
app.delete('/api/menus/:id', menus.deleteMenu);

// delete all dishes if the menu is deleted
app.delete('/api/menus/dishes/:id', menus.deleteDishes);

// create a dish
app.post('/api/menus/dishes', menus.createDish);

// get dishes
app.get('/api/menus/:menuId', menus.getDishes);

// add dish to cart
app.post('/api/orders', orders.createOrder);

// add table number to order list
app.post('/api/orders/tableId', orders.createTableIdOrder);

// get orders for cart
app.get('/api/orders', orders.getOrder);

// update an item in the cart
app.put('/api/orders/:itemId', orders.updateOrder);

// remove an item from the cart
app.delete('/api/orders/:itemId', orders.deleteOrder);

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log('Server started on port ' + PORT));