import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import { VideoLibraryIndex } from './components/video-library-index';
import { AdminLogin } from './components/admin-login';
import { AdminDashboard } from './components/admin-dashboard';
import { AddVideo } from './components/add-video';
import { DeleteVideo } from './components/delect-video';
import { EditVideo } from './components/edit-video';
import { Userlogin } from './components/user-login';
import { UserRegister } from './components/user-register';
import { UseDashboard } from './components/user-dashboard';

function App() {
  return (
    <div className="container-fluid">
      <BrowserRouter>
      <header className='bg-dark text-white p-2 mt-1 text-center'>
          <h2>Video Library</h2>
      </header>
      <section>
        <Routes>
          <Route path="/" element={<VideoLibraryIndex/>}/>
          <Route path="admin-login" element={<AdminLogin/>}/>
          <Route path="admin-dash" element={<AdminDashboard/>}/>
          <Route path="add-video" element={<AddVideo/>}/>
          <Route  path="delete-video/:id"  element={<DeleteVideo/>}/>
          <Route path="edit-video/:id" element={<EditVideo/>}/>
          <Route path="user-login" element={<Userlogin/>}/>
          <Route path="user-register" element={<UserRegister/>}/>
          <Route path="user-dashboard" element={<UseDashboard/>}/>

        </Routes>


      </section>



      </BrowserRouter>

      
    </div>
  );
}

export default App;
