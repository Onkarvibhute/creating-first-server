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
                let newToDo = toDoList;
                newToDo.push(body.item);
                console.log(newToDo);
            })
        }
        else if (method === "DELETE")
        {
            let body = " ";
            request.on("error", (err) =>
            {
                console.log(err);
             })
                .on("data", (chunk) =>
                {
                    body += chunk;                  
                }).on("end", () =>
                {
                    body = JSON.parse(body);
                    let deletedThis = body.item;
                    // for (let i = 0; i < toDoList.length; i++)
                    // {
                    //     if (toDoList[i] = deletedThis)
                    //     {
                    //         toDoList.splice(i, 1)
                    //         break;
                    //     }
                            
                    // }
                    toDoList.find((element,index) =>
                    {
                        if (element === deletedThis)
                        {
                            toDoList.splice(index, 1);
                        }
                        else
                        {
                            console.log("not delet");
                        }
                    })
                    response.writeHead(204);
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