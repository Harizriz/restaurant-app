// KPZXJFNE API Public Key
// b0d79eaf-eea8-4eeb-bb3e-886df0030fdc API Private Key 
// this is for mongodb

// create an object
const Parse = require('parse/node')

Parse.initialize('mYDYPTzeNxlL6ADEEHqXDWHvQ9wgkLYz1TXde1Rn', 'tSaYr2DyEfCrVA2SPsldpGIFAyayQC2iLAlcem27')
Parse.serverURL = 'https://parseapi.back4app.com'

let Person = Parse.Object.extend('Person')
let person = new Person()

person.set('name', 'Hariz')
person.set('age', 22)

person.save()

// retrieve an object
/* async function run() {
    let Person = Parse.Object.extend('Person')
    let query = new Parse.Query(Person)
    let person = await query.get('_id')

    person.fetch()
}

run() */

// remove an object
/* person.remove('name', 'Hariz') */

// add an object using array method
/* 
person.add('skills', 'computing')
person.addUnique('skills', 'running')
// the addUnique function only add one of the object if they are duplicates
// the add function is the vice versa of the addUnique function
 */

// unset an object
/* person.unset('age') */

// destroy an object (use this with caution)
// this will destroy the whole row _id
/* person.destroy() */

// find an object if there are duplicates in the data
/*
query.equalTo('name', 'Hariz') 
query.greaterThanOrEqualTo('something', 1000)
query.notEqualTo('name', 'Hariz')

let result = await query.find()

for(i=0; i < result.length; i++){
    let thisObject = result[i]
}
*/