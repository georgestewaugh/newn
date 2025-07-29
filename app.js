const http=require('http');
const fs=require('fs')   //===>>>core moduule 

console.log('routes some text')
console.log('testing')

const server=http.createServer((req,res)=>{
const url=req.url;//===  >requst understand--- line no 8-14 -----///url & method----redirecting requset-------
const method=req.method;//==>>redirect req----line no 17-21-----///url & method----redirecting requset------- 
    // requst understanding 
    if(url==='/'){
        res.setHeader('Content-Type','text/html');
        res.write('<html>')
        res.write("<head><title>enter form detail </title></head>")
        res.write('<body><form action="/message" method="POST"> <input type="text" name="message"><button type="submit">send</button></form> </body>')
        res.write('</html>')
        return res.end();
    }
    //   how to redirect in this code====>>>>parsing requst
     if(url==='/message' && method=='POST'){

        const body=[];
        req.on('data',(chunk)=>{
        body.push(chunk)
        console.log(chunk);
        }); 
       req.on('end',()=>{
            const parsedbody=Buffer.concat(body).toString();
           // console.log(parsedbody);
           const message=parsedbody.split('=')
           fs.writeFileSync('hlo.txt',message[1])
        })

        fs.writeFileSync('hello.txt','DUMMY')
        res.setHeader('location','/')
        res.statusCode=302;
        return res.end();
    }

    //normal requst works in webbrowser===>>>     requset understanding
    res.setHeader('Content-Type','text/html');
    res.write('<html>')
    res.write("<head><title>georeg's love story </title></head>")
    res.write('<body> <h1>i love someone</h1></body>')
    res.write('</html>')
    res.end();
});
server.listen(3000, () => {
    console.log('Server is running on port 3000');
});




