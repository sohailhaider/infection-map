import React from 'react';
import MapHome from './MapHome';
import Upload from './Upload';

import {
    Switch,
    Route,
    Redirect
} from "react-router-dom";

let AppHome = props => {
    return (
        <div>
            <Switch>
                <Route exact path="/">
                    <MapHome />
                </Route>
                <Route exact path="/upload">
                    {
                    <Upload loggedInUser={props.loggedInUser}/>
                        // props.loggedInUser? <Upload loggedInUser={props.loggedInUser}/> : <Redirect to="/" />
                    }
                </Route>
            </Switch>
        </div>
        )
}

export default AppHome;