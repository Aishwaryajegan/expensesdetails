const mongoose=require("mongoose");

const expensesadd= mongoose.Schema(
    {
        title:
        {
            type:String
        },
        amount:
        {
            type:Number
        },
        category:{
            type:String
        },
        transcation:
        {
            type:String
        },
        description:
        {
            type:String
        },
        date:
        {
            type:Date
        },
          email:
        {
        type:String
        }
    }
)
module.exports=mongoose.model("expensesadd",expensesadd)