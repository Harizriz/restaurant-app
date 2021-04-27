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
                }
                catch(error) {
                    console.log('Failed to create new object, with error code: ' + error.message);
                }         
                
                res.send({ msg: "Menu created successfully!" });

            }
            else {
                res.send({ msg: "Menu already exist!" });
            }
        }

        generateMenu()
        
    },

    getMenus : (req, res) => {        
        async function retrieveMenus() {
            const Menu = Parse.Object.extend("Menu");
            const query = new Parse.Query(Menu);
            query.exists("menuName")

            const menu = await query.find();  
            res.send(menu);
        }

        retrieveMenus();

    },

    deleteMenu: (req, res) => {
        const menu = {
            menuId: req.body.menuId,
        }

        // delete a specific menu in database
        async function removeMenu() {
            
            const Menu = Parse.Object.extend("Menu");
            const query = new Parse.Query(Menu)
            query.equalTo("objectId", menu.menuId)

            const chosenMenu = await query.find();  
            console.log(chosenMenu[0])
            chosenMenu[0].destroy().then((menu) => {
                console.log(menu + " is destroyed")
                res.send({ msg: "menu is destroyed" })
            }, (error) => {
                console.log(error)
                res.send({ msg: "error" })
            });

        }
        
        removeMenu();
    },

    deleteDishes: (req, res) => {
        const menu = {
            menuId: req.body.menuId,
        }

        // delete a specific dish in database
        async function removeDishes() {
            
            const Menu = Parse.Object.extend("Menu");
            const query = new Parse.Query(Menu)
            query.equalTo("menuId", menu.menuId)

            const chosenDishes = await query.find();  
            for(i = 0; i < chosenDishes.length; i++) {
                console.log(chosenDishes[i])
                chosenDishes[i].destroy().then((dishes) => {
                    console.log(dishes + " is destroyed")
                    res.send({ msg: "dishes is destroyed" })
                }, (error) => {
                    console.log(error)
                    res.send({ msg: "error" })
                });
            }
        }

        removeDishes()

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

        async function generateDish() {
            const Menu = Parse.Object.extend("Menu");
            const query = new Parse.Query(Menu);
            query.equalTo("dishName", newDish.dishName);

            const menu = await query.find();  
            
            // if the menu does not exist in database, create newDish
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
                }
                catch(error) {
                    console.log('Failed to create new object, with error code: ' + error.message);
                }         
                
                res.send({ msg: "Dish created successfully!" });

            }
            else {
                res.send({ msg: "Dish already exist!" });
            }
        }

        generateDish()

    },

    deleteDish: (req, res) => {
        const menu = {
            dishId: req.body.dishId,
        }

        // delete a specific dish in database
        async function removeDish() {
            
            const Menu = Parse.Object.extend("Menu");
            const query = new Parse.Query(Menu)
            query.equalTo("objectId", menu.dishId)

            const chosenDish = await query.find();  
            console.log(chosenDish[0])
            chosenDish[0].destroy().then((dish) => {
                console.log(dish + " is destroyed")
                res.send({ msg: "dish is destroyed" })
            }, (error) => {
                console.log(error)
                res.send({ msg: "error" })
            });
        }

        removeDish()

    },

    updateDish: (req, res) => {
        const newDish = {
            dishId: req.body.dishId,
            newDishName: req.body.newDishName,
            newDishPrice: req.body.newDishPrice,
            newDishDescription: req.body.newDishDescription,
            newImageUri: req.body.newImageUri
        }

        async function updateDish() {
            const Menu = Parse.Object.extend("Menu");
            const query = new Parse.Query(Menu)
            query.equalTo("objectId", newDish.dishId)

            const chosenDish = await query.find();  
            console.log(chosenDish[0])

            chosenDish[0].save().then(() => {
                chosenDish[0].set("dishName", newDish.newDishName);
                chosenDish[0].set("dishPrice", newDish.newDishPrice);
                chosenDish[0].set("dishDescription", newDish.newDishDescription);
                chosenDish[0].set("dishImage", newDish.newImageUri);
                console.log(chosenDish[0].save());
                res.send({ msg: "Dish updated!" })
                return chosenDish[0].save();
            });
        }

        updateDish();
    
    },

    getDishes: (req, res) => {

        // read database to get dishes
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