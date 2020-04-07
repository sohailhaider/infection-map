import gql from 'graphql-tag';

export const LOGIN_IN_MUTATION = gql`
  mutation SignUp($email: String!, $password: String!){
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