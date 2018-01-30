import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import { graphql, QueryRenderer } from 'react-relay';
import {Link, Switch} from 'react-router-dom'
import {Route} from 'react-router'

import List from './List.js'
import Topic from './Topic.js'
import CreateTopic from './CreateTopic.js'
import TopicPage from './TopicPage.js'

import environment from './createRelayEnvironment.js'

class App extends React.Component {
  render() {
    return (
      <QueryRenderer
        environment={environment}
        query={graphql`
          query AppQuery {
            viewer {
              id
              allTopics (first: 1000, orderBy: votes_DESC) @connection(key: "TopicList_allTopics")  {
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
          console.log('tut', props)
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
                To get started, select a topic for a new course to learn more about it and vote. Or <Link to="/create-topic">propose (create) a  new topic.</Link>
              </p>
              <Switch>
                <Route path="/help" exact component={()=>'this is help'}/>
                <Route path='/create-topic' component={()=><CreateTopic environment={environment} viewerId={props.viewer.id}/>}/>              
                <Route path='/topics/:topicId' component={Topic}/>              
              </Switch>
              <List topics={props.viewer.allTopics.edges} />
              <TopicPage/>
            </div>
          </div>
        }}
      />
    );
  }
}



export default App;
