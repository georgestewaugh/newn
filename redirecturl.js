//------------------- asyncronous code  Event ===>>>> driven architechture//non blocking code  -----assyncronos function()---------
const http=require('http');
const fs=require('fs')

const server=http.createServer((req,res)=>{
    const url=req.url;
    const method=req.method;

    if(url==='/'){
        res.setHeader('Content-type','text-html')
        res.write('<html>')
        res.write("<head><title> enter form details </title></head>")
        res.write('<body><form  action ="/message" method="POST"> <input type="text" name="message"><input type="submit" value="send"></form> </body>')
        res.write('</html>')   
        return res.end();
     }
       if(url==='/message' && method=='POST'){
        const body=[];
        req.on('data',(chunk)=>{
            body.push(chunk)
})

            return req.on('end',()=>{
            console.log('end event recived');
            const parsedbody=Buffer.concat(body).toString();
            const message=parsedbody.split('=');
            fs.writeFile('hiii.txt',message[1],(err)=>{
                console.log("file write completed")
                res.setHeader('Location','/')
                res.statusCode=302;
                return res.end();
            })
           
     })
    }

    res.setHeader('Content-type','text-html')
    res.write('<html>')
    res.write("<head><title> prakash's coding  story </title></head>")
     res.write('<body> <h1>prakash is a good developer</h1></body>')
    res.write('</html>')   
    return res.end();
})
server.listen(3000,()=>{
    console.log('server is running succesfully in lacalhost 3000')
})