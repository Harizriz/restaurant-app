// const Parse = require('parse/node');

// Parse.initialize('mYDYPTzeNxlL6ADEEHqXDWHvQ9wgkLYz1TXde1Rn', 'tSaYr2DyEfCrVA2SPsldpGIFAyayQC2iLAlcem27');
// Parse.serverURL = "https://parseapi.back4app.com/";

// function signUp() {
//     console.log("Here!");
//     // Create a new instance of the user class
//     var user = new Parse.User();
//     user.set("username", "Hariz");
//     user.set("password", "testing");
//     user.set("email", "hariz1807@gmail.com");
  
//     // other fields can be set just like with Parse.Object
//     user.set("phone", "415-392-0202");

//     user.save();
  
//     user.signUp().then(function(user) {
//         console.log('User created successful with name: ' + user.get("username") + ' and email: ' + user.get("email"));
//     }).catch(function(error){
//         console.log("Error: " + error.code + " " + error.message);
//     });
// }

// module.exports = signUp;