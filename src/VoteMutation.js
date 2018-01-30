import {
  commitMutation,
  graphql,
} from 'react-relay'
import environment from './createRelayEnvironment'
import {ConnectionHandler} from 'relay-runtime'
import storeDebugger from 'relay-runtime/lib/RelayStoreProxyDebugger'

const mutation = graphql`
  mutation VoteMutation($input: UpdateTopicInput!) {
    updateTopic(input: $input) {
      topic {
        id
        title
        description     
        votes   
      }
    }
  }
`;


export default function VoteMutation(topicId, votes, viewerId, callback) {
  const variables = {
    input: {
      id: topicId,
      votes: votes,
      clientMutationId: ""
    }
  }
  commitMutation(
    environment,
    {
      mutation,
      variables,
      onCompleted: (response) => {        
        if(!response.updateTopic) { // GraphQL back end error
          console.error('problem!')
        }
        console.log('completed')
        console.log(response)
        
        callback()
      },
      onError: err => console.error(err), // connection error
      optimisticUpdater: (proxyStore) => {
        console.log('optimistic')
        
      },
      updater: (proxyStore, data) => {
        console.log('updater')
        
      },
    },
  )
}