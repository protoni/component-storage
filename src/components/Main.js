import React from 'react';
import {Route, Switch} from 'react-router-dom'
import Home from './Home';
import ComponentStorage from './ComponentStorage';

class Main extends React.Component {
    render () {
        return (
            
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/storage" component={ComponentStorage} />
                </Switch>
            
        )
    }
}
 

export default Main;