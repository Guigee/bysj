// const Joi=require('Joi')
const mongoose=require('mongoose')

const album = mongoose.model('Album',new mongoose.Schema({
    avatarUrl: String ,
    imgUrl:  String ,
    position: Array
}))

exports.Album=album