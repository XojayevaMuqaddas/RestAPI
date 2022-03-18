const express =require("express")
const router =express.Router()
const userDb=require("../model/users")
const bcryptjs=require("bcryptjs")

// router.get("/api/users" ,(req ,res)=>{
//     userDb.find({},(err , data )=>{
//         if(err) throw err 
//         if (data==""){
//             res.send("Malumot yoq")
//         }
//         else{
//             res.send(data)
//         }
//     })
// }) 
router.post("/register" , (req, res )=>
{
    const {username, password}=req.body

bcryptjs.hash(password,10, (err ,hash)=>{
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

// router.post("/api/users" , (req ,res)=>{
//     const  db=new userDb(req.body)
//     const promise=db.save()
//     promise.then(err=>{
//         console.log(err);
//     })
//     promise.then(data=>{
//         res.json(data)
//     })
// })

module.exports=router