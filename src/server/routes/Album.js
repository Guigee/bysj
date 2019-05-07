const router=require('express').Router()
const {Album} = require('../modules/Album')
const multipartMiddleware=require('connect-multiparty')()

router.get('/',async (req,res)=>{
    const album = await Album.find()
    if(!album) res.status(404).send('not find any phote')
    res.send(album)
})

router.post('/',async (req,res)=>{
    const album = new Album(req.body)
    if(!album) res.status(404).send('not find any phote')
    res.send(album,req)
})
module.exports = router