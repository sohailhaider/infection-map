import React from 'react';

const inputStyle = {height: "30px", fontSize:"20px", marginTop:"20px", paddingLeft:"5px", paddingRight:"5px"};
const loginStyle = {height: "50px", fontSize:"20px", marginTop:"20px", paddingLeft:"5px", paddingRight:"5px", cursor:"pointer"};

let LoginPopup = props => {

        
    
    return (
        <div className="overlay">
            <span className="login-body">
                <h2>
                    Login
                </h2>
                <hr />
                <input type="text" placeholder="Email" style={inputStyle} />
                <br />
                <input type="password" placeholder="Password" style={inputStyle}  />
                <br />
                <button style={loginStyle}>Proceed Login</button>
                <br/><br/>
                <a href="#" onClick={props.toggleLoginPopup}>Cancel</a>
            </span>
        </div>
        )
};

export default LoginPopup;