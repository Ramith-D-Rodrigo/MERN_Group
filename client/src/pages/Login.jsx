import {useState, useEffect} from 'react'
import { FaSignInAlt } from 'react-icons/fa';


function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const {email, password} = formData;

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name] : e.target.value
        }))
    }
    const onSubmit = (e)=>{
        e.PreventDefault();
    }

    return (
        <>
            <section className="heading">
                <h1>
                    <FaSignInAlt />Log In
                </h1>
                <p>
                    Log in to the Site
                </p>
            </section>

            <section className="form">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input type="email" className="form-control" id="email" name="email" value={email} placeholder="Enter the Email" onChange={onChange}/>
                        <input type="password" className="form-control" id="password" name="password" value={password} placeholder="Enter the Password" onChange={onChange}/>
                    </div>
                    <div className="form-group">
                        <button type="submit" className='btn btn-block'>Log In</button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default Login