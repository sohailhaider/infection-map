import React from 'react';
import { withApollo, useQuery, useMutation } from 'react-apollo';
import { GET_USER_VISITS_QUERY, DELETE_USER_VISITS_MUTATION } from '../graphql/User.graphql';
import { useAlert } from 'react-alert'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const MyData = props => {
    const alert = useAlert();
    const { data } = useQuery(GET_USER_VISITS_QUERY, {
        fetchPolicy: 'network-only'
    });
    
    const [deleteUserVisits] = useMutation(DELETE_USER_VISITS_MUTATION);
    const deleteAllEntries = e => {
        confirmAlert({
          title: 'Confirm to delete data',
          message: 'Are you sure to do delete data?',
          buttons: [
            {
              label: 'Yes',
              onClick: async () => {
                  await deleteUserVisits();
                  alert.success("Your entries has been delete.")
                  window.location.reload();
              }
            },
            {
              label: 'No',
              onClick: () => alert.show('We will put your data to good use :)')
            }
          ]
        });
    }
    return (
            <div>
                <h1>Information Provided by Me</h1>
                <h2>Name</h2>
                <p>{props.loggedInUser && props.loggedInUser.user.name}</p>
                <h2>Email</h2>
                <p>{props.loggedInUser && props.loggedInUser.user.email}</p>
                <h2>Entries Made</h2>
                <p>{data && data.getUserVisits.length}</p>
                
                <button onClick={deleteAllEntries}>Delet All Entries made</button>
                
                <h3>Raw data</h3>
                <pre style={{width:"700px"}}>
                    {data && JSON.stringify(data.getUserVisits)}
                </pre>
            </div>
        )
}

export default withApollo(MyData);