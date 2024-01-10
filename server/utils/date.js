// formating data YYYY-MM-DD hh:mm
//PadStart add leading zero to any number less than 10. 9hrs => 09hrs
const dateFormater = (time)=>{
    const date = new Date(time);
    const day = date.getDate().toString().padStart(2,"0");
    const month = (date.getMonth()+1).toString().padStart(2,"0")
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2,"0")
    const minutes = date.getMinutes().toString().padStart(2,"0")
    // const seconds = date.getSeconds()
    // const milliseconds = date.getMilliseconds()
    return `${year}-${month}-${day} ${hours}:${minutes}`
}
export default dateFormater;