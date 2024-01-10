import { createServer } from "http";

import { urlPattern } from "./server/utils/urlpattern.js";
import {
    createUrlController,
    getSingleUrlController,
    getAllUrlController,
    aboutUrlController,
    updateController,
    deleteController
} from "./server/controllers/urlControllers.js";
import { serveStatic } from "./server/utils/assets.js";

const server = createServer(async (request, response) => {
    const { url, method } = request;
    const getUrlRegex = /^\/[a-z]{7}\/?$/i; // hostname/id
    const aboutUrlRegex = /^\/urls\/[a-z]{7}\/?$/i; // hostname/urls/id
    const assetsUrlRegex = /^\/assets\// // Hostname/assets/anything

    // @DESC Serving static files
    // Routes /assets/../.. filename
    if (assetsUrlRegex.test(url) && method === 'GET') {
        serveStatic(url, response)
    }
    // @DESC Home Page 
    // ROUTE /
    else if (url === "/" && method === "GET") {
        getAllUrlController(response);
    }
    // @DESC Create URL
    // ROUTE /create
    else if (urlPattern("create", url) && method === "POST") {
        createUrlController(request, response)
    }
    // @DESC Get single url
    // ROUTE /URLid
    else if (getUrlRegex.test(url) && method === "GET") {
        const id = url.split('/')[1]
        getSingleUrlController(id, response)
    }
    // @DESC Get info about single url
    // ROUTE /urls/URLid
    else if (aboutUrlRegex.test(url) && method === "GET") {
        const id = url.split("/")[2]
        aboutUrlController(id, response)
    }
    // @DESC Update single URL
    // ROUTE /urls/URLid
    else if (aboutUrlRegex.test(url) && method === "PATCH") {
        updateController(request, response)
    }
    // @DESC Delete single URL
    // ROUTE /urls/URLid
    else if (aboutUrlRegex.test(url) && method === "DELETE") {
        const id = url.split("/")[2]
        deleteController(id, response)
    }
    // 404
    else {
        response.statusCode = 404
        response.end(JSON.stringify({ msg: "Not found." }))
    }
})


const PORT = 5000
server.listen(PORT, console.log("ok..."));


