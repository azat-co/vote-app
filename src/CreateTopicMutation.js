import {
  commitMutation,
  graphql,
} from 'react-relay'
import environment from './createRelayEnvironment'
import {ConnectionHandler} from 'relay-runtime'
import storeDebugger from 'relay-runtime/lib/RelayStoreProxyDebugger'

const mutation = graphql`
  mutation CreateTopicMutation($input: CreateTopicInput!) {
    createTopic(input: $input) {
      topic {
        id
        title
        description        
      }
    }
  }
`;

let tempID = 0;

export default function CreateTopicMutation(description, title, viewerId, status, callback) {
  const variables = {
    input: {
      description,
      title,
      status,
      clientMutationId: ""
    },
  }
  commitMutation(
    environment,
    {
      mutation,
      variables,
      onCompleted: (response) => {
        
        callback()
      },
      onError: err => console.error(err),
      optimisticUpdater: (proxyStore) => {
        // 1 - create the `newTopic` as a mock that can be added to the store
        const id = 'client:newTopic:' + tempID++
        const newTopic = proxyStore.create(id, 'Topic')
        newTopic.setValue(id, 'id')
        newTopic.setValue(description, 'description')
        newTopic.setValue(title, 'title')
        newTopic.setValue(status, 'status')

        // 2 - add `newTopic` to the store
        const viewerProxy = proxyStore.get(viewerId)
        const connection = ConnectionHandler.getConnection(viewerProxy, 'TopicPageView_allTopics')
        // console.log(connection, newTopic)
        if (connection) {
          ConnectionHandler.insertEdgeAfter(connection, newTopic)
        }
      },
      updater: (proxyStore, data) => {
        // require('RelayStoreProxyDebugger').dump(proxyStore)
        // 1 - retrieve the `newTopic` from the server response
        const createTopicField = proxyStore.getRootField('createTopic')
        const newTopic = createTopicField.getLinkedRecord('topicEdge')

        // console.log(data, newTopic, createTopicField)
        // 2 - add `newTopic` to the store
        const viewerProxy = proxyStore.get(viewerId)
        // const viewerProxy = proxyStore.getRoot()
        // console.log(viewerProxy)
        // console.log(viewerProxy, proxyStore, data, newTopic, createTopicField)
        const connection = ConnectionHandler.getConnection(viewerProxy, 'TopicPageView_allTopics')
        // const storeRoot = proxyStore.getRoot();
        // const connection = ConnectionHandler.getConnection(storeRoot, 'ListTopics_allTopics')
        console.log('conn', connection)
        // storeDebugger.dump(proxyStore)
        if (connection) {
          ConnectionHandler.insertEdgeBefore(connection, newTopic)
        }
        // storeDebugger.dump(viewerProxy)
      },
    },
  )
}