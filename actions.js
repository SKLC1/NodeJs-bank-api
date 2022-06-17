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
  let response;
  switch (prop) {
    case "username":
      data[index] = value;
      break;

    case "cash":
      const balance = data[index].cash + data[index].credit;
      if (balance + value < 0)
        response = {
          status: 400,
          msg: "not enough credit!",
        };
      else {
        data[index].cash += value;
        response = {
          status: 200,
          msg: data[index],
        };
      }
      break;

    case "credit":
      data[index].credit = value;
      response = {
        status: 200,
        msg: data[index],
      };
      break;
  }
  saveData(data);
  return response;
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
export function withdrawAction (action,amount){}
export function creditAction (action,amount){}
export function transferAction (action,amount){}



