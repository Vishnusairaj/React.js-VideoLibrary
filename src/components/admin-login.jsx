import axios from "axios"
import { useFormik } from "formik"
import { useState } from "react";
import { useNavigate } from "react-router-dom"


export function AdminLogin(){
    


     const navigate=useNavigate();

    const formik=useFormik({
        initialValues:{
            UserId:'',
            Password:''
        },
        onSubmit:(admin)=>{
            axios.get(`http://127.0.0.1:5000/admin`)
            
            .then(response=>{
                var user=response.data.find(item=>item.UserId===admin.UserId);
                console.log(user)
                if(user){
                    if(user.Password===admin.Password){
                        navigate('/admin-dash');

                    }else{
                        alert('Invalid Password');
                    }

                }else{
                    alert('Invalid UserId');
                }
                
            })


        }
    })
    return(
        <div>
            <h3>Admin Login</h3>
            <form className="w-25" onSubmit={formik.handleSubmit}>
                <dl>
                    <dt>Admin User Name</dt>
                    <dd><input type="text" name="UserId" className="form-control" onChange={formik.handleChange} /></dd>
                    <dt>Password</dt>
                    <dd><input type="password" name="Password" className="form-control" onChange={formik.handleChange}/></dd>
                </dl>
                <button type="Submit" className="btn btn-warning w-100">Submit</button>
            </form>
        </div>
    )
}