import gql from 'graphql-tag';

export const ADD_VISIT_MUTATION = gql`
  mutation addVisit($placeConfidence:String, $centerLatE7:Int, $centerLngE7:Int, $visitConfidence:Float) {
    addVisit(
  		placeConfidence:$placeConfidence, 
  		centerLatE7:$centerLatE7, 
  		centerLngE7:$centerLngE7, 
  		visitConfidence: $visitConfidence) {
      id
    }
  }
`;
export const ADD_LOCATION_MUTATION = gql`
  mutation addLocation($visitId: ID!, $latitudeE7:Int, $longitudeE7:Int, $placeId: String,$address: String, $name: String) {
    addLocation(visitId:$visitId,
      latitudeE7:$latitudeE7, 
      longitudeE7: $longitudeE7, 
      placeId: $placeId, 
      address: $address, 
      name: $name) {
      	id
    }
  }
`;
export const ADD_DURATION_MUTATION = gql`
  mutation addDuration($visitId:ID!, $startTimestampMs:String, $endTimestampMs:String){
    addDuration(
      visitId:$visitId, 
      startTimestampMs: $startTimestampMs, 
      endTimestampMs: $endTimestampMs) {
      id
    }
  }
`;