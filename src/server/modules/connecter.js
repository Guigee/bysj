// const Joi=require('Joi')
const mongoose=require('mongoose')

const Connecter = mongoose.model('Connecter',new mongoose.Schema({
    name:String,
    number: Number,
    area: String,
    notes: String,
    grade: String,
    imgUrl: String,
    date: {
        type:Date,
        default:Date.now()
    }
}))

exports.Connecter=Connecter