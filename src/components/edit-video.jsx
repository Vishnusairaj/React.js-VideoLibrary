import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export function EditVideo(){
    const[categories,setCategories]=useState([{CategoryId:0,CategoryName:""}]);
    const [videos,setVideos]=useState([{VideoId:0,Title:'',Url:'',Likes:0,Dislikes:0,Views:0,CategoryId:0}])

    let params=useParams()
    let navigate=useNavigate()
   
    

    function GetVideos(){


        axios.get(`http://127.0.0.1:5000/videos/${params.id}`)
        .then(response=>{
            setVideos(response.data);
        })
    }
    function LoadCategories(){

        axios.get(`http://127.0.0.1:5000/categories`)
        .then(response=>{
            response.data.unshift({categoryId:0,categoryName:'Select Category'});
            setCategories(response.data);
        })

    }
    const formik=useFormik({
        initialValues:{
            VideoId:videos[0].VideoId,
            Title:videos[0].Title,
            Url:videos[0].Url,
            Likes:videos[0].Likes,
            Dislikes:videos[0].Dislikes,
            Views:videos[0].Views,
            CategoryId:videos[0].CategoryId

        },
        onSubmit:(video)=>{
            axios.put(`http://127.0.0.1:5000/edit-videos/${video.VideoId}`,video)
           
            .then(()=>{
                alert('Video Updates');
                navigate('/user-dash');
            })

        },
        enableReinitialize:true
         
         }
    )
    useEffect(()=>{
        LoadCategories();
        GetVideos();
        console.log(videos[0])
    })

   

    return(
        <div className="container-fluid">
            <form onSubmit={formik.handleSubmit}>
                <dl>
                    <dt>VideoId</dt>
                    <dd><input type="number" value={formik.values.VideoId} name="VideoId" onChange={formik.handleChange}/></dd>
                    <dt>Title</dt>
                    <dd><input type="text" value={formik.values.Title} name="Title" onChange={formik.handleChange}/></dd>
                    <dt>Url</dt>
                    <dd><input type="text" value={formik.values.Url} name="Url" onChange={formik.handleChange}/></dd>
                    <dt>Likes</dt>
                    <dd><input type="number" value={formik.values.Likes} name="Likes" onChange={formik.handleChange}/></dd>
                    <dt>Dislikes</dt>
                    <dd><input type="number" value={formik.values.Dislikes} name="Dislikes" onChange={formik.handleChange}/></dd>
                    <dt>Views</dt>
                    <dd><input type="number" value={formik.values.Views} name="Views" onChange={formik.handleChange}/></dd>
                    <dt>Categories</dt>
                    <dd>
                    <select name="CategoryId" value={formik.values.CategoryId} onChange={formik.handleChange}>
                            {
                                categories.map(category=>
                                    <option value={category.categoryId}>{category.categoryName}</option>
                                )
                            }

                        </select>
                    </dd>

                </dl>
                <button  type="submit" className="btn btn-success ">Save</button>
               <Link to='/admin-dash'> <button  className="btn btn-warning ms-2">cancel</button></Link>
            </form>
           
        </div>
    )


  
    
}