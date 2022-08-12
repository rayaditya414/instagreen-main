import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import {db} from './Firebase';
import Post from './Post';
import { collection, doc, getDocs } from "firebase/firestore";
import {onSnapshot} from "firebase/firestore";
import { query, orderBy } from "firebase/firestore"; 
import './Posts.css';
function Posts({user}) {
  const [posts,setPosts]=useState([]);
  useEffect(()=>{
    onSnapshot(query(collection(db, "Posts"),orderBy("timestamp","desc")),(snapShot)=>{
        setPosts(
         snapShot.docs.map((post)=>(
             {
               id:post.id,
               ...post.data()
             }
         ))
        )
    })
  },[])
  return ( 
    <div className='posts'>
         <div>
            {
              posts.map(({username,imageUrl,caption,id},i)=>{
                  return   ( <Post  key={id} user={user} username={username} imageUrl={imageUrl} caption={caption} postId={id}/>)
              })
            }
         </div>
      
    </div>
  )
}

export  default Posts;