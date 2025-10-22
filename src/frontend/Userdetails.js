import { ToastContainer,toast } from "react-toastify";
import "./Userdetails.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch,faEdit, faTrash  } from '@fortawesome/free-solid-svg-icons';
import "./Userdetailtable.css";
import { useEffect, useState } from "react";
import axios from 'axios';

export default function Userdetails()
{
  let[title,settitle]=useState("");
  let[amount,setamount]=useState("");
  let[category,setcategory]=useState("");
  let[transcation,settranscation]=useState("");
  let[description,setdescription]=useState("");
  let[date,setdate]=useState("");
  let[expenseslist,setexpenseslist]=useState([]);
  let[statusupdates,setstatusupdates]=useState(0);
 let[updateid,setupdateid]=useState(false);
let[expenseid,setexpenseid]=useState(null);
let[selectdate,setselectdate]=useState("");

let updateexpenses = (expense) => {

  
   setexpenseid(expense._id);
    settitle(expense.title);
    setamount(expense.amount);
    setcategory(expense.category);
    settranscation(expense.transcation);
    setdescription(expense.description);
    setdate(expense.date?.split("T")[0]); // Format date to yyyy-mm-dd
    setupdateid(true);

    // Open modal manually (optional if not using the "Add New" button)
    const modal = new window.bootstrap.Modal(document.getElementById('exampleModal'));
    modal.show();

};
let handledatechange=(datevalue)=>{
  setselectdate(datevalue);
  if (datevalue === "") {
  // Fetch all records again
  fetchallexpenses();  // create a helper function to get all expenses
return;
}

    const email =localStorage.getItem("email");
    axios.post("http://localhost:3003/expensesdetail/findbydate",{
      email:email,
      date:datevalue,
    })
    .then((res)=>{
      setexpenseslist(res.data);
    })
 
}
  let addtranscation=(e)=>
  {
     e.preventDefault();
    const email =localStorage.getItem("email")
  if(title ==="")
            {
             toast.warn("please enter your title")
             return;

            }
           
           else if(amount==="")
            {
              toast.warn("please enter your amount")
              return;
            }
    
             else if(category==="")
            {
               toast.warn("please enter your category")
               return;
            }
            else if(transcation=="")
            {
              toast.warn("please enter your transcation")
            }
            else if(date==="")
            {
              toast.warn("please enter your date")
              return;
            }
            else if(description==="")
            {
              toast.warn("please enter your description")
              return;
            }
            if(updateid)
            {
axios.post("http://localhost:3003/expensesdetail/expenseupdate",{
     _id:expenseid,
      title:title,
      amount:amount,
      category:category,
      transcation:transcation,
      description:description,
      date:date.split("T")[0]
}).then((res)=>{
 toast.success(res.data.msg || "Updated", { autoClose: 2000 });

    settitle("");
    setamount("");
    setcategory("");
    settranscation("");
    setdescription("");
    setdate("");
    setupdateid(false);     // ✅ Reset update flag
    setexpenseid(null);     // ✅ Clear selected ID
    setstatusupdates("updated");

    const modal = window.bootstrap.Modal.getInstance(document.getElementById('exampleModal'));
    modal.hide();

})
            }
            else{
    axios.post("http://localhost:3003/expensesdetail/expensesadds",{
      title:title,
      amount:amount,
      category:category,
      transcation:transcation,
      description:description,
      date:date,
      email:email,
    })
    .then((res) => {
           toast.success(res.data.msg, {
                           autoClose: 2000,
                            
                         }); 
                          settitle("");
      setamount("");
      setcategory("");
      settranscation("");
      setdescription("");
      setdate("");

      // ✅ Close modal
      let modal = window.bootstrap.Modal.getInstance(document.getElementById('exampleModal'));
     modal.hide();

          setstatusupdates("added");
         
         
        });
  }
            }

const fetchallexpenses=()=> {

  const email =localStorage.getItem("email");
  axios.post("http://localhost:3003/expensesdetail/find",{
    email:email,
  })

.then((res)=>
  {

  setexpenseslist(res.data);
});

}
   useEffect(()=>{
    fetchallexpenses();
},[statusupdates])

let deleteexpenses =(_id)=>{
  axios.post("http://localhost:3003/expensesdetail/deletedata",{
                    _id:_id
  })
  .then((res)=>{
    toast.success(res.data.msg, {
                           autoClose: 2000,
                            
                         });
                          setstatusupdates("delete");
  })
}

    return(
        <div>
<ToastContainer />
       
        <div className="my-5">
            <h3>Expensesdetails</h3>
        </div>
<div className="form-align rows container">
<div className="input-block">
    <input type="date" onChange={(e)=>handledatechange(e.target.value)}/>
</div>
<div className="input-block my-4">
   <button type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#exampleModal">Add New</button>
</div>


<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Add Transcation Details</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form>
          <div class="mb-3">
            <label for="Enter the Transcation Name" class="col-form-label">Title:</label>
            <input type="text" class="form-control" id="Enter the Transcation Name" placeholder="Enter the Transcation Name"onChange={(e)=>settitle(e.target.value)} value={title}/>
          </div>
          <div class="mb-3">
            <label for="amount" class="col-form-label">Amount:</label>
            <input  type="text" class="form-control" id="amount" placeholder="Enter your Amount" onChange={(e)=>setamount(e.target.value)} value={amount}/>
          </div>
             <div class="mb-3">
            <label for="category" class="col-form-label">Category:</label>
           
                <select onChange={(e)=>setcategory(e.target.value)} value={category}>
 <option>Choose...</option>
                   <option value="Food">Food</option>  
                     <option value="Salary">Salary</option> 
                       <option value="Utilites">Utilites</option> 
                         <option value="Other">Other</option> 

                </select>
          </div>
           <div class="mb-3">
            <label for="Transcation" class="col-form-label">Transcation Type:</label>
          
             <select onChange={(e)=>settranscation(e.target.value)} value={transcation}>
                 <option>Choose...</option>
                   <option value="Expenses">Expenses</option>  
                     <option value="Credit">Credit</option> 
                       
                </select>
          </div>
            <div class="mb-3">
            <label for="Transcation" class="col-form-label">Description:</label>
            <input type="text" class="form-control" id="Transcation" placeholder="Enter Description" onChange={(e)=>setdescription(e.target.value)} value={description}/>
          </div>
           <div class="mb-3">
            <label for="Date" class="col-form-label">Date:</label>
            <input type="date" class="form-control" id="Date" onChange={(e)=>setdate(e.target.value)} value={date}/>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
       {updateid?<button  class="btn btn-primary" type="submit" onClick={addtranscation}>Update</button>:<button  class="btn btn-primary" type="submit" onClick={addtranscation}>Submit</button>} 
      </div>
    </div>
  </div>
</div>
</div>
<div className="container">

        <div className="table-responsive">
        <table className="table table-bordered table-striped table-hover">
          <thead className="thead-dark">
            <tr>
              <th>S.No</th>
              <th>Date</th>
              <th>Title</th>
              <th>Amount</th>
              <th>Type</th>
               <th>Category</th>
               <th>Action</th>
            </tr>
          </thead>
         <tbody>
            {[...expenseslist].reverse().map((d, i) => (
              <tr><td>
                {i+1}.
              </td>
                 <td>{d.date?.split("T")[0]}</td>
                <td>{d.title}</td>
                <td>{d.amount}</td>
               
                 <td>{d.transcation}</td>
               
                  <td>{d.category}</td>
              
              <td>
  <div className="d-flex gap-2">
    <button className="btn btn-sm btn-warning" onClick={ () => updateexpenses(d)}>
      <FontAwesomeIcon icon={faEdit} />
    </button>
    <button className="btn btn-sm btn-danger">
      <FontAwesomeIcon icon={faTrash} onClick={()=>deleteexpenses(d._id)}/>
    </button>
</div>
</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
         </div>
    )
}