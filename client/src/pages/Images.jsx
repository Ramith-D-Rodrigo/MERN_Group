import React, {Fragment } from 'react';
import { useState, useEffect } from 'react'
import axios from 'axios';
import { toast } from "react-toastify";

function Images() {

  const [file, setFile] = useState('') 
  const [filename, setFilename] = useState('Choose File')
  const [uploadedFile, setUploadedFile] = useState()
  const [data, setData] = useState([])

  useEffect(() => {
    async function fetchData() {
      await axios.post('/authors/auth', token).then((res) => {
        axios.post('/images/' + res.data.id, formData, {
          headers: {
            'Content-Type': 'multipart//form-data'
          }
        }).then((res1) => {
          if(res1.data.status !== 200){
              toast.error("Error uploading the Image.");
          }
          else{
              toast.success("Successfully uploaded the image");
          }
        })
      })
    }

    axios.post('/authors/auth', token).then((res) => {
      axios.get('/images/' + res.data.id).then((res1) => {
        if(res1.data.status !== 200){
            toast.error("Error uploading the Image.");
        }
        else{
            toast.success("Successfully uploaded the image");
        }
      })
    })
  })
    
  const onChange = e => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0]);
  }

  const authorToken = window.localStorage.authorToken;
    const token = {
    authorToken
  }

  const onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    const res = await axios.post('/authors/auth', token).then((res) => {
      axios.post('/images/' + res.data.id, formData, {
        headers: {
          'Content-Type': 'multipart//form-data'
        }
      }).then((res1) => {
        if(res1.data.status !== 200){
            toast.error("Error uploading the Image.");
        }
        else{
            toast.success("Successfully uploaded the image");
        }
      })
    })
  }

  return (
    <Fragment>
      <form onSubmit={onSubmit}>
        <div className="input-group mb-3">
          <input type="file" className="form-control" id="inputGroupFile02" onChange={onChange}/>
        </div>
        <div className="input-group">
          <button className="btn btn-outline-secondary btn-block" type="Submit" id="inputGroupFileAddon04">Button</button>
        </div>
      </form>

      <div>
      <h1>Uploaded Images</h1>
      {
        data.map(element => {
          const base64String = btoa(
            String.fromCharCode(...new Uint8Array((element.file.data)))
          );
          return <img src={`data:image/png;base64,${base64String}`} alt=""/>
        })
      }
    </div>
    </Fragment>
  )
}

export default Images