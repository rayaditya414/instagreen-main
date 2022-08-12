import React from 'react'
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import './Header.css' 
import { useEffect, useState } from 'react';
import { Button, Input,  Modal } from '@mui/material';
import {makeStyles } from '@material-ui/core/styles';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, updateProfile } from "firebase/auth";
import ImageUpload from './ImageUpload';
function getModalStyle() {
  const top = 50; 
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
function Header({user,setUser}) {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle());
  const [open,setOpen]=useState(false);
  const [username,setUsername]=useState('');
  const [password,setPassword]=useState('');
  const [email,setEmail]=useState('');
  const [opensignin,setOpensignin]=useState(false);
  const auth=getAuth();
  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        
        setUser(user)
        // ...
      } else {
        setUser(null);
        // User is signed out
        // ...
      }
     
    });
},[user,auth,setUser])

const signUp=(event)=>{
    event.preventDefault();
    const auth=getAuth();
    if(username==""){
        alert("Username Required");
        return;
    }
    createUserWithEmailAndPassword(auth, email, password)
   .then((userCredential) => {
       updateProfile(auth.currentUser,{displayName:username})
       .then((res)=>{
            setUser(user);
       })
 })
.catch((error) => {
  alert(error.message)
});
setOpen(false);
};

const signin=(event)=>{
  event.preventDefault();
  const auth=getAuth();
  signInWithEmailAndPassword(auth, email, password)
.then((userCredential) => {
// Signed in 
const user = userCredential.user;

// ...
})
.catch((error) => {
const errorCode = error.code;
const errorMessage = error.message;
alert(errorMessage);
});
setOpensignin(false)

}
const signOut=()=>{
  getAuth().signOut()
  .catch((e)=>{
      alert(e.message);
  })
}
  return (
    <div className='header'>
       
                 <img className='header__image' 
                 src="https://toogreen.ca/instagreen/img/instagreen.svg"
                 alt="not found" />    
            
           < div className='header__search'>
                  <div className='header__searchIcon' >
                  <SearchSharpIcon  fontSize='medium'/>
                  </div>
            <div className='header__searchInput'>
                <input type="text" className='header__searchInputField' />
            </div>
           
           </div>
           <Modal
          open={open}
          onClose={()=>setOpen(false)}
       >
          <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
            <center>
              <img 
                className="app__headerImage"
                height="40px;"
                src="https://toogreen.ca/instagreen/img/instagreen.svg"
                alt=""
              />
            </center>

            <Input 
              type="text"
              placeholder={"username"}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required={true}
            /> 
            <Input 
              placeholder={"email"}
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input 
              placeholder={"password"}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" onClick={signUp} >{"Sign Up"}</Button>
          </form>
        </div>  
       </Modal>
       <Modal
          open={opensignin}
          onClose={()=>setOpensignin(false)}
       >
          <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
            <center>
              <img 
                className="app__headerImage"
                height="40px;"
                src="https://toogreen.ca/instagreen/img/instagreen.svg"
                alt=""
              />
            </center>

            <Input 
              placeholder={"email"}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input 
              placeholder={"password"}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" onClick={signin} >{"Sign in"}</Button>
          </form>
        </div>  
       </Modal>
          <div className='sign__buttons'>{

             user?
             ( <button onClick={()=>signOut(auth)}>SignOut</button> )
             :
             (
               <div className='header__buttons'>
                    <div className="signin__button">
                         <button onClick={()=>setOpen(true)}>SignUp</button>
                      </div>
                    
                     <button onClick={()=>setOpensignin(true)}>SignIn</button>  
               </div> 
             )
              
          }
    
            </div>

    </div>
  )
}

export  default Header;