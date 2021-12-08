import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import 'semantic-ui-css/semantic.css';
import { Roles } from 'meteor/alanning:roles';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Landing from '../pages/Landing';
import Hub from '../pages/Hub';
import Find from '../pages/FindRoommate';
import Profile from '../pages/UserProfile';
import NotFound from '../pages/NotFound';
import Signin from '../pages/Signin';
import Signup from '../pages/Signup';
import Signout from '../pages/Signout';
import EditProfile from '../pages/EditProfile';
import AddPost from '../pages/AddPost';
import SearchResults from '../pages/SearchResults';
import CreateProfile from '../pages/CreateProfile';
import AddRequest from '../pages/AddRequest';
import EditRequest from '../pages/EditRequest';

/** Top-level layout component for this application. Called in imports/startup/client/startup.jsx. */
class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="page-container">
          <NavBar/>
          <div className="content-wrap white-theme">
            <Switch>
              <Route exact path="/" component={Landing}/>
              <Route path="/signin" component={Signin}/>
              <Route path="/signup" component={Signup}/>
              <Route path="/signout" component={Signout}/>
              <ProtectedRoute path="/create" component={CreateProfile}/>
              <ProtectedRoute path="/hub" component={Hub}/>
              <ProtectedRoute path="/add" component={AddPost}/>
              <ProtectedRoute path="/search/:query" component={SearchResults}/>
              <ProtectedRoute path="/find" component={Find}/>
              <ProtectedRoute path="/addrequest/:_id" component={AddRequest}/>
              <ProtectedRoute path="/edit/:_id" component={EditRequest}/>
              <ProtectedRoute path="/profile/:_id" component={Profile}/>
              <ProtectedRoute path="/editprofile/:_id" component={EditProfile}/>
              <ProtectedRoute path="/addpost" component={AddPost}/>
              <ProtectedRoute path="/create" component={CreateProfile}/>
              <Route component={NotFound}/>
            </Switch>
          </div>
          <Footer/>
        </div>
      </Router>
    );
  }
}

/**
 * ProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const isLogged = Meteor.userId() !== null;
      return isLogged ?
        (<Component {...props} />) :
        (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
        );
    }}
  />
);

/**
 * AdminProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login and admin role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const AdminProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const isLogged = Meteor.userId() !== null;
      const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
      return (isLogged && isAdmin) ?
        (<Component {...props} />) :
        (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
        );
    }}
  />
);

// Require a component and location to be passed to each ProtectedRoute.
ProtectedRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  location: PropTypes.object,
};

// Require a component and location to be passed to each AdminProtectedRoute.
AdminProtectedRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  location: PropTypes.object,
};

export default App;
