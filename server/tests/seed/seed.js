const {ObjectID} = require('mongodb');
const jwt = require("jsonwebtoken");

const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');

const userOneID = new ObjectID();
const userTwoID = new ObjectID();

const initialUsers = [{
  _id: userOneID,
  email: 'josh@josh.com',
  password: 'userOnePass',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: userOneID, access: 'auth'}, 'abc123').toString()
  }]
}, {
  _id: userTwoID,
  email: 'josh@example.com',
  password: 'userTwoPass',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: userTwoID, access: 'auth'}, 'abc123').toString()
  }]
}];

const initialTodos = [
  {
    _id: new ObjectID(),
    text: 'First test todo',
    _creator: userOneID
  },
  {
    _id: new ObjectID(),
    text: 'Second test todo',
    completed: true,
    completedAt: 3333,
    _creator: userTwoID
  },
];

const populateUsers = (done) => {
  User.remove({}).then(() => {
    var userOne = new User(initialUsers[0]).save();
    var userTwo = new User(initialUsers[1]).save();
    
    return Promise.all([userOne, userTwo]);
  }).then(() => done());
};

const populateTodos = (done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(initialTodos);
  }).then(() => done());
};

module.exports = { 
  initialUsers,
  initialTodos,
  populateUsers,
  populateTodos
};