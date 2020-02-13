// implement your API here
const express = require('express');
const db = require("./data/db");
const server = express();
const PORT = 8080;

server.get('/api/users', (req,res) => {
   db.find()
           .then( response => {
              if(response) {
                 res.status(200).json(response)
              } else {
                 res.status(500).json({ errorMessage: "The users information could not be retrieved." })
              }
           })
           .catch(err => {
              console.log(err);
           })
});
server.get('/api/users/:id', (req,res) => {
   const id = req.params.id;

   
});
server.post('/api/users', (req,res) => {
   
   
});
server.put('/api/users/:id', (req,res) => {
   const id = req.params.id;
   
});
server.delete('/api/users', (req,res) => {
   
});


server.listen(PORT, () => {
   console.log(`Server is running at https://localhost${PORT}`);
})
