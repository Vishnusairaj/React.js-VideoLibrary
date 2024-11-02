import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";


export function DeleteVideo(){
    let navigate=useNavigate();

    let params=useParams();

    const [videos,setVideos]=useState([{videoId:0,Title:'',Url:'',Likes:0,DisLikes:0,Views:0,CategoryId:0}])


    function GetVideos(){

        axios.get(`http://127.0.0.1:5000/videos/${params.id}`)
        .then(response=>{
            setVideos(response.data);
        })
    }
    useEffect(()=>{
        GetVideos();
    })
    function DeleteClick(){
        axios.delete(`http://127.0.0.1:5000/delete-videos/${params.id}`)
        .then(response=>{
            alert("Deleted Succesfully");
            navigate("/admin-dash")
        })
    }


    return(
        <div>
            <h4>Delete Video</h4>
            <div className="card w-50">
                <div className="card-header ">
                    <h4>{videos[0].Title}</h4>
                </div>
                <div className="card-body">
                        <iframe width="100%" height="300" src={videos[0].Url}></iframe>

                </div>
                <div className="card-footer text-center">
                        <button className="btn btn-danger me-2" onClick={DeleteClick}>Yes</button>
                        <Link className="btn btn-warning" to="/admin-dash">Cancel</Link>
                </div>

            </div>
        </div>
    )
}