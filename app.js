
import express from 'express'
import cors from 'cors'
import { getData, getSpecificUser, createUser, depositAction, withdrawAction, creditAction, transferAction } from './actions.js';
import { v4 as uuidv4 } from 'uuid';

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;
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
  const payer = req.body.payer
  const receiver = req.body.receiver
  let updated;
  const actions = [depositAction,withdrawAction,creditAction,transferAction]
  actions.forEach(func => {
    if(func.name === `${action}Action`){
      updated = func(action,amount,(func.name === 'transferAction'?[payer,receiver]:id))
      res.status(updated.status).send(updated.msg); 
    }
  })
})

