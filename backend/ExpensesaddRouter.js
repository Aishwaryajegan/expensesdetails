const express =require("express");
const router = express.Router();
//const multer =require('multer');
//const upload =multer();
const expensesadd = require("./ExpensesaddModule");
//router.post('/expensesadds',upload.none(),async(req,res)=>
  router.post('/expensesadds',async(req,res)=>
{

  
    const add_datas=
    {
         
        title:req.body.title,
        amount:req.body.amount,
        category:req.body.category,
      transcation:req.body.transcation,
      description:req.body.description,
      date:req.body.date,
      email:req.body.email
    }
 
    const datasave= new expensesadd(add_datas);
     
    const result = await datasave.save();

    if(result)
    {
        res.send({"msg":"added"})
    }
    else{
        res.send({"msg":"unables to added"})
    }


})

router.post('/find', async (req,res) => {
    const email=req.body.email;
  try {
    const expensesall = await expensesadd.find({email:email});
    res.json(expensesall);
  } catch (err) {
    res.status(500).json({error: 'Error fetching Expenses'});
  }
});

//router.post('/expenseupdate',upload.none(), async (req, res) => {
  router.post('/expenseupdate',async (req, res) =>{
  try {
    const { _id, title, amount, category, transcation, description, date } = req.body;

    const updated = await expensesadd.findByIdAndUpdate(_id, {
      $set: {
        title,
        amount,
        category,
        transcation,
        description,
        date,
      }
    });

    if (updated) {
      res.send({ msg: "updated" });
    } else {
      res.send({ msg: "unable to update" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: "Server error" });
  }
});

router.post('/deletedata',async(req,res) => {
  const deleteexpenses =await expensesadd.findOneAndDelete({_id : req.body._id})
  if(deleteexpenses)
  {
    res.send({msg:"delete"})
  }else{
    res.send({msg:"unable to delete"})
  }
})
router.post('/findbydate', async (req, res) => {
  const { email, date } = req.body;

  // Ensure date is in yyyy-mm-dd format
  const selectedDate = new Date(date);
  const nextDate = new Date(selectedDate);
  nextDate.setDate(selectedDate.getDate() + 1);

  try {

    const data = await expensesadd.find({
      email: email,
      date: {
        $gte: selectedDate,
        $lt: nextDate
      }
    });

    res.send(data);
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: "Error fetching data" });
  }
});

router.post('/summarydashboard', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ msg: "Email is required" });

  try {
    const allData = await expensesadd.find({ email });

    let income = 0;
    let expenses = 0;
    let incomeBreakdown = {};
    let expenseBreakdown = {};

    allData.forEach(entry => {
      const { transcation, amount, category } = entry;
      const amt = Number(amount);

      if (transcation === 'Credit') {
        income += amt;
        incomeBreakdown[category] = (incomeBreakdown[category] || 0) + amt;
      } else if (transcation === 'Expenses') {
        expenses += amt;
        expenseBreakdown[category] = (expenseBreakdown[category] || 0) + amt;
      }
    });

    res.json({
      income,
      expenses,
      turnover: income + expenses,
      incomeBreakdown,
      expenseBreakdown
    });
  } catch (err) {
    console.error("Summary Error:", err);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

module.exports=router;