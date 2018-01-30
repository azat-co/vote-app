import React, { Component } from 'react'
import {
  createPaginationContainer,
  graphql
} from 'react-relay'


class TopicPageView extends Component {

  componentDidMount() {
  }

  render() {

    return (
      <div>
        <div>
          {this.props.viewer.allTopics.edges.map(({node}, index) => (
            <div key={node.__id} index={index} topic={node}>{JSON.stringify(node)}</div>
          ))}
        </div>
        <div className='flex ml4 mv3 gray'>
          <a  className='pointer' onClick={() => this._loadMore()}>More</a>
        </div>
      </div>
    )
  }

  _loadMore() {
    if (!this.props.relay.hasMore()) {
      console.log(`Nothing more to load`)
      return
    } else if (this.props.relay.isLoading()) {
      console.log(`Request is already pending`)
      return
    }

    this.props.relay.loadMore(10)
  }

}

export default createPaginationContainer(TopicPageView,
  {
    viewer: graphql`
      fragment TopicPageView_viewer on Viewer {
        allTopics(
          first: $count,
          after: $after,
          orderBy: description_DESC
        ) @connection(key: "TopicPageView_allTopics") {
          edges {
            node {
              id
              title
              votes
              status
            }
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    `,
  },
  {
    direction: 'forward',
    query: graphql`
      query TopicPageViewForwardQuery(
      $count: Int!,
      $after: String,
      ) {
        viewer {
          ...TopicPageView_viewer
        }
      }
    `,
    getConnectionFromProps(props) {
      return props.viewer && props.viewer.allTopics
    },
    getFragmentVariables(previousVariables, totalCount) {
      return {
        ...previousVariables,
        count: totalCount,
      }
    },
    getVariables(props, paginationInfo, fragmentVariables) {
      return {
        count: paginationInfo.count,
        after: paginationInfo.cursor,
      }
    },
  }
)