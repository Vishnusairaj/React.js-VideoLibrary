import axios from "axios";
import { useFormik } from "formik";
import { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";


export function UserRegister(){

    let navigate=useNavigate();
    const[status,setStatues]=useState('');
    const[errorClass,setErrorClass] = useState('');

    const formik=useFormik({
        initialValues:{
            UserId:'',
            UserName:'',
            Password:'',
            Email:'',
            Mobile:''


        },
        onSubmit:useCallback((user)=>{
            axios.post(`http://127.0.0.1:5000/register-user`,user)
            .then(()=>{
                alert('Registered Successfully..');
                navigate("/user-login");
            })
        },[])

    })
    function verifyUser(e){
        axios.get(`http://127.0.0.1:5000/users`)
        .then(response=>{
            var user=response.data.find(item=>item.UserId===e.target.value);
            if(user){
                setStatues("User already taken");
                setErrorClass('text-danger')

            }else{
                setStatues("User Available");
                setErrorClass('text-success')
            }
        })
        
    }
    return(
        <div>
            <form onSubmit={formik.handleSubmit}>
                <h2>Register User</h2>
                <dl>
                    <dt>UserId</dt>
                    <dd><input type="text" name="UserId" onChange={formik.handleChange} onKeyUp={verifyUser}/></dd>
                    <dd className={errorClass}>{status}</dd>
                    <dt>User Name</dt>
                    <dd><input type="text" name="UserName" onChange={formik.handleChange}/></dd>
                    <dt>Password</dt>
                    <dd><input type="Password" name="password" onChange={formik.handleChange}/></dd>
                    <dt>Email</dt>
                    <dd><input type="email" name="Email" onChange={formik.handleChange}/></dd>
                    <dt>Mobile</dt>
                    <dd><input type="text" name="Mobile" onChange={formik.handleChange}/></dd>
                </dl>
                <button className="btn btn-primary">Register</button>
            </form>
            <Link to="/user-login">Existing User ?</Link>
        </div>
    )
}