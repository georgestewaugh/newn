const express=require('express');
const router= express.Router();
const apps=express();

apps.get('/try',(req,res)=>{
    res.send('<h1>welcome try page</h1>');
})

router.post('/love',(req,res)=>{
  //  console.log('form data:',req.body);
    res.send('<b>james love story<b>')
})

apps.listen(3000,()=>{
   console.log("server is running successfuly");
})