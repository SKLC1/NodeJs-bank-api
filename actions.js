import fs from 'fs'

export function getData(){
  const dataBuffer = fs.readFileSync("data.json");
    const dataJson = dataBuffer.toString();
    return JSON.parse(dataJson);
}
export function getSpecificUser(){
  return 'works fine'
}