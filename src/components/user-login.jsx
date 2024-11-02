import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";


export function Userlogin(){

    const[cookie,setCookie,removieCookie]=useCookies();

    const navigate=useNavigate();

    let formik=useFormik({
        initialValues:{
            UserId:'',
            UserName:'',
            Password:''
        },
        onSubmit:(user)=>{
            axios.get(`http://127.0.0.1:5000/users`)
            
            .then(response=>{
                var result = response.data.find(item=>item.UserId===user.UserId);
                if(result){
                    if(user.Password===result.Password){
                        setCookie('userid',user.UserId)
                        navigate('/user-dashboard');

                    }else{
                        alert('Invalid Password');
                    }
                }else{
                    alert('Invalid userId');
                }
            })
        }
    })
    return(
        <div>
            <form onSubmit={formik.handleSubmit} >
                <h3 >User Login</h3>
                <dl>
                    <dt>User Login</dt>
                    <dd><input type="text" name="UserId" onChange={formik.handleChange}/></dd>
                    <dt>Password</dt>
                    <dd><input type="password" name="Password" onChange={formik.handleChange}/></dd>
                </dl>
                <button  type="submit" className="btn btn-warning">Login</button>

            </form>
            <Link to="/user-register">New User Register</Link>
        </div>
    )
}