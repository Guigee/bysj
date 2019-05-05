var express=require('express')
var app=express()
var http=require('http')
var mysql=require('mysql')
var path = require("path");
var fs=require('fs')
var path=require('path')
console.log(__dirname)
app.use(express.static(path.join(__dirname, './file')))
// const bodyParser = require('body-parser');
// app.use(bodyParser.json());//数据JSON类型
// app.use(bodyParser.urlencoded({ extended: false }));//解析post请求数据
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  database : 'test'
});
var formidable = require('formidable');
connection.connect();
 
connection.query('SELECT * from user', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results);
});
app.post('/getUser',(req,res)=>{
    console.log('获取')
    console.log(req.body)
    req.on('data',ret=>{
        ret=JSON.parse(ret)
        let sql=`select * from connecter`
        console.log(sql)
        connection.query(sql,(err,re)=>{
            res.send({
                status:200,
                msg:re
                })
        })
    })
})
app.get('/image',(req,res)=>{
    
    res.sendFile(__dirname + `/file/${req.query.number}`)
})
app.post('/uploadFile',(req,res)=>{
    var form=new formidable.IncomingForm();
    form.uploadDir="file"
    form.parse(req,(err,fields,files)=>{
        //报错的时候直接抛出错误
        if(err){
            throw err;
        }
        console.log(files,'文件？')
        // console.log(files.image.name,'???')
        //每当触发事件的时候就产生一个随机数
        var ran=parseInt(Math.random()*89999+10000);
        //获得上传文件的后缀名
        // path.extname获得的是文件从'.'开始到最后的扩展名(是最后一个.)
        var extname=path.extname(files.image.name)
        //获得上传文件时的路径
        const oldPath=files.image.path.replace('\\','/');
        //
        //获得放到目的目录的路径
        const newPath="file/"+ran+extname;
        //在上传文件成功之后，用rename参数进行修改文件名
        //rename的参数有两种使用方法，就是下方的样子，参数为(oldPath,newPath,callback),另一中方法是(oldPath,newPath),即少了回掉函数
        console.log(oldPath,newPath,'??',__dirname)
        fs.rename(oldPath,newPath,(err)=>{
            console.log(req.query,'zzz')
            req.query.img=`${ran+extname}`
            var j=formatObj(req.query)
            console.log(`insert into connecter (${j.keys}) values ('${j.values}')`,'文件上传的SQL')
        connection.query(`insert into connecter (${j.keys}) values ('${j.values}')`)
            if(err){
                throw Error('改名失败',err);
            }
        res.writeHead(200,{"Content-type":"text/plain"});
        res.end("success");
    })
})

})
app.post('/deleteConnecter',(req,res)=>{
    req.on('data',ret=>{
        ret=JSON.parse(ret)
        let sql=`delete from connecter where name='${ret.name}'`
        console.log(sql,'??')
        connection.query(sql,(err,re)=>{
            res.send({
                status:200,
                msg:re
                })
        })
    })
})
function formatObj(obj){
    let newObj={
        keys:[],
        values:[]
    }
    for(var key in obj){
        newObj.keys.push(key)
        newObj.values.push(obj[key])
    }
    newObj.keys=newObj.keys.join(',')
    newObj.values=newObj.values.join("','")
    return newObj
}
app.post('/login',(req,res)=>{
    req.on('data',ret=>{
        ret=JSON.parse(ret)
        // console.log(ret,`insert into user (user,password) values ('${ret.user}','${ret.password}')`)
        var j=formatObj(ret)
        connection.query(`insert into connecter (${j.keys}) values ('${j.values}')`)
        console.log(`insert into connecter (${j.keys}) values ('${j.values}')`,'???')
        connection.query('SELECT * from connecter', function (error, results, fields) {
            if (error) throw error;
            console.log('The solution is: ', results);
          });
        res.send('我收到了')
    })
})
// mysql.connect({
//     host:'',
//     port:'',
//     user:'',
//     passaddjfdl
// })
// let sql=`select * from user`
// mysql.query(sql,(err,res)=>{
//     res
// })
http.createServer(app).listen(3000,'192.168.31.254')
