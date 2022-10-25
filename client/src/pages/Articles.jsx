import axios from 'axios';
import {useState, useEffect} from 'react';
import { toast } from 'react-toastify';

function Articles() {
    const [articleData, setArticleData] = useState([]);

    useEffect(() => {
        axios.get('/articles').then((res)=>{
            if(res.data.status !== 200){
                toast.error("Oops! Something is not right. Please try again later");
            }
            else{
                setArticleData(res.data.articles);
            }
        })
    }, [])

    const getMyArticle = (e) =>{
        e.preventDefault();
        console.log(e.target.value);
        axios.get('/articles/'+e.target.value).then((res)=>{
            if(res){
                //console.log(JSON.stringify(res.data.article));
                localStorage.setItem("articleData", JSON.stringify(res.data.article));
                window.location.href ='/myarticle';
            }
        })
    }

    const arr = articleData.map((data,index) =>{
        return(
            <tr>
                <td>{data.title}</td>
                <td>{data.author}</td>
                <td>{data.likes.length}</td>
                <td><button className='btn' onClick={getMyArticle} value={data._id}>View Full</button></td>
            </tr>
        )
    })

    return(
        <div>
            <table>
                <tbody>
                    <tr>
                        <th>
                            Title
                        </th>
                        <th>
                            Author
                        </th>
                        <th>
                            Likes
                        </th>
                        <th>
                            Action
                        </th>
                    </tr>
                    {arr}
                </tbody>
            </table>
        </div>
    )
}

export default Articles