import {useState} from 'react'
import axios from 'axios';
import { toast } from "react-toastify";


function CreatePost() {

    const [formData, setFormData] = useState({
        title:'',
        content: ''
    })
    const { title, content } = formData;

    const onChange = (e) => {
        setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if(title === '' || content === ''){
            toast.error("Please enter post details");
        }
        else{
            const articleData = { 
                title,
                content
            }
    
            const authorToken = window.localStorage.authorToken;
            const token = {
                authorToken
            }
            axios.post('/authors/auth', token).then((res)=>{
                axios.post('/articles/' + res.data.id, articleData).then((res2)=>{
                    if(res2.data.status !== 200){
                        toast.error("Error creating the post.");
                    }
                    else{
                        toast.success("Successfully created the post");
                    }
                })
            })
        }

    }

    return (
        <>
        <section className="heading">
            <h1>
            Create a Post
            </h1>
        </section>

        <section className="form">
            <form onSubmit={onSubmit}>
            <div className="form-group">
                <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                placeholder="Enter the Title"
                onChange={onChange}
                value={title}
                />
                <textarea className='form-control' id='content' name='content' placeholder='Enter the content' onChange={onChange} value={content}></textarea>
            </div>
            <div className="form-group">
                <button type="submit" className="btn btn-block">
                Create Post
                </button>
            </div>
            </form>
        </section>
        </>
    )
}

export default CreatePost