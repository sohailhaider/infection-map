import React, {useState} from 'react';
import { withApollo, useMutation } from 'react-apollo';
import { LOGIN_IN_MUTATION } from '../graphql/User.graphql';

const inputStyle = {height: "30px", fontSize:"20px", marginTop:"20px", paddingLeft:"5px", paddingRight:"5px"};
const loginStyle = {height: "50px", fontSize:"20px", marginTop:"20px", paddingLeft:"5px", paddingRight:"5px", cursor:"pointer"};

let LoginPopup = props => {
    
    let [loginMutation] = useMutation(LOGIN_IN_MUTATION);
    let [email, setEmail] = useState('');   
    let [password, setPassword] = useState('');
    let [errorMsg, setErrorMsg] = useState('');

    let onLoginSubmit = async e => {
        e.preventDefault();
        
        try {
            let response = await loginMutation({
                variables: {
                    email: email,
                    password: password
                }
            });
            props.toggleLoginPopup();
            console.log('response', response && response.data);
        } catch(e) {
            setErrorMsg(e.message.split(":").slice(-1)[0])
        }
    }
    
    return (
        <div className="overlay">
            <span className="login-body">
                <form onSubmit={onLoginSubmit}>
                    <h1>
                        Login
                    </h1>
                    <hr />
                    {
                        errorMsg != '' &&
                        <div className="errorMsg">
                            {
                                errorMsg
                            }
                        </div>
                    }
                    <input type="email" placeholder="Email" style={inputStyle} value={email}  onChange={e=>setEmail(e.target.value)} required/>
                    <br />
                    <input type="password" placeholder="Password" style={inputStyle} value={password} onChange={e=>setPassword(e.target.value)} />
                    <br />
                    <input type="submit" style={loginStyle} />
                    <br/><br/>
                    <a href="#" onClick={props.toggleLoginPopup}>Cancel</a>
                </form>
            </span>
        </div>
        )
};

export default withApollo(LoginPopup);