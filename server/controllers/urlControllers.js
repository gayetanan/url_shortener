import { addURlToDb,getUlrByid,deleteURLById,getAllURLDb, updateURL} from "../db/dbmodel.js";
import dateFormater from "../utils/date.js";
import jsonResponse from "../utils/jsonresponse.js";
import viewRes from "../utils/viewResponse.js";
import { validateCreation,prepareData} from "../middlewares/createUrlMiddleWare.js";
import { validateUpdate,prepareUpdateData} from "../middlewares/updateUrlMiddleware.js";


// @DESC Create a new URL
// @ROUTE /create
// @METHOD POST
const createUrlController = (request,response)=>{
    let RawData = "";

    request.on("data", (chunk)=>{
        RawData+=chunk
    });

    request.on("end",async()=>{
        try {
                //grab data from the client
                const {site,expiration}= JSON.parse(RawData);
                // Validating data
                const {isValidData,url,msg} = validateCreation(site,expiration);
                // Checking if providen data is correct
                // If NOT
                if(!isValidData){
                    jsonResponse(response,400,{msg});
                    return;
                }
                // Construct Data
                const URL = await prepareData(url,expiration);
                // INSERT data to DB
                await addURlToDb(URL);
                const tinyURl =  `localhost:5000/${URL.id}`;
                jsonResponse(response,201,{msg,id:URL.id,url:tinyURl})
                return;
             
        } catch (error) {
            if(error.status === 400){
                jsonResponse(response,400,{msg:`${error.msg}`})
            }else{
                jsonResponse(response,500,error);
            }
        }     
    })

    // error
    request.on("error",(e)=>{
        console.log(e.message)
    })

}
// @DESC Get single url
// @ROUTE /URLid
// @METHOD GET
const getSingleUrlController = async(id,response)=>{
    try {
            const url = await getUlrByid(id);
            const currentDate = new Date();

            if(url && !url.expiration_date || url && url.expiration_date && currentDate < url.expiration_date){
                response.writeHead(302,{Location:url.site})
                response.end()
                return
            }else{
                await deleteURLById(id);
                jsonResponse(response,404,{msg:"url does not seem to be existed"})
                return;
            }
    } catch (error) {
            console.log(error.message)
            jsonResponse(response,500,{msg:"error from the server."})
    }
}
// @DESC Get about a single url
// @ROUTE /urls/URLid
// @METHOD GET
const aboutUrlController = async(id,response)=>{
    try {
        const url = await getUlrByid(id);
        const currentDate = new Date();

        if(url && !url.expiration_date || url && url.expiration_date && currentDate < url.expiration_date){
            // Format created date,expiration date YYYY-MM-DD hh:mm
            const createdAt = dateFormater(url.created_date);
            // Return empty string in case expiration date is NULL otherwise format it.
            const expiredAt = url.expiration_date ? dateFormater(url.expiration_date):"";
            // viewResponnse util function.       
            viewRes('url',response,200,{site:url.site,id:url.id,createdAt,expiredAt})
            return
        }else{
            //delete URL
            await deleteURLById(id);
            jsonResponse(response,404,{msg:"url seem to be expired."})
            return;
        }
    } catch (error) {
        console.log(error.message)
        jsonResponse(response,500,{msg:"error from the server."})
    }
}
// @DESC Get all URL
// @ROUTE /urls
// @METHOD GET
const getAllUrlController = async(response)=>{
   try {
        // Getting all links
        const links = await getAllURLDb();
        // Case when the list is empty
        if(links.length < 1){
            await viewRes("./",response,200,{empty:true,msg:"list is empty."})
            return;
        }
        // Case the list contains items
        else{
            await viewRes("./",response,200,{empty:false,amount:links.length,links})
            return;
        }
   }
   catch(error) {
        console.log(error.message)
        jsonResponse(response,500,{msg:"error from the server."})
   }
}

// @DESC Update url
// @ROUTE /urls/URLid
// @METHOD PATCH
const updateController = async(request,response)=>{
   try {
        const id = request.url.split("/")[2];
        // Getting url for updating
        const url = await getUlrByid(id);

        if(url){
            let Rawdata = ""
            // Getting data as chunk and append to data string
            request.on("data",chunk=>Rawdata+=chunk);
            // When data is ready
            request.on("end",async()=>{

                const {expiration} = JSON.parse(Rawdata);
                const {isValidData,msg} = validateUpdate(expiration,url.expiration_date);
                if(!isValidData){
                    jsonResponse(response,400,{msg})
                    return;
                }
                    const data = prepareUpdateData(id,expiration)
                    await updateURL(data)
                    jsonResponse(response,201,{msg})
                    return;                
            })

            request.on("error",(e)=> {throw new Error(e)})
        }else{
            jsonResponse(response,404,{msg:"404"})
        }

   } catch (error) {
    console.log(error.message)
        jsonResponse(response,500,{msg:"server error"})
   }

}

// @DESC Remove url
// @ROUTE /urls/URLid
// @METHOD DELETE
const deleteController = async (id,response)=>{
   try {
        // Getting url;
        const url = await getUlrByid(id);
        // Case url is found
        if(url){
            // DELETE url
            await deleteURLById(id);
            // redirection to home page
            response.setHeader("Location","/")
            jsonResponse(response,200,{msg:"delete successfully."})
        }
        // Case url is not found
        else{
            jsonResponse(response,404,{msg:"Not found"})
        }
    }catch (error) {
        console.log(error.message)
        jsonResponse(response,500,{msg:"Error from server"})
   }
}
export {
    createUrlController,
    getSingleUrlController,
    getAllUrlController,
    aboutUrlController,
    updateController,
    deleteController}