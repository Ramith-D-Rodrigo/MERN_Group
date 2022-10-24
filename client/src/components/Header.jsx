import {FaSignInAlt, FasSignOutAlt, FaUser} from 'react-icons/fa';
import {Link} from 'react-router-dom';

function header() {
  return (
    <header className='header'>
        <div className='logo'>
            <Link to='/'>Home Page</Link>
        </div>

        <ul>
            <li>
                <Link to='/login'>
                    <FaSignInAlt/> Login
                </Link>
            </li>
            <li>
                <Link to='/register'>
                    <FaUser/> Register
                </Link>
            </li>
        </ul>
    </header>
  )
}

export default header