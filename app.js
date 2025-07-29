

const express=require('express')
const app=express();

app.use((req,res,next)=>{
    console.log('First Moiddle Ware!');
    next();
})

app.use('/',(req,res,next)=>{
    console.log('Second Moiddle Ware!');
    res.send('<h1>hi</h1>')
    next();
})

app.use((req,res,next)=>{
    console.log('third Moiddle Ware!');
  
   
})
app.listen(3000)