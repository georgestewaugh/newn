//-------------------requst understanding-----------------------
const http=require('http');
const routes=require('./routes')

console.log(routes.sometext)
console.log(routes.Handler)
const server=http.createServer(routes.Handler);

server.listen(3000);
    