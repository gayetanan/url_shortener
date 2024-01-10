import { getUlrByid } from "../db/dbmodel.js";
const chars = 'abcdefghijkamnopqrstuvwxyzABCDEFGHIJKAMNOPQRSTUVWXYZ';

const RandomID = async(amount)=>{
  let str = ""
  for(let i = 0; i < amount; i++){
    str += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  //Check for Id existence;
  const alreadyRegisterId = (await getUlrByid(str));
  if(alreadyRegisterId){
    RandomID(amount)
  }else{
    return str
  }
};

export default RandomID;