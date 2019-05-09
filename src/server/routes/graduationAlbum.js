const router=require('express').Router()
const {GraduationAlbum} = require('../modules/graduationAlbum')
const multipartMiddleware=require('connect-multiparty')()
const { readFileStreamAndWriteFile } = require('../tool/readFileStreamAndWriteFile')
const fs = require( 'fs' )
const path = require( 'path' )
router.get('/:avatarUrl/:num',async (req,res)=>{
    const graduationAlbum = await GraduationAlbum.find({ avatarUrl:req.params.avatarUrl}).sort({date : -1})
    .skip(0).limit(parseInt(req.params.num))
    if(!graduationAlbum) res.status(404).send('not find any phote')
    res.send(graduationAlbum)
})
router.delete('/:id',async (req,res)=>{
    console.log(`id为${req.params.id}的照片被删除`)
    const graduationAlbum = await GraduationAlbum.findByIdAndDelete(req.params.id);
    
    let curPath=__dirname.split('\\')
    fs.unlinkSync(path.join(`${curPath.slice(0,curPath.length-1).join('\\')}/file/${graduationAlbum.imgUrl}`),(err)=>{
        if(err) throw err
    })
    if(!graduationAlbum) return res.status(404).send(`not found with this id`)
//   console.log(connecter)
    res.send(graduationAlbum)
})
router.post('/',multipartMiddleware,async (req,res)=>{
    let urls=[]
    for(let key in req.files){
        // console.log(req.files[key])
         await readFileStreamAndWriteFile(req.files[key].path,'file').then(ret=>{ 
             urls.push(ret)
        //    console.log(`文件写入成功${ret}写入时间${Date.now()}`)
      })
    }
    let graduationAlbum = new GraduationAlbum({...req.body,imgUrl:urls[0],date:Date.now()})
    graduationAlbum=await graduationAlbum.save()
    if(!graduationAlbum) res.status(404).send('not set any phote')
    // console.log(graduationAlbum)
    res.send(graduationAlbum)
})
router.put('/:id',async (req,res)=>{
    // const { error } = validateGenre(req.body)
    // if (error) return res.status(400).send(error.details[0].message);

    const graduationAlbum = await GraduationAlbum.findByIdAndUpdate(req.params.id, req.body ,  { 
         new:true
    });
    //if update error ${genre} will be false
    if(!graduationAlbum) return res.status(404).send(`The Genre with the given ID not found`)
    res.send(graduationAlbum)
})
module.exports = router