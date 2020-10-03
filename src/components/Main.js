import React from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';
import Home from './Home';
import ComponentStorage from './ComponentStorage';
import StorageItem from './StorageItem';

class Main extends React.Component {
  render() {
    return (
      <div data-testid="Main" >
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/storage" component={ComponentStorage} />
          <Route exact path="/storage-item/:id" component={StorageItem} />
        </Switch>
      </div>
    );
  }
}

export default Main;
