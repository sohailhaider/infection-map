import gql from 'graphql-tag';

export const LOGIN_IN_MUTATION = gql`
  mutation Login($email: String!, $password: String!){
    login(email:$email, password:$password) {
      token,
      user {
        id,
        name,
        email
      }
    }
  }
`;
export const SIGN_UP_MUTATION = gql`
  mutation SignUp($email: String!, $password: String!, $name:String){
    signup(email:$email, password:$password, name:$name) {
      token,
      user {
        id,
        name,
        email
      }
    }
  }
`;

export const GET_USER_VISITS_QUERY = gql`
  query {
    getUserVisits {
      location {
       latitudeE7,
        longitudeE7,
        placeId,
        address,
        name
      },
      duration {
        startTimestampMs,
        endTimestampMs
      },
      placeConfidence,
      centerLatE7,
      centerLngE7,
      visitConfidence
    }
  }
`;

export const DELETE_USER_VISITS_MUTATION = gql`
  mutation {
    deleteUserVisits
  }
`;
