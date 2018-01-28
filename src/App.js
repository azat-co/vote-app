import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {graphql, QueryRenderer} from 'react-relay';

import environment from './createRelayEnvironment.js'

class App extends React.Component {
  render() {
    return (
      <QueryRenderer
        environment={environment}
        query={graphql`
          query AppQuery {
            viewer {
              allTopics (first: 1000) {
                edges {
                  node {                    
                    id
                    title
                  }
                }
              }
            }  
          }
        `}
        variables={{}}
        render={({error, props}) => {
          if (error) {
            return <div>Error!</div>;
          }
          if (!props) {
            return <div>Loading...</div>;
          }
          return <div>
             {props.viewer.allTopics.edges}
          </div>;
        }}
      />
    );
  }
}

class Hello extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
