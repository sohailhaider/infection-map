import React, {useState} from 'react';
import LoginPopup from './LoginPopup';
import SignupPopup from './SignupPopup';

let LoginSignup = props => {
    
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
        localStorage.setItem('token', loginData.token);
        props.setLoggedInUser(loginData);
    }
    
    let handleSuccessfullSignup = userData => {
        toggleSignupPopup();
        let signupData = userData.signup;
        localStorage.setItem('token', signupData.token);
        props.setLoggedInUser(signupData);
    }
    
    return (
        <div>
            {showLoginPopup &&
                <LoginPopup toggleLoginPopup={toggleLoginPopup} handleSuccessFullLogin={handleSuccessFullLogin} />   
            }
            <button onClick={toggleLoginPopup}>
                Login
            </button>
            
            <button onClick={toggleSignupPopup}>
                Signup
            </button>
            {showSignupPopup &&
                <SignupPopup toggleSignupPopup={toggleSignupPopup} handleSuccessfullSignup={handleSuccessfullSignup} />   
            }
        </div>
        );
}

export default LoginSignup;