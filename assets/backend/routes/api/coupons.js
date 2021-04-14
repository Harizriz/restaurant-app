const Parse = require('parse/node');

module.exports = {
    createCoupon : (req, res) => {
        const newCoupon = {
            couponName: req.body.couponName,
            percentage: req.body.percentage
        }

        if(!newCoupon.couponName || !newCoupon.percentage) {
            return res.status(400).send({ msg: 'Please fill the field!' });
        }

        // read database to check existing users using email
        async function createCoupon() {
            const Coupon = Parse.Object.extend("Coupon");
            const query = new Parse.Query(Coupon);
            query.equalTo("couponName", newCoupon.couponName);

            const coupon = await query.find();  
            
            // if the person's email does not exist in database, create newCoupon
            if(coupon.length == 0) {
                const Coupon = Parse.Object.extend("Coupon");
                const coupon = new Coupon();
    
                coupon.set("couponName", newCoupon.couponName);
                coupon.set("percentage", newCoupon.percentage);
    
                try {
                    let result = coupon.save()
                    console.log("Trying to save string");
                    // console.log(result)
                }
                catch(error) {
                    console.log('Failed to create new object, with error code: ' + error.message);
                }         
                
                res.send(newCoupon);
                res.send({ msg: "coupon created successfully!" });

            }
            else {
                // POST request in postman
                res.send({ msg: "coupon already exist!" });
            }

        }

        createCoupon();
    },

    getCoupons: (req, res) => {

         // read database to get user's information
         async function retrieveCoupon() {
            const Coupon = Parse.Object.extend("Coupon");
            const query = new Parse.Query(Coupon);
            query.exists("couponName")

            const coupon = await query.find();  
            res.send(coupon);
        }

        retrieveCoupon();

    },

    deleteCoupon: (req, res) => {
        const deleteCoupon = {
            couponName: req.body.couponName,
        }

        // delete a specific table in database
        async function removeCoupon() {
            
            const Coupon = Parse.Object.extend("Coupon");
            const query = new Parse.Query(Coupon)
            query.equalTo("couponName", deleteCoupon.couponName)

            const chosenCoupon = await query.find();  
            console.log(chosenCoupon[0])
            chosenCoupon[0].destroy().then((coupon) => {
                // the object was deleted successfully
                console.log(coupon + " is destroyed")
                res.send({ msg: "coupon is destroyed" })
            }, (error) => {
                // delete operation failed
                console.log(error)
                res.send({ msg: "error" })
            });

        }
        
        removeCoupon();

    },
}