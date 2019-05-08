const router = require( 'express' ).Router()
const {Connecter} = require('../modules/connecter')
const  multiparty=require('connect-multiparty');//处理post
const multipartMiddleware=multiparty()
const fs=require('fs')
const path = require('path')
const {readFileStreamAndWriteFile} = require('../tool/readFileStreamAndWriteFile')
router.get('/:avatarUrl',async (req,res)=>{
   let connecter=await Connecter.find({avatarUrl:req.params.avatarUrl})
   if(!connecter) return res.status(404).send(`not found`)
   console.log(`获取所有联系人`)
   res.send(connecter)
})

router.post('/',multipartMiddleware,async (req,res)=>{
    let urls = []
    for(let key in req.files){
        console.log(req+"??")
        console.log(req.body+"!!")
        console.log(req.files[key],req.body)

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
    const connecter = await Connecter.findByIdAndDelete(req.params.id);
    
    let curPath=__dirname.split('\\')
    fs.unlinkSync(path.join(`${curPath.slice(0,curPath.length-1).join('\\')}/file/${connecter.imgUrl}`),(err)=>{
        if(err) throw err
    })
    if(!connecter) return res.status(404).send(`not found with this id`)
//   console.log(connecter)
    res.send(connecter)
})

module.exports = router