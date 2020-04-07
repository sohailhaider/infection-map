import React from 'react';
import LoginSignup from './LoginSignup';
import { Link } from "react-router-dom";

const HeaderStyle = {
    width: "100%",
    height: "50px"
}

let Header = props => {
    
    let handleLogOut = e => {
        props.setLoggedInUser(null);
    }
    
    return (
        <div style={HeaderStyle}>
            <Link to="/">Home</Link>
            {
                props.loggedInUser && 
                <div>
                    <Link to="/Upload">
                    Upload
                    </Link>
                    <button onClick={handleLogOut}>
                        Logout
                    </button>
                </div>
            }
            {
                !props.loggedInUser &&
                <LoginSignup 
                setLoggedInUser={props.setLoggedInUser} 
                />
            }
            
        </div>
        )
}

export default Header;