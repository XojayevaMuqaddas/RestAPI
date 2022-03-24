const express =require("express")
const router =express.Router()
const userDb=require("../model/users")
const bcryptjs=require("bcryptjs")
const jwt=require("jsonwebtoken")


router.post("/register" , (req, res )=>
{
    const {username, password}=req.body

bcryptjs.hash(password,10, (err ,hash)=>{
    bcryptjs.hash(password ,10 ,(err, hash)=>{
        if(err) throw err
    const db= new userDb({
        username:username,
        password:hash
    })
    db.save().then(data=>{
        res.json(data)
    }).catch(err=>{
        console.log(err);
    }) 
})
    
    if(err) throw err
    const db= new userDb({
        username:username,
        password:hash
    })
    db.save().then(data=>{
        res.json(data)
    }).catch(err=>{
        console.log(err);
    }) 
})

})
router.post("/authenticate" , (req ,res )=>{
    const{username ,password}=req.body
    userDb.findOne({username} , (err , data)=>{
       router.post("/authenticate" ,(req , res)=>{
const{username ,password}=req.body
userDb.findOne({username} ,(err ,data)=>{
    if (err) throw err 
    if (!data){
        res.json("username topilmadi")

    }
    else {
        bcryptjs.compare(password ,data.password)
        .then(data=>{
            if(!data){
            res.json("Parolda hatolik bor")
        }
        else{
            res.json("Sahifaga  xush  kelibsiz")
        }
    }).catch(err=>{
        console.log(err);
    })
}
})
})


        if (err) throw err 
        if (!data){
            res.json("username topilmadi")

        }
        else {
            bcryptjs.compare(password ,data.password)
            .then(data=>{
                if(!data){
                res.json("Parolda hatolik bor")
            }
            else{
                const payload ={username}
                const token= jwt.sign(payload ,req.app.get("api_secret_key"),{
                   expiresIn:240 
                } )
                res.json({
                    status:true ,
                    token
                })
                        }
        }).catch(err=>{
            console.log(err);
        })
    }
})
})
// pugga qo'shish
router.get("/user" ,(req ,res)=>{
    res.render("user" ,{
        title:" bosh sahifa",
    })
})
router.post("/user" , (req , res)=>{
    const{ username, password}=req.body
    const db=new userDb({
        username:username,
        password:password,
    })
})


router.get("/add" ,(req ,res)=>{
    res.render("add" ,{
        title:" Ro'yxatdan o'tish",
    })
})




module.exports=router