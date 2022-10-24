import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';


function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <Header/>
          <Routes>
            <Route path='/' element={<Homepage/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/register' element={<Register/>} />
          </Routes>
        </div>
      </Router>
      <ToastContainer/>
    </>
  );
}

export default App;
