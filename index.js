// implement your API here
const express = require('express');
const database = require("./data/db");
const server = express();
const PORT = 8080;

server.get('/api/users', (req,res) => {
   
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
