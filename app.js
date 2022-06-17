
import express from 'express'

app.use(express.json());
const app = express();

const PORT = 3000;
app.listen(PORT, ()=>{
  console.log('server running on port'+ PORT);
})

app.get('/users',(req,res)=>{
  res.send(bank.getData());
})

app.get('/users/:id',(req,res)=>{
  res.send(bank.getSpecificUser(req.params.id).msg);
})
