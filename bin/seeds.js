const mongoose = require('mongoose');
const faker = require("faker");
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const User = require("../models/user");
const Message = require("../models/message");




mongoose.connect("mongodb://localhost:27017/friendstreet");
function fakeCords() {

  return{
    type: "Point",
    coordinates:  [(2.154007  - ((Math.random()* 100)/100)), (41.390205- ((Math.random()* 100)/100))],
  };
}

function fakeMessage(max){
  let fake = [];
  for (let i = 0; i < max; i++){
    fake.push({
      text: faker.lorem.sentence(),
      score: Math.floor(Math.random()*4)+1,
      tags: [],
      loc: fakeCords(),
      radius: 2000,
      size: "1"
    });
  }
  return fake;

}


function createUserType(number, userType,  password = "test" ){
  let users = [];

  for(let i = 0; i < number; i++){
    name = faker.name.findName();
    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);
    const address = faker.helpers.createCard().address;
    users.push({
      firstName: name.split(" ")[0],
      lastName: name.split(" ")[1],
      email: faker.internet.email(name),
      avatar: faker.internet.avatar(),
      password: hashPass,
      coordinates: [Number(address.geo.lat), Number(address.geo.lng)],

      role: userType,
      itemsUser: [],
    });
  }
  return users;
}


const messages = fakeMessage(100);

const usersData = createUserType(100, "User");

Message.create(messages, (err, docs)=>{
  if(err) throw err;
  console.log(docs);
});

User.create(usersData, (err, docs)=> {
  if(err) throw err;
  mongoose.connection.close();
});
