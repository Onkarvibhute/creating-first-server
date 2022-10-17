
const { request, response } = require('express');
const express = require('express');
// initialization
const app = express();

//application will use json format for data
app.use(express.json());

const port = 8081;

const toDoList = ["complete", "play"];

// http//localhost:8081/todos
app.get("/todos", (request, response) =>
{//calllback
    response.status(200).send(toDoList);
});
app.post("/todos", (request, response) =>
{
    let newToDoitem = request.body.item;
    toDoList.push(newToDoitem);
    response.status(201).send({
        message:"task added successfully"
    });
});
app.delete("/todos", (request, response) =>
{
    const itemtodelet = request.body.item;
    toDoList.find((element, index) =>
    {
        if (element === itemtodelet)
        {
            toDoList.splice(index, 1);
        }
    });
    response.status(202).send({
        message: `deleted item - ${request.body.item}`
    });
});
// for all other methods other than mentioned here
app.all("/todos", (request, response) =>
{
    response.status(501).send({
        message:"metod is not implementade"
    });
    
})
//for all other routes than todos
app.all("*", (request, response) =>
{
    response.status(404).send({
        message:"route is not 'todos'"
    })
})
app.listen(port, () =>
{
    //callback
    console.log(`nodejs server started on ${port} `);
});

