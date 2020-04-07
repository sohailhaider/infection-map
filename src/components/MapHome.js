import React from 'react';
import MapLoading from './MapLoading';
import { withApollo, useQuery } from 'react-apollo';
import { GET_ALL_VISITS_QUERY } from '../graphql/Visit.graphql';
import {
    Map,
    GoogleApiWrapper,
    Marker
} from 'google-maps-react';

let MapHome = props => {
    const { loading, error, data } = useQuery(GET_ALL_VISITS_QUERY);
    let bounds = new props.google.maps.LatLngBounds();
    if(data) {  //to Fit data
        for (let i = 0; i < data.getAllVisits.length; i++) {
          bounds.extend({
                            lat: data.getAllVisits[i].location.latitudeE7/10000000,
                            lng: data.getAllVisits[i].location.longitudeE7/10000000
                        });
        }
    }
    return(
        <span>
            <Map google={props.google} zoom={8} bounds={bounds}>
                {
                    data && 
                    data.getAllVisits.map(place=> {
                        return(
                            <Marker position={{
                                lat: place.location.latitudeE7/10000000,
                                lng: place.location.longitudeE7/10000000
                            }} name={place.location.name}/>
                        )
                    })
                }
            </Map>
        </span>
        );
}

export default withApollo(GoogleApiWrapper({
  apiKey: (process.env.REACT_APP_GOOGLE_KEY),
  LoadingContainer: MapLoading
})(MapHome));