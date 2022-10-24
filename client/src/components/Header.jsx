import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa';
import {Link} from 'react-router-dom';

function Header() {
    console.log(window.localStorage.getItem('isLoggedIn'));
    if(window.localStorage.getItem('isLoggedIn') === true){
        return (
            <header className='header'>
                <div className='logo'>
                    <Link to='/'>Home Page</Link>
                </div>
    
                <ul>
                {window.localStorage.getItem('isLoggedIn') ? (
                    <li>
                        <Link to='/logout'>
                            <FaSignOutAlt/> Logout
                        </Link>
                    </li>


                 ) : (
                    <li>
                        <Link to='/login'>
                            <FaSignInAlt/> Login
                        </Link>
                    </li>
                )}

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
}

export default Header