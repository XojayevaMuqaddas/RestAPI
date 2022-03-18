const express =require("express")
const router =express.Router()
const userDb=require("../model/users")
const bcryptjs=require("bcryptjs")



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



module.exports=router