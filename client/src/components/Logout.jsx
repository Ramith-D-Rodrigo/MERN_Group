function Logout(){
    window.localStorage.removeItem('isLoggedIn');
    window.localStorage.removeItem('authorToken');
    window.localStorage.removeItem('author');
    window.location.href = '/';
}

export default Logout;