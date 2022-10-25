import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa';
import {Link} from 'react-router-dom';

function Header() {
    return (
        <header className='header'>
            <div className='logo'>
                <Link to='/'>Home Page</Link>
            </div>

            <ul>
                <li>
                    <Link to ='/articles'>
                        Author Articles
                    </Link>    
                </li>
                <li>
                    <Link to ='/images'>
                        User Images
                    </Link>    
                </li>
                <li>
                    <Link to ='/feedback'>
                        Our Feedback
                    </Link>    
                </li>
            {window.localStorage.getItem('isLoggedIn') ? (
                <>
                    <li>
                        <Link to='/createpost'>
                            Add New Post
                            </Link>
                    </li>
                    
                    <li>
                        <Link to='/logout'>
                            <FaSignOutAlt/> Logout
                        </Link>
                    </li>
                </>


            ) : (
                <>
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
                </>
            )}


            </ul>
        </header>
    )
}

export default Header