import React, {useState} from 'react';
import LoginPopup from './LoginPopup';

let Login = props => {
    
    let [showLogin, setShowLogin] = useState(false);
    
    let toggleLoginPopup = e =>  {
        setShowLogin(!showLogin);
    };
    
    return (
        <div>
            {showLogin &&
                <LoginPopup toggleLoginPopup={toggleLoginPopup} />   
            }
            <button onClick={toggleLoginPopup}>
                Login
            </button>
        </div>
        );
}

export default Login;