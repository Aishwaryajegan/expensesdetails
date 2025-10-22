const express = require('express');
const mongoose = require('mongoose');
const userrouter = require("./UserRouter")

 const cors = require('cors');
 const path = require('path');
const StudentRouter = require('./StudentRouter');
const  StudentdRouter =require('./StudentdetRouter');
const expenseRouter=require('./ExpensesRouter');
const expenseaddRouter=require('./ExpensesaddRouter');
const app= express()
port =3003
app.use(express.json());
app.use(cors());

app.use('/studentuploads', express.static(path.join(__dirname, 'studentuploads')));

app.listen(port,()=>{
    console.log("your server is connected",port)
})

main().catch(err => console.log(err));


async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/online');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

app.use('/users', userrouter)
app.use('/students',StudentRouter)
app.use('/studentdetail',StudentdRouter)
app.use('/expensesdetail',expenseaddRouter)
app.use('/expenses',expenseRouter)
 app.get('/',(req, res)=>{

   res.send("Hello Expressjs")
})

app.get('/about',(req, res)=>{

   res.send("About js")
})