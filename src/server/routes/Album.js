const router=require('express').Router()
const {Album} = require('../modules/Album')
const multipartMiddleware=require('connect-multiparty')()
const { readFileStreamAndWriteFile } = require('../tool/readFileStreamAndWriteFile')
const fs = require( 'fs' )
const path = require( 'path' )
router.get('/:avatarUrl',async (req,res)=>{
    const album = await Album.find()
    // console.log(album,req.params.avatarUrl)
    if(!album) res.status(404).send('not find any phote')
    res.send(album)
})
router.delete('/:id',async (req,res)=>{
    console.log(`id为${req.params.id}的照片被删除`)
    const album = await Album.findByIdAndDelete(req.params.id);
    
    let curPath=__dirname.split('\\')
    fs.unlinkSync(path.join(`${curPath.slice(0,curPath.length-1).join('\\')}/file/${album.imgUrl}`),(err)=>{
        if(err) throw err
    })
    if(!album) return res.status(404).send(`not found with this id`)
//   console.log(connecter)
    res.send(album)
})
router.post('/',multipartMiddleware,async (req,res)=>{
    let urls=[]
    for(let key in req.files){
        // console.log(req.files[key])
         await readFileStreamAndWriteFile(req.files[key].path,'file').then(ret=>{ 
             urls.push(ret)
           console.log(`文件写入成功${ret}`)
      })
    }
    let album = new Album({...req.body,imgUrl:urls[0]})
    album=await album.save()
    if(!album) res.status(404).send('not set any phote')
    // console.log(album)
    res.send(album)
})
module.exports = router