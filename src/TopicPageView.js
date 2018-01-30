import React, { Component } from 'react'
import {
  createPaginationContainer,
  graphql
} from 'react-relay'
import { Link } from 'react-router-dom'
import VoteMutation from './VoteMutation.js'

let badgeClasses = {
  'Proposal': 'secondary',
  'Draft': 'primary',
  'OnHold': 'info',
  'Rejected': 'light',
  'Published': 'success'
}
class TopicPageView extends Component {
  state = {
    showSpinner: false
  }
  componentDidMount() {
     window.onscroll = (ev) => { // infinite automatic scroll
      //  console.log(ev)
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight -20) {
         console.log("bottom", this);
         this._loadMore()
      }
    };
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <div>
          <h2>Topics for New Courses</h2>
          <ol>
          {this.props.viewer.allTopics.edges.map(({node}, index) => {
            const {title, description, votes, status} = node
            let topic = node
            let badgeClass = badgeClasses[topic.status]
          return (            
            <li key={index}><Link to={`/topics/${topic.id}`}>{topic.title}</Link> <span className={`badge badge-${badgeClass}`}>{topic.status}</span>
              Voted: {topic.votes} {(topic.status == 'Draft' || topic.status == 'OnHold' || topic.status == 'Proposal') ?
            <input type="button" className="btn btn-info" value="upvote" onClick={()=>this._upvote(topic.id, votes)} />: false}
            </li>
          )}
        )}
        </ol>
        </div>
        {(!this.props.relay.hasMore())? <div/>:
        <div className='flex ml4 mv3 gray'>
          <a className='pointer btn btn-success'  onClick={() => this._loadMore()}>
          {(this.state.showSpinner)? <i className='fa fa-spinner fa-spin'></i>: false} Show More</a>
        </div>
        }
      </div>
    )
  }
  _upvote(id, votes) {
    VoteMutation(id, ++votes, null, ()=>{

    })
  }
  _loadMore() {
    if (!this.props.relay.hasMore()) {
      console.log(`Nothing more to load`)
      return
    } else if (this.props.relay.isLoading()) {
      console.log(`Request is already pending`)
      return
    }
    this.setState({showSpinner: true})
    this.props.relay.loadMore(10, ()=>{
      this.setState({showSpinner: false})
    }) // for show more
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
            hasPreviousPage
            startCursor
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
      console.log(props)
      return props.viewer && props.viewer.allTopics
    },
    getFragmentVariables(previousVariables, totalCount) {
      return {
        ...previousVariables,
        count: totalCount,
      }
    },
    getVariables(props, paginationInfo, fragmentVariables) {
      console.log(paginationInfo)
      return {
        count: paginationInfo.count,
        after: paginationInfo.cursor,
      }
    },
  }
)