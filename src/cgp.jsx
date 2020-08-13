import React from 'react';
import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux'
// import { Playground, store } from 'graphql-playground-react'
// import { HttpLink } from 'apollo-link-http';

import { Voyager } from 'graphql-voyager';

const DEFAULT_ENDPOINT = 'http://localhost:4080/services/graphql';

/**
 * Override default Apollo link in order to force credentials value to "include" in order to allow
 * cookie credentials to be passed.
 *
 * @param {*} session
 */
// function createApolloLink(session) {
//   const link = new HttpLink({
//     uri: session.endpoint,
//     headers: session.headers,
//     credentials: session.credentials
//   });

//   return { link };
// }

// class ChromeGraphqlPlayground extends React.Component {
//   render() {
//     return (
//       <Provider store={store}>
//         <Playground
//           endpoint={this.props.endpoint}
//           createApolloLink={createApolloLink}
//         />
//       </Provider>
//     );
//   }
// }

class ChromeGraphqlPlayground extends React.Component {


  introspectionProvider(query) {

    console.log('introspectionProvider query', query);

    return fetch('http://localhost:4080/services/graphql', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    }).then(response => response.json());
  }


  render() {
    return (
      // <Provider store={store}>
      //   <Playground
      //     endpoint={this.props.endpoint}
      //     createApolloLink={createApolloLink}
      //   />
      // </Provider>
      <Voyager
        introspection={this.introspectionProvider}
        displayOptions={{ skipRelay: false }}
        workerURI="public/voyager.worker.js"
      />
    );
  }
}

ReactDOM.render(
  <ChromeGraphqlPlayground endpoint={DEFAULT_ENDPOINT} />,
  document.body
);
