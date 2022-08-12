import React, { useEffect, useState } from 'react'
import my_img from './WhatsApp Image 2022-02-12 at 16.57.18.jpeg'
import { Avatar } from '@mui/material';
import './Post.css'
import { addDoc, collection, doc, onSnapshot , orderBy, query, serverTimestamp} from 'firebase/firestore';
import { Button, Input } from '@mui/material';
import { db } from './Firebase';
function Post({ username, imageUrl, caption, postId ,user}) {
     const [comments, setComments] = useState([]);
     const [comment, setComment] = useState('');
     useEffect(()=>{
          if(postId){
                onSnapshot(query(collection(db,`Posts/${postId}/Comments`),orderBy("timestamp","desc")),(snapShot)=>{
                       setComments(
                       snapShot.docs.map((comment)=>(
                          {
                               id:comment.id,
                               ...comment.data()
                          }      
                       ))
                       )
                })
          }
     },[postId])
     const postComment = (e) => {
          e.preventDefault();
          console.log('button clicled! ')
          addDoc(collection(db,`Posts/${postId}/Comments`),{
                username:user.displayName,
                timestamp:serverTimestamp(),
                text:comment
          })
     }
     return (
          <div className='post__container'>
               <div className='post'>
                    <div className='post__header'>
                         <div className='header__avtar'>
                              <Avatar src={imageUrl} />
                         </div>
                         <h3 className='post__headerUsername'>
                              {username}
                         </h3>
                    </div>
                    <div className='post__imageContainer'>
                         <img src={imageUrl} className='post__image' />
                    </div>
                    {
                         caption&&(
                    <div className='post__bottom'>
                         <h1 className='post__bottomUsername'>
                              {username}
                         </h1>
                         <h1 className='post__bottomText'>
                              {caption}
                         </h1>
                    </div>)
                  }
                    <div className='post__comments'>
                       {
                         comments.map((comment) => {
                              return (
                                  <div key={comment.id}>   
                                      <strong>{comment.username} </strong>
                                      {comment.text}
                                  </div>
                                  
                              )
                         })

                    }
                      </div>
                     { user&&(
                          <div className="post__comment"> 
                                <form className='post__form'>
                                   <input type="text"
                                   className='post__input'
                                   placeholder='Add a comment...'
                                   value={comment} 
                                   onChange={(e) => setComment(e.target.value)}
                                   />                                               
                                   <button
                                   type='submit'
                                   onClick={postComment}
                                   disabled={!comment}
                              >
                                   Post
                              </button>

                            
                         </form>
                          </div>
                        
                     )
                    }
             

               </div>
             
          </div>

     )
}

export default Post