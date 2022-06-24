import { ObjectID } from 'bson';
import fs, { appendFile } from 'fs'
import { ObjectId } from 'mongodb';
import user from './models/user.js';

// common utility
export async function getData(){
  try{
    return await user.find()
  } catch(e) {
    return [];
  }
}
function saveData(){

}

export async function getSpecificUser(id){
  try{
    return await user.findById(id)
  } catch(e){
    return e
  }
}
//add
export async function createUser({username,id}){
  const data = await getData()
  const duplicate = await getSpecificUser(id)
  if(duplicate > -1){
    return { status: "400" ,msg: "user already exists" }
  } else {
    const newUser = {
      id,
      username,
      cash: 0,
      credit: 0,
    }
    return { status: "400" ,msg: newUser }
  }
}
//edit

const updateUser = async (id, prop, value) => {
  const data = await getSpecificUser(id)
  switch (prop) {
    case "username":
      await user.findByIdAndUpdate(id,{name: value })
      break;
    case "cash":
       const newCash = data.cash + value;
       await user.findByIdAndUpdate(id,{cash: parseInt(newCash) })
      break;
      case "credit":
       const newCredit = data.credit + value;
       await user.findByIdAndUpdate(id,{credit: parseInt(newCredit) })
      break;
  }
  return await getSpecificUser(id)
};
      
export async function depositAction (action,amount,id){
  const index = await getSpecificUser(id)
  if(!index){
    return {
      status: 400,
      msg: "user does not exist"
    }
  } else {
    const res = await updateUser(id,"cash",amount);
    console.log(res);
    return await updateUser(id,"cash",amount)
  }
}

export async function withdrawAction (action,amount,id){
  const index = await getSpecificUser(id)
  if(index === -1){
    return {
      status: 400,
      msg: "user does not exist"
    }
  } else {
    const data = await getData();
    if(!(amount >= data[index].cash + data[index].credit)){
      if(amount <= data[index].cash){
        return updateUser(index,"cash",(-amount))
      } 
      if(amount >= data[index].cash && (amount - data[index].cash) <= data[index].credit){
        updateUser(index,"cash",(-amount + (amount - data[index].cash)))
        return updateUser(index,"credit",(-amount + data[index].cash))
      }
    } else {
      return {
        status: 400,
        msg: "you exceeded user's cash and credit"
      }
    }
  }
}
export async function creditAction(action,amount,id){
  const index = await getSpecificUser(id)
  if(index === -1){
    return {
      status: 400,
      msg: "user does not exist"
    }
  } else {
    return updateUser(index,"credit",amount)
  }
}
export async function transferAction(action,amount,[payer,receiver]){
  const data = await getData()
  const payerIndex = await getSpecificUser(payer)
  const receiverIndex = await getSpecificUser(receiver)
  if(payerIndex === -1 || receiverIndex === -1){
    return {
      status: 400,
      msg: "one of the users does not exist"
    }
  } else if(data[payerIndex].cash > amount) {
    return {
      status: 200,
      msg:     {
        payer: updateUser(payerIndex,"cash",-amount),
        receiver: updateUser(receiverIndex,"cash",amount) 
      }
    }

  } else {
    return {
      status: 400,
      msg: "payer does not have enough liquidity"
    }
  }
}



