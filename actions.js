import fs from 'fs'

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
  const data = getData()
  return data.findIndex((user=>(user.id === id)))
}


