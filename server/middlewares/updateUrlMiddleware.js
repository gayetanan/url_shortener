import dateFormater from "../utils/date.js";
import getExpirationInfo from "../utils/expirationInfo.js";

const validateUpdate = (newExpirationDate,currentExpirationDate)=>{
    const MIN_EXPIRATION_TIME = 600_000;
    let isValidData = false;
    if(newExpirationDate !=="" && !(new Date(newExpirationDate).getTime())){
        return{isValidData:false,msg:"Invalid date"};
    }
    else if(currentExpirationDate && currentExpirationDate >= new Date(newExpirationDate)){
        return{isValidData,msg:"can't be less than the current expiration date."};
    }
    else if(!currentExpirationDate && getExpirationInfo(newExpirationDate).expirationTime < MIN_EXPIRATION_TIME){
        return{isValidData,msg:"At least 10 minutes required."};
    }
    else{
        return{isValidData:true,msg:"updated."}
    }
}

const prepareUpdateData = (id,expiration)=>{
    const expirationInfo = getExpirationInfo(expiration);
    let expirationDate
    if(expirationInfo.exp){
        expirationDate = dateFormater(expiration)
    }
    return{
        id,
        expirationDate
    }
}

export {validateUpdate,prepareUpdateData}