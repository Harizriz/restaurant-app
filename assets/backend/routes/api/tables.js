const Parse = require('parse/node');

module.exports = {
    createTable : (req, res) => {
        const newTable = {
            qrCodeValue: req.body.qrCodeValue,
            paxValue: req.body.paxValue
        }

        if(!newTable.qrCodeValue || !newTable.paxValue) {
            return res.status(400).send({ msg: 'Please fill the field!' });
        }

        // read database to check existing users using email
        async function retrieveTable() {
            const Table = Parse.Object.extend("Table");
            const query = new Parse.Query(Table);
            query.equalTo("qrCodeValue", newTable.qrCodeValue);
            query.equalTo("paxValue", newTable.paxValue);

            const table = await query.find();  
            
            // if the person's email does not exist in database, create newUser
            if(table.length == 0) {
                const Table = Parse.Object.extend("Table");
                const table = new Table();
    
                table.set("qrCodeValue", newTable.qrCodeValue);
                table.set("paxValue", newTable.paxValue);
    
                try {
                    let result = table.save()
                    console.log("Trying to save string");
                    // console.log(result)
                }
                catch(error) {
                    console.log('Failed to create new object, with error code: ' + error.message);
                }         
                
                res.send(newTable);
                res.send({ msg: "Table created successfully!" });

            }
            else {
                // POST request in postman
                res.send({ msg: "Table already exist!" });
            }


        }

        retrieveTable();
    },

    getTableInfo: (req, res) => {

         // read database to get user's information
         async function retrieveTableInfo() {
            const Table = Parse.Object.extend("Table");
            const query = new Parse.Query(Table);
            query.exists("qrCodeValue")

            const table = await query.find();  
            // console.log(table);
            res.send(table);
        }

        retrieveTableInfo();

    }
}