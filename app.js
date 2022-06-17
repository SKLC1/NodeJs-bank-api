
import express from 'express'
import { getData, getSpecificUser, createUser, depositAction, withdrawAction, creditAction, transferAction } from './actions.js';
import { v4 as uuidv4 } from 'uuid';

const app = express();
app.use(express.json());

const PORT = 3000;
app.listen(PORT, ()=>{
  console.log('server running on port'+ PORT);
})

app.get('/users',(req,res)=>{
  res.send(getData());
})

app.get('/users/:id', (req,res)=>{
  res.send(getSpecificUser(req.params.id).toString())
})

app.post('/users',(req,res)=>{
  const user ={
    username: req.body.username,
    id: uuidv4(),
  }
  const addUser = createUser(user) 
  res.status(addUser.status).send(addUser.msg);
})

app.put('/users/:id',(req,res)=>{
  const id = req.params.id
  const action = req.body.action 
  const amount = parseInt(req.body.amount) 
  const actions = [depositAction,withdrawAction,creditAction,transferAction]
  actions.forEach(func => {
    if(func.name === `${action}Action`){
      const updated = func(action,amount,id)
      console.log(updated.msg);
      console.log(updated.status);
      res.status(updated.status).send(updated.msg); 
    }
  })
})



//* save
// switch(req.params.transfer) {
//   case 'deopsit': 
//   res.status(depositAction.status).send(depositAction.msg); 
//   break
//   case 'withdraw': 
//   res.status(withdrawAction.status).send(withdrawAction.msg); 
//   break
//   case 'credit': 
//   res.status(creditAction.status).send(creditAction.msg); 
//   break
//   case 'transfer': 
//   res.status(transferAction.status).send(transferAction.msg); 
//   break
//  }