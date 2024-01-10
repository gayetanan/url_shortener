
const jsonResponse = (response,status,data)=>{
    response.statusCode = status;
    response.end(JSON.stringify(data))
}
export default jsonResponse;