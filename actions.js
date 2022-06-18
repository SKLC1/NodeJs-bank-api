import fs, { appendFile } from 'fs'

// common utility
export function getData(){
  try{
    const dataBuffer = fs.readFileSync("data.json");
    const dataJson = dataBuffer.toString();
    return JSON.parse(dataJson);
  } catch(e) {
    return [];
  }
}

const saveData = (data) => {
  const dataJson = JSON.stringify(data);
  fs.writeFileSync("data.json", dataJson);
};

export function getSpecificUser(id){
  try{
    const data = getData()
    return data.findIndex((user=>(user.id == id)))
  } catch(e){
    return 'err'
  }
}
//add
export function createUser({username,id}){
  const data = getData()
  const duplicate = getSpecificUser(id)
  if(duplicate > -1){
    return { status: "400" ,msg: "user already exists" }
  } else {
    const newUser = {
      id,
      username,
      cash: 0,
      credit: 0,
    }
    saveData([...data, newUser])
    return { status: "400" ,msg: newUser }
  }
}
//edit

const updateUser = (index, prop, value) => {
  const data = getData();
  switch (prop) {
    case "username":
      data[index] = value;
      break;
    case "cash":
      data[index].cash += value;
      break;
    case "credit":
      data[index].credit += value;
      break;
  }
  saveData(data);
  return {
    status: 200,
    msg: data[index],
  };
};
      
export function depositAction (action,amount,id){
  const index = getSpecificUser(id)
  console.log(index);
  if(index === -1){
    return {
      status: 400,
      msg: "user does not exist"
    }
  } else {
    console.log(updateUser(index,"cash",amount));
    return updateUser(index,"cash",amount)
  }
}
export function withdrawAction (action,amount,id){
  const index = getSpecificUser(id)
  if(index === -1){
    return {
      status: 400,
      msg: "user does not exist"
    }
  } else {
    const data = getData();
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
export function creditAction (action,amount,id){
  const index = getSpecificUser(id)
  if(index === -1){
    return {
      status: 400,
      msg: "user does not exist"
    }
  } else {
    return updateUser(index,"credit",amount)
  }
}
export function transferAction (action,amount,idGive,idReceive){
  
}



