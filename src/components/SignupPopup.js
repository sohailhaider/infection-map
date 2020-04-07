import React, {useState} from 'react';
import { withApollo, useMutation } from 'react-apollo';
import { SIGN_UP_MUTATION } from '../graphql/User.graphql';

const inputStyle = {height: "30px", fontSize:"20px", marginTop:"20px", paddingLeft:"5px", paddingRight:"5px"};
const loginStyle = {height: "50px", fontSize:"20px", marginTop:"20px", paddingLeft:"5px", paddingRight:"5px", cursor:"pointer"};

let SignupPopup = props => {
    
    let [signupMutation] = useMutation(SIGN_UP_MUTATION);
    let [email, setEmail] = useState('');   
    let [password, setPassword] = useState('');
    let [name, setName] = useState('');
    let [errorMsg, setErrorMsg] = useState('');

    let onSignupSubmit = async e => {
        e.preventDefault();
        
        try {
            let response = await signupMutation({
                variables: {
                    email: email,
                    password: password,
                    name: name
                }
            });
            props.handleSuccessfullSignup(response && response.data);
        } catch(e) {
            setErrorMsg(e.message.split(":").slice(-1)[0])
        }
    }
    
    return (
        <div className="overlay">
            <span className="signup-body">
                <form onSubmit={onSignupSubmit}>
                    <h1>
                        Sign Up
                    </h1>
                    <hr />
                    {
                        errorMsg !== '' &&
                        <div className="errorMsg">
                            {
                                errorMsg
                            }
                        </div>
                    }
                    <input type="text" placeholder="Name" style={inputStyle} value={name}  onChange={e=>setName(e.target.value)} required/>
                    <br />
                    <input type="email" placeholder="Email" style={inputStyle} value={email}  onChange={e=>setEmail(e.target.value)} required/>
                    <br />
                    <input type="password" placeholder="Password" style={inputStyle} value={password} onChange={e=>setPassword(e.target.value)} />
                    <br />
                    <input type="submit" style={loginStyle} />
                    <br/><br/>
                    <button onClick={props.toggleSignupPopup}>Cancel</button>
                </form>
            </span>
        </div>
        )
};

export default withApollo(SignupPopup);