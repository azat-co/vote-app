import { Link } from 'react-router-dom'
import React, { Component } from 'react';
let badgeClasses = {
  'Proposal': 'secondary',
  'Draft': 'primary',
  'OnHold': 'info',
  'Rejected': 'light',
  'Published': 'success'
}

export default class List extends Component {
  render() {
    console.log(this)
    return (
      <div>
        <h2>Topics for New Courses</h2>
        <ol>
        {this.props.topics.map((item, i)=>{
          let topic = item.node
          let badgeClass = badgeClasses[topic.status]
          return <li key={i}><Link to={`/app/topics/${topic.id}`}>{topic.title}</Link> <span className={`badge badge-${badgeClass}`}>{topic.status}</span>
           Voted: {topic.votes} {(topic.status == 'Draft' || topic.status == 'OnHold' || topic.status == 'Proposal') ?
          <input type="button" className="btn btn-info" value="upvote" />: false}
          </li>
        })}
        </ol>
      </div>
    );
  }
}