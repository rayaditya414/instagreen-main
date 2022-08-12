import './App.css';
import Header from './Header';
import Posts from './Posts';
import ImageUpload from './ImageUpload';
import { useState } from 'react';

function App() { 
  const [user,setUser]=useState('');
  const handleUser=(user)=>{
     setUser(user);
  }
  return (
    <div div className="app">
          
        <div className="app__header">
              <Header user={user} setUser={handleUser}/>   
          </div>
          <div className="app__body">
             <div className='app__post'>
                 < Posts user={user}/>
            </div>
            <div className="app__right">
               {user?.displayName?
                 <ImageUpload username={user.displayName}/>
               : <div><h3>Sign In To Upload</h3></div>
               }
              </div>
            </div>
        
    </div>
  );
}

export default App;
