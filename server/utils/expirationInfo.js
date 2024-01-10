const getExpirationInfo = (expiration)=>{
    //grap the current date without milliSeconds and seconds;
    const currentdate = new Date();
          currentdate.setMilliseconds(0);
          currentdate.setSeconds(0);
    if(!expiration){
        return {exp:false,currentdate};
    }
     // Turn Date string to actual date OBJ
     const expirationDate = new Date(expiration);
     // getting expiration time.
     const expirationTime = expirationDate - currentdate;
     return{exp:true,expirationDate,expirationTime,currentdate}
}
export default getExpirationInfo;