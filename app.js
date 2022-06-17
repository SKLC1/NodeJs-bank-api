
import express from 'express'
import { getData, getSpecificUser } from './actions.js';


const app = express();
app.use(express.json());

const PORT = 3000;
app.listen(PORT, ()=>{
  console.log('server running on port'+ PORT);
})

app.get('/users',(req,res)=>{
  res.send(getData());
})

app.get('/users/:id',(req,res)=>{
  const specificUser = getSpecificUser(req.params.id)
  res.send(specificUser);
})
