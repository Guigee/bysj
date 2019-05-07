const path=require('path')
const fs = require('fs')
/**
 * 
 * @param {文件路径} filePath 
 * @param {写入文件目标位置} target 
 */
function readFileStreamAndWriteFile(filePath,target){
    let readStream=fs.createReadStream(filePath);
    
    return new Promise((resolve,reject)=>{
    let  ran=parseInt(Math.random()*89999+10000);
    let extname=path.extname(filePath);//文件扩展名
    // let Text=[]
    // readStream.on('data', (chunk) => {
    // console.log('读取文件数据中...', 
    // // chunk,filePath
    // );
    // fs.writeFile(`./${target}/${ran}${extname}`,chunk,(err)=>{
    //     if(err)reject(err)
    //     resolve(`${ran}${extname}`)
    //     console.log(`文件${ran}${extname}写入成功...,写入file文件夹`)
    // })//写入文件，不存在则创建
    // });
    readStream.pipe(fs.createWriteStream(`./${target}/${ran}${extname}`))//pipe管道避免溢出
            
  
    readStream.on('error',err=>{
    console.log(`读取文件出错${err}`)
    })
    readStream.on('close',()=>{
    console.log(`读取完成...`)
    resolve(`${ran}${extname}`)
        console.log(`文件${ran}${extname}写入成功...,写入file文件夹`)
    
    })
    readStream.on('open',()=>{
    console.log(`开始读取文件...`)
    })
       
    }) 
}

exports.readFileStreamAndWriteFile=readFileStreamAndWriteFile