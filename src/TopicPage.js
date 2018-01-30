import React, { Component } from 'react'
import {
  QueryRenderer,
  graphql
} from 'react-relay'
import environment from './createRelayEnvironment'
import TopicPageView from './TopicPageView'
const ITEMS_PER_PAGE = 20 // for initial query

const TopicPageQuery = graphql`
  query TopicPageQuery(
    $count: Int!,
    $after: String
  ) {
    viewer {
      ...TopicPageView_viewer
    }
  }
`

class TopicPage extends Component {

  render() {
    return (
      <QueryRenderer
        environment={environment}
        variables={{
          count: ITEMS_PER_PAGE,
        }}
        query={TopicPageQuery}
        render={({error, props}) => {
          if (error) {
            return <div>{error.message}</div>
          } else if (props) {
            return <TopicPageView viewer={props.viewer} />
          }
          return <div><i className="fa fa-spinner fa-spin" style={{fontSize: 36}}></i> Loading...</div>
        }}
      />
    )
  }

}

export default TopicPage