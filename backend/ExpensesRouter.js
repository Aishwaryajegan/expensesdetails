const express = require("express");
const router = express.Router();
const expensesdata = require('./ExpensesModule');

router.post('/add',async(req,res)=>
{
    //const {name,password,phone,email,gender,language,country}=req.body;
try{
   const existinguser =await expensesdata.findOne({name : req.body.name});
    if(existinguser){
       return res.send({"msg":"user already exists"}) 
    }
    const add_datas=
    {
         
        name:req.body.name,
        password:req.body.password,
        email:req.body.email,
      
    }
 
    const datasave= new expensesdata(add_datas);
     
    const result = await datasave.save();

    if(result)
    {
        res.send({"msg":"added"})
    }
    else{
        res.send({"msg":"unables to added"})
    }
}
catch(error){
    console.error("eerror");
    res.send({"msg":"error"})
}
})

router.post ("/login",async(req,res)=>{
   
    
        const{email,password}=req.body;
        console.log("Received:",email,password);
   
     
    try{
    let login =await expensesdata . findOne({email:email,password:password});
    if (login){
         return res.json({
            "msg":"login successfully",
            data:{
          email:login.email,
          name:login.name
            }
         
        })
        
    }
    else{
         return res.json({"msg":"unable to login"})
    }
    }catch(error)
    {
        res.send({"msg":"server error"})
    }
     
    }) 
    
    
    module.exports=router;
