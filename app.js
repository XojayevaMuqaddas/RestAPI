const express=require("express")
const app=express()
const port = (process.env.PORT || '3000');
const rMovie=require("./routers/movie")
const bodyParser=require("body-parser")
const mongoose=require("mongoose");
const rDirector=require("./routers/director")
const rUser=require("./routers/user")
const secretKey=require("./config")
const path=require("path")

mongoose.connect('mongodb://localhost:27017/new_proekt')
const db=mongoose.connection
db.on("open" ,()=>{
    console.log('mongodb running');

})
db.on('error' ,(err)=>{
    console.log("Mongodbda xatolik");
})
app.set("api_secret_key" , secretKey.api_secret_key)


app.set("view engine","pug")
app.use(express.static(path.join(__dirname , "public")))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.use(rMovie)
app.use(rDirector)
app.use(rUser)


app.listen(port , ()=>{
    console.log("server ishga tushdi");
})