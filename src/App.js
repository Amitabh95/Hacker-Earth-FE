import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import './App.css';
import Cart from './Pages/Cart/Cart';
import LoaderComponent from './Components/Loader/Loader';

const loader = () => <LoaderComponent />
class App extends Component {

  render() {
    return (
      <div>
        <React.Suspense fallback={loader()}>
          <Switch>
            <Route path='/' exact component={Cart} />
          </Switch>
        </React.Suspense>
      </div>
    );
  }
}

export default withRouter(App);
