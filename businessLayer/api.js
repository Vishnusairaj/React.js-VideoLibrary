
var mongoClient = require("mongodb").MongoClient;
 var express = require ("express");

 var cors = require("cors");

 var conStr="mongodb://127.0.0.1:27017";
 

 var app=express();

 app.use(cors());
 app.use(express.urlencoded({extended:true}));
 app.use(express.json());


 //Routes

 app.get("/admin",(req,res)=>{
    mongoClient.connect(conStr).then(clientObj=>{

        var database = clientObj.db("videolibrary");
        database.collection("admin").find({}).toArray().then(documents=>{
            res.send(documents);
            res.end();
        });
    });
 });

 app.get("/videos",(req,res)=>{
    mongoClient.connect(conStr).then(clientObj=>{

        var database = clientObj.db("videolibrary");
        database.collection("video").find({}).toArray().then(documents=>{
            res.send(documents);
            res.end();
        });
    });
 });

 
 app.get("/categories",(req,res)=>{
    mongoClient.connect(conStr).then(clientObj=>{

        var database = clientObj.db("videolibrary");
        database.collection("categories").find({}).toArray().then(documents=>{
            res.send(documents);
            res.end();
        });
    });
 });
 app.get("/users",(req,res)=>{
    mongoClient.connect(conStr).then(clientObj=>{

        var database = clientObj.db("videolibrary");
        database.collection("user").find({}).toArray().then(documents=>{
            res.send(documents);
            
        });
    });
 });
 

 app.get("/videos/:id",(req,res)=>{
    mongoClient.connect(conStr).then(clientObj=>{

        var database = clientObj.db("videolibrary");
        database.collection("video").find({VideoId:parseInt(req.params.id)}).toArray().then(documents=>{
            res.send(documents);
            res.end();
        });
    });
 });

 app.get("/videos/:categoryid",(req,res)=>{
    mongoClient.connect(conStr).then(clientObj=>{

        var database = clientObj.db("videolibrary");
        database.collection("video").find({CategoryId:parseInt(req.params.categoryid)}).toArray().then(documents=>{
            res.send(documents);
            res.end();
        });
    });
 });
 app.post("/register-user",(req,res)=>{

    var user={
        UserId:req.body.UserId,
        UserName:req.body.UserName,
        Password:req.body.Password,
        Mobile:req.body.Mobile,
        Email:req.body.Email
    }

    mongoClient.connect(conStr).then(clientObj=>{

        var database=clientObj.db("videolibrary");

        database.collection("user").insertOne(user).then(()=>{
            console.log("User Registered")
            res.end();
        });
    });
 });

 app.post("/add-videos",(req,res)=>{

    var video={
       VideoId:parseInt(req.body.VideoId),
       Title:req.body.Title,
       Url:req.body.Url,
       Likes:parseInt(req.body.Likes),
       DisLikes:parseInt(req.body.DisLikes),
       Views:parseInt(req.body.Views),
       CategoryId:parseInt(req.body.CategoryId)
    }

    mongoClient.connect(conStr).then(clientObj=>{

        var database=clientObj.db("videolibrary");

        database.collection("video").insertOne(video).then(()=>{
            console.log("Video Added")
            res.end();
        });
    });
 });

 app.put("/edit-videos/:id",(req,res)=>{

    var video={
       VideoId:parseInt(req.body.VideoId),
       Title:req.body.Title,
       Url:req.body.Url,
       Likes:parseInt(req.body.Likes),
       Dislikes:parseInt(req.body.Dislikes),
       Views:parseInt(req.body.Views),
       CategoryId:parseInt(req.body.CategoryId)
    }

    mongoClient.connect(conStr).then(clientObj=>{

        var database=clientObj.db("videolibrary");

        database.collection("video").updateOne({VideoId:parseInt(req.params.id)},{$set:video}).then(()=>{
            console.log("Video Updated")
            res.end();
        });
    });
 });

 app.delete("/delete-videos/:id",(req,res)=>{

   mongoClient.connect(conStr).then(clientObj=>{

        var database=clientObj.db("videolibrary");

        database.collection("video").deleteOne({VideoId:parseInt(req.params.id)}).then(()=>{
            console.log("Video deleted")
            res.end();
        });
    });
 });
 
 

 app.listen(5000);
 console.log(`Server Started http://127.0.0.1:5000`);