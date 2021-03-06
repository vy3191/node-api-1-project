// implement your API here
const express = require('express');
const db = require("./data/db");
const server = express();
const PORT = 8080;

server.use(express.json());

server.get('/api/users', (req,res) => {
   db.find()
           .then( users => {
              if(users) {
                 res.status(200).json(users)
              } else {
                 res.status(404).json({msg:'Could not find the users'});
            }
         })
         .catch(err => {
            console.log(err);
            res.status(500).json({ errorMessage: "The users information could not be retrieved." });
           })
});
server.get('/api/users/:id', (req,res) => {
   const id = req.params.id;
   if(!id) res.status(400).json({msg:'User id is required'});
   db.findById(id)
   .then( user => {
      if(user) {
         res.status(200).json(user);
      } else {         
         res.status(404).json({ message: "The user with the specified ID does not exist." });
        }
     })
     .catch(err => {
        res.status(500).json({ errorMessage: "The user information could not be retrieved."});
      })
      
      
   });

   server.post('/api/users', (req,res) => {
       console.log(req.body)
      if(!req.body.name) res.status(400).json({ errorMessage: "Please provide name for the user." });
      if(!req.body.bio) res.status(400).json({ errorMessage: "Please provide Bio for the user." });
     
      db.insert({ name:req.body.name, bio:req.body.bio})
         .then( newUserResponse => {
            if(newUserResponse) {
               res.status(201).json(newUserResponse);
            }
         })
         .catch(err => {
            res.status(500).json({ errorMessage: "The user information could not be retrieved."});

         })
   
});
server.put('/api/users/:id', async (req,res) => {
     try {
      const id = req.params.id;
      const name = req.body.name;
      const bio = req.body.bio;
      if(!req.body.name) res.status(400).json({ errorMessage: "Please provide name for the user." });
      if(!req.body.bio) res.status(400).json({ errorMessage: "Please provide Bio for the user." });
      if(!req.params.id) res.status(400).json({ errorMessage: "Please provide ID for the user." });     
      const user = await db.findById(id);
      if(user) {
        const updatedUser =  await db.update(id,{name,bio});
         res.status(200).json(updatedUser)
      }else {
         res.status(404).json({ message: "The user with the specified ID does not exist." });
      }      
     }catch(err) {
        res.status(500).json({ errorMessage: "The user information could not be modified." });
      }
      
      
   });
   server.delete('/api/users/:id', async (req,res) => {
      try {
         const id = req.params.id;
         const user = await db.findById(id);
         console.log(user)
         if(!user.name && !user.bio) res.status(404).json({ message: "The user with the specified ID does not exist." });
         res.status(204).json(await db.remove(id));         
      }catch(err){         
         res.status(500).json({ errorMessage: "The user information could not be modified." });
     }
   
});


server.listen(PORT, () => {
   console.log(`Server is running at https://localhost${PORT}`);
})
