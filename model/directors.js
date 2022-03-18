const mongoose=require("mongoose")
const schema=mongoose.Schema

const director =schema({
    name:{
        type:String,
        required: true
    },
    surname :{
        type:String,
        required:true
    },
    bio :{
        type:String,
        requires:true


    },
    user_id:schema.Types.ObjectId,
})

module.exports=mongoose.model("director" , director)