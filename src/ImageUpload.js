import {db,storage} from './Firebase';
import { getDownloadURL, getStorage, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";
import React, { useState } from 'react'
import { Button, Input } from '@mui/material';
import Textarea from 'react-expanding-textarea'
import { collection, addDoc, serverTimestamp } from "firebase/firestore"; 
import './ImageUpload.css'
function ImageUpload({username}) {
  const [caption,setCaption]=useState('');
  const [image,setImage]=useState(null);
  const [progress,setProgress]=useState(0);
  const handleChange=(event)=>{
        if(event.target.files[0]){
            setImage(event.target.files[0])
        }
  }
  const handleUpload=()=>{
    const storageRef = ref(storage, `images/${image.name}`);

    const uploadTask = uploadBytesResumable(storageRef, image);
    
    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on('state_changed', 
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
        console.log('Upload is ' + progress + '% done');
      }, 
      (error) => {
        // Handle unsuccessful uploads
        console.log(error);
        alert(error.message);
      }, 
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            addDoc(collection(db, "Posts"),{
                   timestamp:serverTimestamp(),
                   imageUrl:downloadURL,
                   caption:caption,
                   username:username
              })
              .then(()=>{
                setProgress(0);
                setCaption("");
                setImage(null);
              })

        })
           
      }
    );  
   
  }
  return (
    <div className='image__upload'>
         <progress className="imageupload__progress" value={progress} max="100" />
        <Textarea className="imageUpload__text"type="text" placeholder={'Enter a caption...'} onChange={event => setCaption(event.target.value)} value={caption} />
         <Input type="file" onChange={handleChange}/>
         <Button onClick={handleUpload}>Upload</Button>
    </div>

  )
}

export default ImageUpload