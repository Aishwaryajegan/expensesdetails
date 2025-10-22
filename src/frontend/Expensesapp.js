import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./Login";
import Register from "./Register";
import Layout from "./Layout";
import Userdetails from"./Userdetails";
import PrivateRoute from "./PrivateRoute";
export default function Expensesapp(){
    return(
        <div>
            <BrowserRouter>
            <Routes>
                <Route index element={<Login/>}/>
<Route path="/Register" element={<Register/>}/>
<Route path="/" element={<Layout/>}> 
<Route path="/" element={<PrivateRoute/>}>
              <Route path="/dashboard" element={<Dashboard/>}/>
<Route path="/userdetails" element={<Userdetails/>}/>
</Route>
       </Route>
            </Routes>
            </BrowserRouter>
        </div>
    )
}