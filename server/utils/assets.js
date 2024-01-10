import fs from "node:fs/promises";
import path from "node:path"


const MIMEType ={
    ".css":"text/css",
    ".js":"text/javascript"
};
// @DESC SERVING static file such as .css,.js file
const serveStatic = async(url,response)=>{
    try {
        // Get extention of the file
        const ext = path.extname(url);
         // Get Absolute path for the file
        const p = path.resolve("public",`.${url}`)
        // read the file
        const file = await fs.readFile(p);
        // SET it MIME Type and send the fille
        response.setHeader("Content-Type",`${MIMEType[ext]}`);
        response.end(file)
    } catch (error) {
        console.log("error from serverving assets")
        console.log(error.message)
        response.end(`${url} not found.`)
    }
}
export {serveStatic}