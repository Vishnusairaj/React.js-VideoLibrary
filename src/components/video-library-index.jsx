import { Link } from "react-router-dom";


export function VideoLibraryIndex(){
    return(
        <div className="d-flex align-items-center justify-content-center" style={{height:"100vh"}}>
           <div>
           <Link to="/user-login" className="btn btn-primary">User Login </Link>
           <Link  to="/admin-login" className="btn btn-warning ms-2"> Admin Login </Link>

           </div>
        </div>
    )
}

