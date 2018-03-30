import React, { Component } from 'react';
import { Route, Switch, Redirect  } from 'react-router-dom';
import './App.css';

import HeaderBar from './components/HeaderBar.js';
import Home from './containers/Home.js';
import BrowseCompanies from './containers/BrowseCompanies.js';
import BrowsePortfolio from './containers/BrowsePortfolio';
import Login from './containers/Login.js';
import SingleCompany from './containers/SingleCompany';
import StockVisualizer from './containers/StockVisualizer';
import NotFound from './components/NotFound.js';
import AboutUs from './components/AboutUs.js';


class App extends Component {
    constructor(props){
        super(props);
        this.state = {
          userid: 116,
          isAuthenticated : false
        };
    }
    changeAuth=(bool)=>{
        this.setState({isAuthenticated :true});
    }
    
    logout=()=>{
        this.setState({isAuthenticated: false});
    }
    
    checkAuth=(component)=>{
      if (this.state.isAuthenticated){
        return component
      }else {
        return this.redirect(component)
      }
    }
    
    redirect=({ component: Component, ...rest }) => (<Route {...rest} render={props => (<Login to={{pathname: "/login",state: { from: props.location }}} auth={this.changeAuth} {...props} />) } />)
    render() {

    return (
      <div>
        {this.state.isAuthenticated?<HeaderBar logoutfn={this.logout}/>:
           null
        }
        <main >
          <Switch >
            <Route path="/" exact render={(props) => (this.checkAuth(<Home userid={this.state.userid} />))} />
            <Route path="/home" exact render={(props) => this.checkAuth(<Home userid={this.state.userid} />) }/>
            <Route path="/companies" exact render={(props) => this.checkAuth(<BrowseCompanies userid={this.state.userid}  />)}/>
            <Route path="/portfolio" exact render={(props) => this.checkAuth(<BrowsePortfolio userid={this.state.userid}  />) }/>
            <Route path="/login" exact render={(props) => (<Login userid={this.state.userid}  auth={this.changeAuth} history={this.history} from={props.location} isAuthenticated={this.state.isAuthenticated}/>) }/>
            <Route path="/company/:id" exact render={(props) => this.checkAuth(<SingleCompany {...props} userid={this.state.userid} />) }/>
            <Route path="/visualizer" exact render={(props) => this.checkAuth(<StockVisualizer  userid={this.state.userid} />) }/>
            <Route path="/aboutus" exact render={(props) => this.checkAuth(<AboutUs userid={this.state.userid} />) }/>
            <Route render={(props) => this.checkAuth(<NotFound userid={this.state.userid} />) }/>
          </Switch>
        </main>
        </div>
    );
  }
}

export default App;
//https://til.hashrocket.com/posts/z8cimdpghg-passing-props-down-to-react-router-route
