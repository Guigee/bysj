// const Joi=require('Joi')
const mongoose=require('mongoose')

const GraduationAlbum = mongoose.model('GraduationAlbum',new mongoose.Schema({
    avatarUrl: String ,
    imgUrl:  String ,
    position: Array ,
    date: {
        type:Date,
        default:Date.now()
    }
}))

exports.GraduationAlbum=GraduationAlbum