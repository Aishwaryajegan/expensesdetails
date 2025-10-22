const mongoose=require ("mongoose")

const expensesdata = mongoose.Schema(
    {
        name:
        {
       type:String
        },
    password:
        {
            type: String 
        },
    
        email:
        {
        type:String
        },
    
       

        


    }
)
module.exports =mongoose.model("expenses", expensesdata)
