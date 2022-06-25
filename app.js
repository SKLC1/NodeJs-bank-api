
import express from 'express'
import cors from 'cors'
import { getData, getSpecificUser, createUser, depositAction, withdrawAction, creditAction, transferAction } from './actions.js';
import mongoose from 'mongoose'
import 'dotenv/config'
import user from './models/user.js';
import bcrypt from 'bcrypt'

const app = express();
app.use(express.json());
app.use(cors());
mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser: true})
const db = mongoose.connection
const collection = db.collection('bank');
db.on('error',(error)=>console.log(error))

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
  console.log('server running on port'+ PORT);
})

app.get('/users',async(req,res)=>{
  try{
    const users = await getData()
    res.json(users)
  }catch(err){
    res.status(400).json({message: err.message})
  }
})

app.get('/users/:id',async (req,res)=>{
  try{
    const users = await getSpecificUser(req.params.id)
    res.json(users)
  }catch(err){
    res.status(400).json({message: err.message})
  }
})

app.post('/users',async(req,res)=>{
  const newUser = new user({
    name:req.body.name,
    password: req.body.password,
  })
  try {
    await newUser.save()
    res.status(200).send(user);
  } catch (err) {
    res.status(400).json({message: err.message})
  }
})

app.patch('/users/:id',async(req,res)=>{
  let userToUpdate = await user.findById(req.params.id)
  
  const id = req.params.id
  const action = req.body.action 
  const amount = parseInt(req.body.amount) 
  const payer = req.body.payer
  const receiver = req.body.receiver
  let updated;

  const actions = [depositAction,withdrawAction,creditAction,transferAction]
  
  actions.forEach( async (func) => {
    if(func.name === `${action}Action`){
      updated = await func(action,amount,(func.name === 'transferAction'?[payer,receiver]:id))
      try {
        res.status(200).json(updated); 
      } catch (err) {
        res.status(400).json({message: err.message})
      }
    }
  })
})

app.delete('/users/:id',async (req,res)=>{
  try{
   await user.findByIdAndRemove(req.params.id, (error, deletedRecord)=>{
    if(!error){
      console.log(deletedRecord);
    }
   })
   res.status(200).json(user)
  }catch(err){
    res.status(400).json({message: err.message})
  }
})
app.post('/login',async (req,res)=>{
  const username = req.body.name;
  const userLoggingIn = await user.find({name: username})
  console.log(userLoggingIn);
  try{
  if(userLoggingIn === null){
    res.status(400).json('cant find user')
   } else {
      console.log(req.body.password);
      console.log(userLoggingIn[0].password);
     if(await bcrypt.compare(req.body.password, userLoggingIn[0].password)){
       res.status(200).json(`logged in to ${userLoggingIn[0].name}`)
      } else {
        res.send('not allowed')
      }
   } 
  }catch(err){
    res.status(400).json({message: err.message})
  }
})