import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Logout from './components/Logout';
import Register from './pages/Register';
import Header from './components/Header';
import Feedback from './pages/Feedback';
import Images from './pages/Images';
import Articles from './pages/Articles';
import MyArticle from './pages/MyArticle';


function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <Header/>
          <Routes>
            <Route path='/' element={<Homepage/>} />
            <Route path='/feedback' element={<Feedback/>}/>
            <Route path='/articles' element={<Articles/>}/>
            <Route path='/images' element={<Images/>}/>
            <Route path='/login' element={<Login/>} />
            <Route path='/logout' element={<Logout/>} />
            <Route path='myarticle' element={<MyArticle/>}/>
            <Route path='/register' element={<Register/>} />
          </Routes>
        </div>
      </Router>
      <ToastContainer/>
    </>
  );
}

export default App;
