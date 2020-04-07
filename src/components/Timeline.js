import React from 'react';
var moment = require('moment');

let Timeline = props => {
    return (
        <div>
            Select Visits data you want to share anynomously 
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
                            console.log(visitValue)
                            return(
                                <tr>
                                    <td>
                                        <input type="checkbox" />
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

export default Timeline;