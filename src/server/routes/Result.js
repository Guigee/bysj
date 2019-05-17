const router=require('express').Router()
const {Result} = require('../modules/result')
const multipartMiddleware=require('connect-multiparty')()
const { readFileStreamAndWriteFile } = require('../tool/readFileStreamAndWriteFile')
const fs = require( 'fs' )
const path = require( 'path' )
router.post('/',multipartMiddleware,async (req,res)=>{
    console.log(req.body,'???')
      let result = new Result({...req.body,date:Date.now()})
     await result.save()
      if(!result) res.status(404).send('not found')
      res.send(result)
})

router.get('/:avatarUrl',async (req,res)=>{
    // console.log(result)
    let result = await Result.find({avatarUrl:req.params.avatarUrl}).sort({date : -1}).skip(0).limit(1)
    console.log(result,'req.params.avatarUrl')
    if(!result) res.status(404).send('not found')
    res.send(result)
})

module.exports = router