const dateFormater = (time,space)=>{
    const date = new Date(time);
    const day = date.getDate() < 10 ? `0${date.getDate()}`: date.getDate();
    const month = date.getMonth()+1 < 10 ? `0${date.getMonth()+1}`:date.getMonth()+1;
    const year = date.getFullYear();
    const hours = date.getHours() < 10 ? `0${date.getHours()}`:date.getHours();
    const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
    // const seconds = date.getSeconds()
    // const milliseconds = date.getMilliseconds()
    if(space){
        return `${year}-${month}-${day} ${hours}:${minutes}`
    }
    return `${year}-${month}-${day}T${hours}:${minutes}`
}

const displayMessageToUI =(type,msg,parent,callBack)=>{
    const span = document.createElement("span");
    span.setAttribute("class","alert");
    span.setAttribute("data-alert",type);
    span.innerText = msg;
    parent.appendChild(span)
    //
    callBack()
    span.addEventListener("animationend",()=>{
        span.remove();
        callBack()
    })

}
export {dateFormater,displayMessageToUI};