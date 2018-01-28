import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import { graphql, QueryRenderer } from 'react-relay';
import {Link} from 'react-router-dom'
import {Route} from 'react-router'

import List from './List.js'
import Topic from './Topic.js'
import CreateTopic from './CreateTopic.js'

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
                To get started, select a topic for a new course to learn more about it and vote. Or <Link to="/app/create">propose (create) a  new topic.</Link>
              </p>
              <Route path='/app' exact component={() => <List topics={props.viewer.allTopics.edges} />}/>              
              <Route path='/app/create'  exact component={CreateTopic}/>              
              <Route path='/app/topics/:topicId' exact component={Topic}/>              
            </div>
          </div>
        }}
      />
    );
  }
}



export default App;
