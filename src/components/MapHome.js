import React from 'react';
import MapLoading from './MapLoading';
import {
    Map,
    GoogleApiWrapper
} from 'google-maps-react';

let MapHome = props => {
    
    return(
        <span>
            <Map google={props.google} zoom={14}>
                
            </Map>
        </span>
        );
}

export default GoogleApiWrapper({
  apiKey: (process.env.REACT_APP_GOOGLE_KEY),
  LoadingContainer: MapLoading
})(MapHome);