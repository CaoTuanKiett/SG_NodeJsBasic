const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const port = 3000
app.use(bodyParser.json({limit: '50mb', extended: true}));


app.get('/', (req, res) => {
  res.send('Hello World! hehehehe')
})

let users = [
	{id: 1, name: "User1", age: 31}, 
	{id: 2, name: "User2", age: 20},
	{id: 3, name: "User1", age: 25}
];

app.get('/get/users', (req, res) => {
  res.json(users);
})

app.post('/post/users', (req, res) => {
  let user = req.body;
  users.push(user);
  res.json(user);
})


app.put('/put/users/:id', (req, res) => {
  let id = req.params.id;
  // let user = users.find(function(user){
  // 	return user.id == id;
  // });
  
  // user.name = req.body.name;
  // user.age = req.body.age;
  users = users.map(user => user.id == id ? {id : user.id , ...req.body} : user)
  
  res.json({id : id , ...req.body});

})


app.get('/users/:id', (req, res) => {
  let id = req.params.id;
  let user = users.find(function(user){
  	return user.id == id;
  });
  res.json(user);

});

app.delete('/users/:id', (req, res) => {
  let id = req.params.id;
  let user = users.find(function(user){
  	return user.id == id;
  });
  users.splice(users.indexOf(user), 1);
  res.json(user);
});





app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})