import Handlebars from "handlebars";
import {readFile} from "fs/promises";
import { resolve } from "path";

//@DESC responding with html view.
const viewRes = async(fileLoc,response,status,data)=>{
    const hbs = await readFile(resolve("public",fileLoc,"index.hbs"),"utf-8");
    const html = Handlebars.compile(hbs);
    response.writeHead(status,{"content-type":"text/html"})
    response.end(html(data))
    
}

export default viewRes