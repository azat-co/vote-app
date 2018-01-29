import { Link } from 'react-router-dom'
import React, { Component } from 'react';

import {
  createFragmentContainer,
  graphql,
} from 'react-relay';

import { QueryRenderer } from 'react-relay';
import environment from './createRelayEnvironment.js'

let badgeClasses = {
  'Proposal': 'secondary',
  'Draft': 'primary',
  'OnHold': 'info',
  'Rejected': 'light',
  'Published': 'success'
}


class Topic extends Component {
  render() {
    console.log(this.props.match.params.topicId)
    return (
      <QueryRenderer
        environment={environment}
        query={graphql`
          query TopicQuery ($topicId: ID!) {
            viewer {
              Topic (id: $topicId) {                 
                id
                title
                votes
                status
                description
              }
            }
          }
        `}
        variables={{
          topicId: this.props.match.params.topicId
        }}
        render={({ error, props }) => {
          if (error) {
            return <div>Error!</div>;
          }
          if (!props) {
            return <div>Loading...</div>;
          }
          console.log(props)
          const {title, description, votes, status} = props.viewer.Topic
          return <div>
            <h2>{title}</h2>
            <p>{description}</p>
            <p>Votes for this course so far: {votes}</p>
            <p>Status: {status}</p>
            <Link to="/app">Home</Link>
          </div>
        }}
      />      

    );
  }
}
export default Topic
// export default createFragmentContainer(Topic, {
//   topic: graphql`
//     fragment Topic_topic on Topic {
//       title,
//       id,
//       description,
//       votes,
//       status
//     }
//   `,
//   viewer: graphql`
//     fragment Topic_viewer on User {
//       id
//     }
//   `,
// });
