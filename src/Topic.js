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
    console.log(this.props.match.params.topicId)
    return (
      <div>
        <h2>Topic</h2>
        
      </div>
    );
  }
}