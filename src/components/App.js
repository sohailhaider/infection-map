import React, {useState} from 'react';
import AppHome from './AppHome';
import Header from './Header';
import {
    BrowserRouter
} from "react-router-dom";

function App() {
  let [loggedInUser, setLoggedInUser] = useState(null);
  
  
  
  return (
    <div className="App">
      <BrowserRouter>
        <Header 
          loggedInUser={loggedInUser} 
          setLoggedInUser={setLoggedInUser} 
          />
        <AppHome loggedInUser={loggedInUser}/>
      </BrowserRouter>
    </div>
  );
}

export default App;
