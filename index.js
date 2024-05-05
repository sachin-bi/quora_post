//creating first api

const express = require("express");
const app = express();
const port = 8080;
const path = require("path"); //to get folders public and views
const { v4: uuidv4 } = require('uuid');
//uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
const methodOverride = require('method-override');


app.use(express.urlencoded({ extended: true }));  //to parse the data coming from client
app.use(methodOverride('_method'));



app.set("views engine", "ejs");  // setting the views engine to read ejs
app.set("views", path.join(__dirname, "views"));    //to get the views folder

app.use(express.static(path.join(__dirname, "public")));    //to get the public folder


let posts = [
    {   
        id: uuidv4(),
        user: "rahul",
        content: "i love coding"
    },
    {
        id: uuidv4(),
        user: "ayush",
        content: "selected for dukan"
    },
    {
        id: uuidv4(),
        user: "sachi",
        content: "enjoying at goa"
    },
];


app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
});

app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});

app.get("/posts/:id", (req, res) => {
    let {id} = req.params;
    let post = posts.find((obj) => obj.id === id);
    console.log("search by id initiated ||",post);
    res.render("show.ejs",{post});
});

app.post("/posts", (req,res) => {

    console.log(req.body);
    let {user, content} = req.body;
    let id= uuidv4();
    console.log("pushing in array: ", {id,user,content});
    posts.push({id,user,content});
    res.redirect("/posts");
});

app.patch("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let newContent = req.body.content;
    // console.log(`pathch id : ${id}`);
    // console.log(`newContent id : ${newContent}`);

    let post = posts.find((obj) => obj.id === id);
    post.content = newContent;
    console.log('from app.patch:---',post );
    res.redirect("/posts");
    // res.send(`patch request workinh`);
});

app.get("/posts/:id/edit",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((obj) => id === obj.id);
    res.render("edit.ejs",{post});
});

app.delete("/posts/:id",(req,res)=>{
    let {id}= req.params;
    posts = posts.filter((obj) => id !== obj.id);
    // res.send("delete sucess");
    res.redirect("/posts");
})

app.listen(port, () => {
    console.log("listening to  port:8080");
    // console.log("uuid working status:",uuidv4());
    
});
