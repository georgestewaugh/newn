//------------------- redirect requst -----------------------
const http=require('http');

const server=http.createServer((req,res)=>{
    const url=req.url;

    if(url==='/'){
        res.setHeader('Content-type','text-html')
        res.write('<html>')
        res.write("<head><title> enter form details </title></head>")
        res.write('<body><form action ="/message" method="POST"> <input type="text" name="message"><input type="submit" value="send"></form> </body>')
        res.write('</html>')   
        return res.end();

    }
    res.setHeader('Content-type','text-html')
    res.write('<html>')
    res.write("<head><title> prakash's life story </title></head>")
    res.write('<h1>prakash is a good developer</h1>')
    res.write('<body> prakash born in a village but he will beome a ceo in a it company</body>')
    res.write('</html>')   
    return res.end();
})
server.listen(3000,()=>{
    console.log('server is running succesfully in lacalhost 3000')
})