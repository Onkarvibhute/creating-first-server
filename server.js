const http = require('http');
const { join } = require('path');
const port = 8081;

const toDoList = ["complete node byte", "play cricket"];
http.
    createServer((request, response) =>
{ 
    const { method, url } = request;

    if (url === "/todos")
    {
        if (method === "GET")
        {
            response.writeHead(200);
            response.write(toDoList.toString());
        }
        else if (method === "POST")
        {
            let body = "";
            request.on("error", (err) =>
            {
                console.error(err)
            }
            ).on("data", (chunk) =>
            {
                body += chunk;
            }).on("end", () =>
            {
                body = JSON.parse(body);
                console.log("data:", body);
            })
         }
        else
        {
            response.writeHead(501);
        }
        }
    else
    {
        response.writeHead(404);
        }
        
    response.end();
})
    
    .listen(port, () =>
{
    console.log(`Node js server started on port ${port}`)
    });

    // http://Localhost:8081