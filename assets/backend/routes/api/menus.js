const Parse = require('parse/node');

module.exports = {
    createMenu : (req, res) => {
        const newMenu = {
            menuName: req.body.menuName
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
    
                try {
                    let result = menu.save()
                    console.log("Trying to save string");
                    // console.log(result)
                }
                catch(error) {
                    console.log('Failed to create new object, with error code: ' + error.message);
                }         
                
                res.send(newMenu);
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

    }
}