import { isValidURL } from "../utils/urlpattern.js";
import dateFormater from "../utils/date.js";
import RandomID from "../utils/createId.js";
import getExpirationInfo from "../utils/expirationInfo.js";


const validateCreation = (site,expiration)=>{
     //isValidURL => util function that check if the url is valid or not;
    const {url,valid} = isValidURL(site);
    // Case site is not provided or invalid
    let isValidData = false;
    const MIN_EXPIRATION_TIME = 600_000;
    // Not site or site url is not a valid one
    if(!site || !valid){
        return {isValidData,msg:"Invalid Url"}
    }
    // Case expiration date but not a valid date
    else if(expiration && !(new Date(expiration).getTime())){
        return{isValidData,msg:"Invalid date"};
    }
    // Case Expiration date but less 10 minutes
    else if(expiration && getExpirationInfo(expiration).expirationTime < MIN_EXPIRATION_TIME){
        return{isValidData,msg:"At least 10 minutes required."};
    }

    else{
        return{isValidData:true,url,msg:"Updated successfully."}
    }
}


const prepareData = async(url,expiration)=>{
    const expirationInfo = getExpirationInfo(expiration);
    let createdAt
    let expiredAt;

    if(expirationInfo.exp){
        createdAt = dateFormater(expirationInfo.currentdate);
        expiredAt = dateFormater(expirationInfo.expirationDate)
    }
    createdAt = dateFormater(expirationInfo.currentdate);
    const id = await RandomID(7);
    return{
        id,
        site:url,
        createdAt,
        expiredAt
    }
}

export {prepareData,validateCreation}