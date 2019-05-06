const router = require( 'express' ).Router()
const {Connecter} = require('../modules/connecter')
const  multiparty=require('connect-multiparty');//处理post
const multipartMiddleware=multiparty()
const {readFileStreamAndWriteFile} = require('../tool/readFileStreamAndWriteFile')
router.get('/',async (req,res)=>{
   let connecter=await Connecter.find()
   if(!connecter) return res.status(404).send(`not found`)
   console.log(`获取所有联系人`)
   res.send(connecter)
})

router.post('/',multipartMiddleware,async (req,res)=>{
    let urls = []
    for(let key in req.files){
    await  readFileStreamAndWriteFile(req.files[key].path,'file').then(ret=>{
           urls.push(ret)     
      })
    }
    let connecter=new Connecter({...req.body,imgUrl:urls[0]})
    connecter=await connecter.save()
    console.log(`插入一组联系人成功`)
    res.send(connecter)
})
router.delete('/:id',async (req,res)=>{
    console.log(`id为${req.params.id}的联系人被删除`)
    const connecter = await Connecter.findOneAndDelete(req.params.id);
    if(!connecter) return res.status(404).send(`not found with this id`)

    res.send(connecter)
})

module.exports = router