import React from 'react';
import LoginSignup from './LoginSignup';
import { Link } from "react-router-dom";
import { useAlert } from 'react-alert'

const HeaderStyle = {
    width: "100%",
    height: "50px"
}

let Header = props => {
    const alert = useAlert();
    
    let handleLogOut = e => {
        alert.success("Logged out successfully");
        localStorage.removeItem('token');
        props.setLoggedInUser(null);
    }
    
    return (
        <div style={HeaderStyle}>
            <Link to="/" style={{margin: "5px"}}>Home</Link>
            {
                props.loggedInUser && 
                <span>
                    <Link to="/Upload" style={{margin: "5px"}}>
                    Upload new data
                    </Link>
                    <Link to="/me" style={{margin: "5px"}}>
                     My Information
                    </Link>
                    <button onClick={handleLogOut}>
                        Logout
                    </button>
                </span>
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