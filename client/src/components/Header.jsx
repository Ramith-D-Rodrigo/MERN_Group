import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa';
import {Link} from 'react-router-dom';
import {useState, useEffect} from 'react'
function Header() {

    const [isLoggedIn, setisLoggedIn] = useState(false);

    if(isLoggedIn === false){
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
    else{
        return (
            <header className='header'>
                <div className='logo'>
                    <Link to='/'>Home Page</Link>
                </div>
    
                <ul>
                    <li>
                        <Link to='/logout'>
                            <FaSignOutAlt/> Logout
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
}

export default Header