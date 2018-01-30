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
        console.log(response)
        callback()
      },
      onError: err => console.error(err),
      optimisticUpdater: (proxyStore) => {

      },
      updater: (proxyStore, data) => {

      },
    },
  )
}