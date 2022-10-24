import {useState, useEffect} from 'react'
import { FaUser } from 'react-icons/fa';
import {toast} from 'react-toastify'
import axios from 'axios';

function Register() {
    const [formData, setFormData] = useState({
        name : '',
        email: '',
        password: '',
        passwordConfirm: ''
    });
    const {name, email, password, passwordConfirm} = formData;

    const onChange = (e) => {
        
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name] : e.target.value
        }))
    }

    const onSubmit = (e)=>{
        e.preventDefault();

        if(password !== passwordConfirm){
            toast.error("Passwords do not match!");
        }
        else{
            const authorData = {
                name,
                email,
                password
            }
            axios.post('/authors/register', authorData).then((res)=>{
                if(res.data.status !== 200){
                    toast.error(res.data.msg);
                }
            })
        }
    }

    return (
        <>
            <section className="heading">
                <h1>
                    <FaUser />Register
                </h1>
                <p>
                    Register at our Site to become an Author!
                </p>
            </section>

            <section className="form">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input type="text" className="form-control" id="name" name="name" value={name} placeholder="Enter Your Name Here" onChange={onChange}/>
                        <input type="email" className="form-control" id="email" name="email" value={email} placeholder="Enter Your Email Here" onChange={onChange}/>
                        <input type="password" className="form-control" id="password" name="password" value={password} placeholder="Enter a Good Password" onChange={onChange}/>
                        <input type="password" className="form-control" id="passwordConfirm" name="passwordConfirm" value={passwordConfirm} placeholder="Confirm Your Password" onChange={onChange}/>  
                    </div>
                    <div className="form-group">
                        <button type="submit" className='btn btn-block'>Register</button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default Register