import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux'
// import { Playground, store } from 'graphql-playground-react'
// import { HttpLink } from 'apollo-link-http';

import { Voyager } from 'graphql-voyager';

import Menu from './Menu/index.jsx';

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


  constructor(props) {

    super(props);

    const {
      endpoint,
    } = props;

    this.state = {
      ...this.state,
      loading: false,
      error: false,
      // endpoint,
    };

    this.getStorage = this.getStorage.bind(this);
    this.setStorageValue = this.setStorageValue.bind(this);
    this.getStorageValue = this.getStorageValue.bind(this);
    this.setEndpoint = this.setEndpoint.bind(this);
    this.getEndpoint = this.getEndpoint.bind(this);
    this.introspectionProvider = this.introspectionProvider.bind(this);
    this.onChangeApi = this.onChangeApi.bind(this);

    if (!this.getEndpoint()) {
      this.setEndpoint(endpoint);
    }

  }


  getStorage() {

    return global.localStorage;
  }


  setStorageValue(name, value) {

    return this.getStorage().setItem(name, value);
  }


  getStorageValue(name) {

    return this.getStorage().getItem(name);
  }


  setEndpoint(endpoint) {

    const {
      endpoint: defaultEndpoint,
    } = this.props;

    return this.setStorageValue('endpoint', endpoint || defaultEndpoint);
  }

  getEndpoint() {

    return this.getStorageValue('endpoint');
  }


  introspectionProvider(query) {

    // console.log('introspectionProvider this', this);

    // const {
    //   endpoint,
    // } = this.state;

    const endpoint = this.getEndpoint();

    // console.log('introspectionProvider query', query);

    const {
      loading,
    } = this.state;

    if (loading) {
      return;
    }

    this.setState({
      loading: true,
    });

    return fetch(endpoint, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    })
      .then(response => {

        this.setState({
          error: false,
          loading: false,
        });

        return response.json();
      })
      .catch(error => {

        this.setState({
          error: true,
          loading: false,
        });

        console.error(error);
        // alert('Ошибка загрузки схемы');
      });
  }

  onChangeApi(event) {

    const {
      target: {
        value: endpoint,
      },
    } = event;

    // this.setState({
    //   endpoint,
    // }, () => {
    //   this.forceUpdate();
    // });

    this.setEndpoint(endpoint);

    this.forceUpdate();

  }

  render() {

    const {
      // endpoint,
      error,
      loading,
    } = this.state;

    const endpoint = this.getEndpoint();

    return (
      // <Provider store={store}>
      //   <Playground
      //     endpoint={this.props.endpoint}
      //     createApolloLink={createApolloLink}
      //   />
      // </Provider>

      <Fragment>
        <Menu
          endpoint={endpoint}
          onChange={this.onChangeApi}
          error={error || false}
          disabled={!!loading}
          loading={!!loading}
        />

        <Voyager
          key={endpoint}
          introspection={this.introspectionProvider}
          displayOptions={{ skipRelay: false }}
          workerURI="public/voyager.worker.js"
        />
      </Fragment>
    );
  }
}

ReactDOM.render(
  <ChromeGraphqlPlayground endpoint={DEFAULT_ENDPOINT} />,
  document.body
);
