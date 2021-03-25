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

            const table = await query.find();  
            
            // if the person's email does not exist in database, create newTable
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

    },

    deleteTable: (req, res) => {
        const deleteTable = {
            tableId: req.body.tableId,
        }

        // delete a specific table in database
        async function removeTable() {
            
            const Table = Parse.Object.extend("Table");
            const query = new Parse.Query(Table)
            query.equalTo("qrCodeValue", deleteTable.tableId)

            const chosenTable = await query.find();  
            console.log(chosenTable[0])
            chosenTable[0].destroy().then((table) => {
                // the object was deleted successfully
                console.log(table + " is destroyed")
                res.send({ msg: "table is destroyed" })
            }, (error) => {
                // delete operation failed
                console.log(error)
                res.send({ msg: "error" })
            });

        }
        
        removeTable();

    },

    updateTable: (req, res) => {
        const newData = {
            tableId: req.body.tableId,
            newPaxValue: req.body.newPaxValue
        }

        async function updateTable() {
            const Table = Parse.Object.extend("Table");
            const query = new Parse.Query(Table)
            query.equalTo("qrCodeValue", newData.tableId)

            const chosenTable = await query.find();  
            console.log(chosenTable[0])

            chosenTable[0].save().then(() => {
                // Now let's update it with some new data. In this case, only cheatMode and score
                // will get sent to the cloud. playerName hasn't changed.
                chosenTable[0].set("paxValue", newData.newPaxValue);
                console.log(chosenTable[0].save());
                res.send({ msg: "Table updated!" })
                return chosenTable[0].save();
            });
        }

        updateTable();
    
    }
}