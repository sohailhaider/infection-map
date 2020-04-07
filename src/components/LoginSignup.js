import React, {useState} from 'react';
import LoginPopup from './LoginPopup';
import SignupPopup from './SignupPopup';
import { useAlert } from 'react-alert'

let LoginSignup = props => {
    const alert = useAlert();
    
    let [showLoginPopup, setShowLoginPopup] = useState(false);
    let [showSignupPopup, setShowSignupPopup] = useState(false);
    
    let toggleLoginPopup = e =>  {
        setShowLoginPopup(!showLoginPopup);
    };
    let toggleSignupPopup = e =>  {
        setShowSignupPopup(!showSignupPopup);
    };
    
    let handleSuccessFullLogin = userData => {
        toggleLoginPopup();
        let loginData = userData.login;
        alert.success("User logged in.")
        localStorage.setItem('token', loginData.token);
        props.setLoggedInUser(loginData);
    }
    
    let handleSuccessfullSignup = userData => {
        toggleSignupPopup();
        let signupData = userData.signup;
        alert.success("Signup success, logging in...")
        localStorage.setItem('token', signupData.token);
        props.setLoggedInUser(signupData);
    }
    
    return (
        <div>
            {showLoginPopup &&
                <LoginPopup toggleLoginPopup={toggleLoginPopup} handleSuccessFullLogin={handleSuccessFullLogin} />   
            }
            <button onClick={toggleLoginPopup}>
                Login to upload your data
            </button>
            
            <button onClick={toggleSignupPopup} style={{marginLeft:"5px"}}>
                Signup
            </button>
            {showSignupPopup &&
                <SignupPopup toggleSignupPopup={toggleSignupPopup} handleSuccessfullSignup={handleSuccessfullSignup} />   
            }
        </div>
        );
}

export default LoginSignup;