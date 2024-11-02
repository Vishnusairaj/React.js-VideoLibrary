import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";


export function AddVideo(){
    const[categories,setCategories]=useState([{CategoryId:0,CategoryName:""}]);
    const navigate=useNavigate();
    
    const formik=useFormik({
        initialValues:{
            VideoId:0,
            Title:'',
            Url:'',
            Likes:0,
            Dislikes:0,
            Views:0,
            CategoryId:0

        },
        onSubmit:(video)=>{
            axios.post('http://127.0.0.1:5000/add-videos',video)
            
            .then(()=>{
                alert("Viedo Added")
                navigate('/admin-dash');

            })
        }

    })


     function LoadCategories(){

        axios.get(`http://127.0.0.1:5000/categories`)
        .then(response=>{
            response.data.unshift({categoryId:0,categoryName:'Select Category'});
            setCategories(response.data);
        })

    }
    useEffect(()=>{
        LoadCategories();
    })
    return(
        <div className="container-fluid">
            <h2>Add New Video</h2>
            <form onSubmit={formik.handleSubmit}>
                <dl>
                    <dt>video Id</dt>
                    <dd><input type="number" name="VideoId" onChange={formik.handleChange}/></dd>
                    <dt>Title</dt>
                    <dd><input typr="text" name="Title" onChange={formik.handleChange}/></dd>
                    <dt>Url</dt>
                    <dd><input type="text" name="Url" onChange={formik.handleChange}/></dd>
                    <dt>Likes</dt>
                    <dd><input type="number" name="Likes" onChange={formik.handleChange}/></dd>
                    <dt>DisLikes</dt>
                    <dd><input type="number" name="Dislikes" onChange={formik.handleChange}/></dd>
                    <dt>Views</dt>
                    <dd><input type="number" name="Views" onChange={formik.handleChange}/></dd>
                    <dt>Category</dt>
                    <dd>
                        <select name="CategoryId">
                            {
                                categories.map(category=>
                                    <option value={category.categoryId}>{category.categoryName}</option>
                                )
                            }

                        </select>
                    </dd>
                </dl>
                <button className="btn btn-warning" type="submit">Add Videos</button>
                <Link to="/admin" className="btn btn-danger ms-2">cancel</Link>
            </form>

        </div>
    )
}