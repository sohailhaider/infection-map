import React from 'react';
import Login from './Login';

const HeaderStyle = {
    width: "100%",
    height: "50px"
}

let Header = props => {
    return (
        <div style={HeaderStyle}>
            <Login 
                setLoggedInUser={props.setLoggedInUser} 
                />
        </div>
        )
}

export default Header;