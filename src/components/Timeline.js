import React, { useState } from 'react';
import { withApollo, useMutation } from 'react-apollo';
import { ADD_VISIT_MUTATION, ADD_LOCATION_MUTATION, ADD_DURATION_MUTATION } from '../graphql/Visit.graphql';
import { Redirect } from "react-router-dom";
import { useAlert } from 'react-alert'
var moment = require('moment');

let Timeline = props => {
    const alert = useAlert();
    let selectedPlaces = [];
    
    let [isCompleted, setIsCompleted] = useState(false);
    
    const [addVisitMutation] = useMutation(ADD_VISIT_MUTATION);
    const [addLocationMutation] = useMutation(ADD_LOCATION_MUTATION);
    const [addDurationMutation] = useMutation(ADD_DURATION_MUTATION);
    
    const handleTogglePlaceSelection = place => {
        let index = selectedPlaces.indexOf(place);
        if(index > -1) {
            selectedPlaces.splice(index, 1);
        } else {
            selectedPlaces.push(place);
        }
    }
    
    const handleShare = async e => {
        if(selectedPlaces.length === 0) {
            alert.error("Please select at least 1 place from table belove to share.");
        }
        console.log(selectedPlaces);
        await Promise.all(
            selectedPlaces.map(async visitedPlace => {
                try {
                    let response = await addVisitMutation({
                        variables: {
                            placeConfidence: visitedPlace.placeVisit.placeConfidence, 
                      		centerLatE7: visitedPlace.placeVisit.centerLatE7, 
                      		centerLngE7: visitedPlace.placeVisit.centerLngE7, 
                      		visitConfidence: visitedPlace.placeVisit.visitConfidence
                        }
                    });
                    let visitId = response.data.addVisit.id;
                    
                    response = await addLocationMutation({
                        variables: {
                            visitId: visitId,
                            latitudeE7: visitedPlace.placeVisit.location.latitudeE7, 
                            longitudeE7: visitedPlace.placeVisit.location.longitudeE7, 
                            placeId: visitedPlace.placeVisit.location.placeId, 
                            address: visitedPlace.placeVisit.location.address, 
                            name: visitedPlace.placeVisit.location.name
                        }
                    });
                    
                    response = await addDurationMutation({
                        variables: {
                            visitId: visitId, 
                            startTimestampMs: visitedPlace.placeVisit.duration.startTimestampMs, 
                            endTimestampMs: visitedPlace.placeVisit.duration.endTimestampMs
                        }
                    })
                    
                } catch(e) {
                    alert.error(e.message.split(":").slice(-1)[0])
                }
            })
        );
        alert.success("Thanks for providing data to help the community")
        setIsCompleted(true);
    }
    return (
        <div>
            {
                isCompleted && 
                <Redirect to="/"/>
            }
            Select Visits data you want to share anynomously <button onClick={handleShare}>Share Selected Locations</button>
            <table>
                <thead>
                    <tr>
                        <td>
                            Select
                        </td>
                        <td>
                            Location
                        </td>
                        <td>
                            Duration
                        </td>
                        <td>
                            Confidence
                        </td>
                        <td>
                            Edit Confirmation
                        </td>
                    </tr>
                </thead>
                <tbody>
                    { props.timeline &&
                        props.timeline.map((visitValue, index) => {
                            return(
                                <tr>
                                    <td>
                                        <input type="checkbox" onChange={e=>handleTogglePlaceSelection(visitValue)}/>
                                    </td>
                                    <td>
                                        <ul key={index}>
                                            <li>
                                                Name: {visitValue.placeVisit.location.name}
                                            </li>
                                            <li>
                                               LatitudeE7: {visitValue.placeVisit.location.latitudeE7}, Longitude: {visitValue.placeVisit.location.longitudeE7} 
                                            </li>
                                            <li>
                                                Place ID: {visitValue.placeVisit.location.placeId}
                                            </li>
                                            <li>
                                                Address: {visitValue.placeVisit.location.address}
                                            </li>
                                            <li>
                                                Location Confidence: {visitValue.placeVisit.location.locationConfidence}
                                            </li>
                                        </ul>
                                    </td>
                                    <td>
                                        <ul>
                                            <li>
                                                Start Time: 
                                                {
                                                    moment.unix(visitValue.placeVisit.duration.startTimestampMs).format('MMM D, YYYY, HH:mmA')
                                                }
                                            </li>
                                            <li>
                                                End Time: 
                                                {
                                                    moment.unix(visitValue.placeVisit.duration.endTimestampMs).format('MMM D, YYYY, HH:mmA')
                                                }
                                            </li>
                                        </ul>
                                    </td>
                                    <td>
                                        <ul>
                                            <li>
                                                Place Confidence: {visitValue.placeVisit.placeConfidence}
                                            </li>
                                            <li>Center LatitudeE7: {visitValue.placeVisit.centerLatE7}</li>
                                            <li>Center LongitudeE7: {visitValue.placeVisit.centerLngE7}</li>
                                            <li><b>Visit Confidence: </b>{visitValue.placeVisit.visitConfidence}</li>
                                        </ul>
                                    </td>
                                    <td>
                                        <b>{visitValue.placeVisit.editConfirmationStatus}</b>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
        )
};

export default withApollo(Timeline);