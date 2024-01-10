
// for comparing url
const urlPattern=(pattern,url)=>{
    const reg = new RegExp(`^/(${pattern})/?$`,"i");
    return reg.test(url);
}

//@DESC testing url format
const isValidURL = (url)=>{
    // test if the url is format like this.
    // case for http: or https:, http:/ or http:// all are optional.
    // case for www. or any subdomain optional
    // for domaine name at least 2 and max 256 characters
    // follow by dot toplevel domaine at least 2 and max 3 characters
    // case for query or parameter 
    const basedURL = /(http(s)?\:|http(s)?\:(\/|\/\/))?(www\.)?(\w+\.)?[a-z-0-9]{2,256}\.[a-z]{2,3}\b([-a-zA-Z0-9%_\+.~#?&//=]*)/ig;
    // started by protocal [http]
    const protoReg = /^(http(s)?\:|http(s)?\:(\/|\/\/))/
    if(!basedURL.test(url)){
        return{valid:false}
    }else{
        // if not https will be used;
        let properURL = protoReg.test(url) ? url : `https://${url}`;
        return {valid:true,url:properURL}
    }
}

export {urlPattern,isValidURL}
  