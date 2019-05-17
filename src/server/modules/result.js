// const Joi=require('Joi')
const mongoose=require('mongoose')

const Result = mongoose.model('Result',new mongoose.Schema({
    avatarUrl: String ,
    imgUrl:  String ,
    position: Object ,
    describle: String ,
    index : Number,
    result:Object,
    model:Number,
    date: {
        type:Date,
        default:Date.now()
    },
}))

exports.Result=Result