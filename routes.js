const fs=require('fs')


const requestHandler=(req,res)=>{

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

}
//module.exports={
    Handler:requestHandler,
    //Sometext:"printing Some text"};

//exports.Handler=requestHandler;
//exports.Sometext="printing some text"

module.exports.Handler=requestHandler;
module.exports.sometext='printing  text';

