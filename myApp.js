const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

let Person;

const personShema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age:  Number,
  favoriteFoods: [String]
});

Person = mongoose.model('Person', personShema);

const createAndSavePerson = (done) => {
  const person = new Person({name:'Prince Sly', age:31,favoriteFoods: ['rice', 'beans']});
  person.save((err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, people) => {
    if (err) return console.log(err);
    done(null, people);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, (err, person) => {
    done(null, person);
  })
};

const findOneByFood = (food, done) => {

  Person.findOne({favoriteFoods: food}, (err, data) => {

    done(null, data);
  })
};

const findPersonById = (personId, done) => {
  Person.findById({ _id: personId }, (err, person) => {
    done(null, person);
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById(personId, (err, person) => {
    if(err) return console.log(err); 
    person.favoriteFoods.push(foodToAdd);

    person.save((err, updatedPerson) => {
      if(err) return console.log(err);
      done(null, updatedPerson)
    })
  })

};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, { new: true }, (err, data) => {
    if (err){
      console.log(err)
      return done(err, null)
    }
    return done(null, data);
  });
};

const removeById = (personId, done) => {
  Person.findOneAndRemove({_id: personId}, (err, data) => {
    if(err) return console.log(err);
    done(null, data);
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove({name: nameToRemove}, (err, data) => {
    if(err) return console.log(err);
    done(null, data);
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  const person = Person.find({favoriteFoods: foodToSearch });
  
  person.sort({ name: 1 }).limit(2).select('-age').exec((err, persons) => {
    if(err) return console.log(err);
    done(null, persons);
  });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
