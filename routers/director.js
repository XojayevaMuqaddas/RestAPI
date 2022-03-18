const express =require("express")
const directors = require("../model/directors")
const router =express.Router()
const {default:mongoose}=require("mongoose")
const directorDb=require("../model/directors")


router.get("/api/directors" , (req ,res)=>
{
  directorDb.find( {}, (err , data) =>{
  
      if (err ) throw err
      else {
          res.json(data)
      }

  })
})

router.post("/api/directors" , (req ,res )=>
{
    const db=new directorDb(req.body)
    db.save().then(data=>{
        res.json(data)

    }).catch(err=>{
        console.log(err);
    })
})

router.get("/api/directops" ,(req ,res)=>{
    const promise =directorDb.aggregate([
        {
            $lookup:{
                from:"cinemas",
                localfField:"_id",
                foreignField:"Director_id",
                as:"filmlar"
            }
        },    
            {
                $unwind:{
                    path:"$filmlar"
                }
            },
            {
                $group:{
                    _id:{
                    _id:"$_id",
                    name:"$name",
                    surname:"$surname",
                    bio:"$bio"
                },
            
                 flimlar:{
                        $push:"$filmlar"
                    }
                }
            
        }
    ])

})

// router.get("/api/directors/:director_id" ,(req ,res)=>{
//     directorDb.find( {}, (err , data) =>{
  
//         if (err ) throw err
//         else {
//             res.json(data)
//         }
//     })
// })
router.get("/api/directors/:directors_id/best10movie" ,(req , res)=>{
    const promise =directorDb.aggregate([
        {
            $match:{
                _id: mongoose.Types.ObjectId(req.params.directors_id)
            }
        },
        {
            $lookup:{
                from:"movies",
                localField:"_id",
                foreignField:"director_id",

                pipeline:[
                    {$sort:{
                        year:1
                    }},
                   { 
                       $limit : 2
                }
                ],
                as:"filmlar"
            }
        }
    ])


promise.then(data=>res.json(data)).catch(err=>{
    console.log(err);
})
})
module.exports=router


