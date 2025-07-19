const mongoose=require("mongoose")

const fileSchema = new mongoose.Schema({
    path:{
        type:String,
        required:[true,'path is required']
    },
    orginalname:{
        type:String,
        required:[true,'path is required']
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        path:[true,'path is required']
    }
})

const filemodel =mongoose.model("files",fileSchema)

module.exports=filemodel