import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { NavLink, withRouter } from 'react-router-dom';
import { Dropdown, Image, Menu } from 'semantic-ui-react';
import { Roles } from 'meteor/alanning:roles';
import SearchBar from './SearchBar';
import { Users } from '../../api/user/User';

const nameLogo = 'https://i.ibb.co/H46VxdD/namelogo.png';
/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
class NavBar extends React.Component {
  render() {
    let uid;
    if (this.props.currentUser) {
      this.props.user.map((user) => {
        if (user.owner === this.props.currentUser) uid = user._id;
        return user;
      });
    }

    return (
      <Menu className="nav-style" attached="top" borderless>
        <Menu.Item id="navbar-hub" className="navlogocontainer" as={NavLink} activeClassName="" exact to="/hub"
          key="hub">
          <Image className="navlogo" src={nameLogo} alt="Roomniverse"/>
        </Menu.Item>
        {this.props.currentUser ? (
          <Menu.Item id="nav-search" className="navsearch">
            <SearchBar/>
          </Menu.Item>
        ) : ''}
        <Menu.Menu position="right">
          {this.props.currentUser ? (
            [<Menu.Item id="navber-find-roommate-page" as={NavLink} activeClassName="active" exact to="/find"
              key='find'>Find Roommate</Menu.Item>,
            <Menu.Item as={NavLink} id="nav-userprofile" activeClassName="active" exact
              to={`/profile/${uid}`} key='profile'>User
                Profile</Menu.Item>]
          ) : ''}
          {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
            <Menu.Item as={NavLink} id="navbar-admin" activeClassName="active" exact to="/admin" key='admin'>Admin</Menu.Item>
          ) : ''}
          <Menu.Item>
            {this.props.currentUser === '' ? (
              <Dropdown id="login-dropdown" text="Login" pointing="top right" icon={'user'} style={{ color: 'white' }}>
                <Dropdown.Menu>
                  <Dropdown.Item id="login-dropdown-sign-in" icon="user" text="Sign In" as={NavLink} exact
                    to="/signin"/>
                  <Dropdown.Item id="login-dropdown-sign-up" icon="add user" text="Sign Up" as={NavLink} exact
                    to="/signup"/>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Dropdown id="navbar-current-user" text={this.props.currentUser} pointing="top right" icon={'user'}>
                <Dropdown.Menu>
                  <Dropdown.Item id="navbar-sign-out" icon="sign out" text="Sign Out" as={NavLink} exact
                    to="/signout"/>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}

// Declare the types of all properties.
NavBar.propTypes = {
  currentUser: PropTypes.string,
  user: PropTypes.array,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
const NavBarContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
  subscription: Meteor.subscribe(Users.userPublicationName),
  user: Users.collection.find({}).fetch(),
}))(NavBar);

// Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter
export default withRouter(NavBarContainer);
