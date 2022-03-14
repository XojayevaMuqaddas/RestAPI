const express =require("express")
const router = express.Router()
const cinema = require("../model/movies")
router.get("/api/movies" , (req , res )=>{
    cinema.find({},(err , data)=>{
        if (err) throw err
        if (data==""){
            res.send("Malumot yoq")
        }
        else {
            res.send(data)
        }
    })
})

router.post("/api/movies" ,(req , res)=>{
    const db=new cinema (req.body)
    const promise=db.save()
    promise.then(err=>{
        console.log(err);
    })
    promise.then(data=>{
        res.json(data)
    })
})

router.put("/api/movies/:movie_id" , (req , res)=>{
    cinema.findByAndUpdate(req.params.movie_id , req.body ,(err , data)=>{
        if (err) throw err 
        res.json(data)
    })
})
router.delete("/api/movies/:movie_id" , (req , res)=>{
    cinema.findByIdAndRemove(req.params.movie_id ,(err , data )=>{
        if (err){
            console.log("xatolik bor");

        }
        else{
            res.json(data)
        }
    })
})

router.get("/api/movies/top10/cinema" , (req , res)=>{
    const promise=cinema.find({}).sort({imdb_score: -1}).limit(10)
    promise.then(err=>{
        res.json(data)
    }).catch(err=>{
        console.log(err);
    })
   
})
router.get("/api/movies/between/:start_year/:end_year" , (req,res)=>{
    const {start_year , end_year}=req.params
    const promise=cinema.find({year :{"$gte":(start_year) ,"$lte" :(end_year)}})
promise.then(data=>{
    res.json(data)
}).catch(err=>console.log(err))
})

module.exports=router



