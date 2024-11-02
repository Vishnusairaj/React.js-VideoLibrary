import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom";
import store from "../store/store";
import { useDispatch } from "react-redux";
import { addToSaveList } from "../slicers/video-slicer";


export function UseDashboard(){


    let navigate=useNavigate();
    const[cookies,setCookie,removieCookie]=useCookies('');
    const[videos,setVideos]=useState([{videoId:0,Title:'',Url:'',Likes:0,DisLikes:0,Views:0,CategoryId:0}]);
    const dispatch=useDispatch();

    function LoadVideos(){

        axios.get(`http://127.0.0.1:5000/videos`)
        .then(response=>{
            setVideos(response.data);
        })
    }
    useEffect(()=>{
        LoadVideos();
    },[store.getState().store.videosCount])


    function handleClick(){
        removieCookie('userid');
        navigate('/')

    }
    function handlesaveClick(video){
        
        dispatch(addToSaveList(video));

    }
   
    return(
        <div className="container-fluid mt-2 ">
            <h3 className="d-flex justify-content-between"><span>User  DashBoard</span><span> <button className="btn bi bi-clock-history">[ {store.getState().store.videosCount } ]</button></span> <span> {cookies['userid']}</span><button className="btn btn-danger" onClick={handleClick}>sign out</button></h3>
            <div className="my-3 d-flex flex-wrap">
                {
                    videos.map(video=>
                        <div key={video.videoId} className="card m-2 p-2 w-25">
                            <iframe src={video.Url} width="100%" height="250"></iframe>
                            <div className="card-header">
                                <h6>{video.Title}</h6>
                            </div>
                            <div className="card-footer">
                                <button className="btn bi bi-eye-fill">{video.Views}</button>
                                <button className="btn bi bi-hand-thumbs-up">{videos.Likes}</button>
                                <button className="btn bi bi-hand-thumbs-down">{videos.Dislikes}</button>
                                <button onClick={()=>handlesaveClick (video)} className="btn bi bi-floppy-fill btn">Watch Later</button>
                            </div>
                        </div>
                    )
                }

            </div>
        </div>
    )
}