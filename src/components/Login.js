import React, {useState} from 'react';
import LoginPopup from './LoginPopup';

let Login = props => {
    
    let [showLogin, setShowLogin] = useState(false);
    
    let toggleLoginPopup = e =>  {
        setShowLogin(!showLogin);
    };
    
    let handleSuccessFullLogin = userData => {
        toggleLoginPopup();
        let loginData = userData.login;
        props.setLoggedInUser(loginData);
    }
    
    return (
        <div>
            {showLogin &&
                <LoginPopup toggleLoginPopup={toggleLoginPopup} handleSuccessFullLogin={handleSuccessFullLogin} />   
            }
            <button onClick={toggleLoginPopup}>
                Login
            </button>
        </div>
        );
}

export default Login;