import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import { graphql, QueryRenderer } from 'react-relay';
import {Route, Link} from 'react-router'

import List from './List.js'
import Topic from './Topic.js'

import environment from './createRelayEnvironment.js'

class App extends React.Component {
  render() {
    return (
      <QueryRenderer
        environment={environment}
        query={graphql`
          query AppQuery {
            viewer {
              allTopics (first: 1000, orderBy: votes_DESC) {
                edges {
                  node {                    
                    id
                    title
                    votes
                    status
                  }
                }
              }
            }  
          }
        `}
        variables={{}}
        render={({ error, props }) => {
          if (error) {
            return <div>Error!</div>;
          }
          if (!props) {
            return <div>Loading...</div>;
          }
          return <div>
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title">Welcome to Node University New Course Vote App</h1>
            </header>
            <div className="container-fluid">
              <p className="App-intro">
                To get started, select the topic of a new course to learn more and vote.
              </p>
              <Route path='/app' exact component={() => <List topics={props.viewer.allTopics.edges} />}/>              
              <Route path='/app/topics/:topicId' exact component={Topic}/>              
            </div>
          </div>
        }}
      />
    );
  }
}



export default App;
