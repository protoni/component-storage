import React from 'react';
import {Route, Switch} from 'react-router-dom'
import Home from './Home';
import Users from './Users';
import Contact from './Contact';
import Editor from './BlogEditor';
import Blog from './Blog'

class Main extends React.Component {
    render () {
        return (
            
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/users" component={Users} />
                    <Route exact path="/contact" component={Contact} />
                    <Route exact path="/editor" component={Editor} />
                    <Route exact path="/blog" component={Blog} />
                </Switch>
            
        )
    }
}
 

export default Main;