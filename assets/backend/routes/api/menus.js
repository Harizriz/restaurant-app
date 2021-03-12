const Parse = require('parse/node');

module.exports = {
    createMenu : (req, res) => {
        const newMenu = {
            menuName: req.body.menuName,
            dishName: req.body.dishName
        }

        if(!newMenu.menuName) {
            return res.status(400).send({ msg: 'Please fill the field!' });
        }

        // read database to check existing users using email
        async function generateMenu() {
            const Menu = Parse.Object.extend("Menu");
            const query = new Parse.Query(Menu);
            query.equalTo("menuName", newMenu.menuName);

            const menu = await query.find();  
            
            // if the menu does not exist in database, create newMenu
            if(menu.length == 0) {
                const Menu = Parse.Object.extend("Menu");
                const menu = new Menu();
    
                menu.set("menuName", newMenu.menuName);
                menu.set("dishName", newMenu.dishName);
    
                try {
                    let result = menu.save()
                    console.log("Trying to save string");
                    // console.log(result)
                }
                catch(error) {
                    console.log('Failed to create new object, with error code: ' + error.message);
                }         
                
                res.send({ msg: "Menu created successfully!" });

            }
            else {
                // POST request in postman
                res.send({ msg: "Menu already exist!" });
            }
        }

        generateMenu()
        
    },

    getMenus : (req, res) => {
        
        // read database to get user's information
        async function retrieveMenus() {
            const Menu = Parse.Object.extend("Menu");
            const query = new Parse.Query(Menu);
            query.exists("menuName")

            const menu = await query.find();  
            // console.log(menu);
            res.send(menu);
        }

        retrieveMenus();

    },

    createDish: (req, res) => {
        const newDish = {
            menuId: req.body.menuId,
            dishName: req.body.dishName,
            dishPrice: req.body.dishPrice,
            dishDescription: req.body.dishDescription,
            dishImage: req.body.dishImage
        }

        if(!newDish.dishName || !newDish.dishPrice) {
            return res.status(400).send({ msg: 'Please fill the field!' });
        }

        // read database to check existing users using email
        async function generateDish() {
            const Menu = Parse.Object.extend("Menu");
            const query = new Parse.Query(Menu);
            query.equalTo("dishName", newDish.dishName);

            const menu = await query.find();  
            
            // if the menu does not exist in database, create newMenu
            if(menu.length == 0) {
                const Menu = Parse.Object.extend("Menu");
                const menu = new Menu();
                
                menu.set("menuId", newDish.menuId)
                menu.set("dishName", newDish.dishName);
                menu.set("dishPrice", newDish.dishPrice);
                menu.set("dishDescription", newDish.dishDescription);
                menu.set("dishImage", newDish.dishImage);
    
                try {
                    let result = menu.save()
                    console.log("Trying to save string");
                    // console.log(result)
                }
                catch(error) {
                    console.log('Failed to create new object, with error code: ' + error.message);
                }         
                
                // res.send(newDish);
                res.send({ msg: "Dish created successfully!" });

            }
            else {
                // POST request in postman
                res.send({ msg: "Dish already exist!" });
            }
        }

        generateDish()

    },

    getDishes: (req, res) => {

        // read database to get user's information
        async function retrieveDishes() {
            const Menu = Parse.Object.extend("Menu");
            const query = new Parse.Query(Menu);
            query.equalTo("menuId", req.params.menuId);

            const menu = await query.find();  
            console.log(menu);
            res.send(menu);
        }

        retrieveDishes();

    }
}