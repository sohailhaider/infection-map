import React, {useState} from 'react';
import MapHome from './MapHome';
import Header from './Header';

function App() {
  let [loggedInUser, setLoggedInUser] = useState(null);
  
  
  
  return (
    <div className="App">
      <Header 
        loggedInUser={loggedInUser} 
        setLoggedInUser={setLoggedInUser} 
        />

      <MapHome/>
    </div>
  );
}

export default App;
