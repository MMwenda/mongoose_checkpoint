require('dotenv').config(); //dotenv is used to retrieve environment variables {in a .env file} and store them in process.env
const mongoose = require('mongoose');
//console.log(process.env.MONGO_URI); //debugging


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI);
// {
// //   useNewUrlParser: true, //useNewUrlParser is no longer necessary
// //   useUnifiedTopology: true, //useUnifiedTopology is no longer necessary
// });

// Define Person Schema
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String],
});

const Person = mongoose.model('Person', personSchema);
//move it to the people collection {Mongoose pluralizes the model name to create a collection name}

// Create and Save a Record of a Model
const createAndSavePerson = () => {
  const person = new Person({
    name: 'Cory Kenshin',
    age: 30,
    favoriteFoods: ['Burger', 'Chicken'],
  });

  person.save()
    .then((data) => console.log('Person saved:', data))
    .catch((err) => console.error(err));
};
//createAndSavePerson(); //call the function

// Create Many Records
const createManyPeople = (arrayOfPeople) => {
  Person.create(arrayOfPeople) //create method is used to create many records at a time
    .then((people) => console.log('People added:', people))
    .catch((err) => console.error(err));
};

const arrayOfPeople = [ 
{name: "John", age: 25, favoriteFoods: ["Chicken", "Burritos"]},
{name: "Mary", age: 30, favoriteFoods: ["Pizza", "Burritos"]},
{name: "Mary", age: 32, favoriteFoods: ["Steak", "Burger"]},
{name: "Tom", age: 35, favoriteFoods:  ["Salmon", "Shrimp"]},
{name: "Jerry", age: 40, favoriteFoods: ["Cheese", "Burger"]},
{name: "Mickey", age: 45, favoriteFoods: ["Shawarma", "Burritos"]}];

//createManyPeople(arrayOfPeople); //pass the array of people to the function

// Find by Name
const findPeopleByName = (name) => {
  Person.find({ name }) //find method is used to find records that match the name
    .then((people) => console.log('People found:', people))
    .catch((err) => console.error(err));
};
//findPeopleByName('John'); //pass the name to the function

// Find One by Favorite Food
const findOneByFood = (food) => {
  Person.findOne({ favoriteFoods: food })
    .then((person) => console.log('Person found:', person))
    .catch((err) => console.error(err));
};
//findOneByFood('Pizza'); //pass the favorite food to the function

// Find by ID
const findPersonById = (personId) => {
  Person.findById(personId)
    .then((person) => console.log('Person found by ID:', person))
    .catch((err) => console.error(err));
};
// findPersonById('67addffadf63d27a7453ed86'); //pass the ID to the function

// Update by Find, Edit, Save
const findEditThenSave = (personId) => {
  Person.findById(personId)
    .then((person) => {
      if (!person) 
        return console.log('Person not found');

      person.favoriteFoods.push('Burritos'); //add burritos to the favoriteFoods array
      return person.save();
    })
    .then((updatedPerson) => console.log('Updated person:', updatedPerson))
    .catch((err) => console.error(err));
};
//findEditThenSave('67addffadf63d27a7453ed86'); //pass the ID to the function

// Update with findOneAndUpdate
const findAndUpdate = (personName) => {
  Person.findOneAndUpdate({ name: personName }, { age: 20 }, { new: true })
    .then((updatedPerson) => console.log('Updated person:', updatedPerson))
    .catch((err) => console.error(err));
};
//findAndUpdate('John'); //pass the name to the function

// Delete by ID
const removeById = (personId) => {
  Person.findByIdAndDelete(personId)
    .then((removedPerson) => console.log('Removed person:', removedPerson))
    .catch((err) => console.error(err));
};
 //removeById('67addf80a3ca6aad707dfce1'); //pass the ID to the function


// Delete Many
const removeManyPeople = (name) => {
  Person.deleteMany({ name })
    .then((result) => console.log('Deleted people:', result))
    .catch((err) => console.error(err));
};
//removeManyPeople("Mary"); //call the function

// Chain Query Helpers
const queryChain = () => {
  Person.find({ favoriteFoods: 'Burritos' }) //find people with favorite food as Burritos
    .sort({ name: 1 }) //sort them by name in ascending order
    .limit(5) //limit the results to 5
    .select('-age') //exclude the age field
    .exec() //execute the query
    .then((people) => console.log('Filtered people:', people))
    .catch((err) => console.error(err));
};
queryChain(); //call the function
