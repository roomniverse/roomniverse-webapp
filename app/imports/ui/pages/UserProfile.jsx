import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Grid, Loader, Input, Feed, Icon, Segment, Tab } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import User from '../components/User';
import { Users } from '../../api/user/User';
import { Requests } from '../../api/social/Requests';
import Request from '../components/Request';

class UserProfile extends React.Component {
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    const panes = [
      {
        menuItem: 'Posts',
        render: () => <Tab.Pane>hi</Tab.Pane>
      },
      {
        menuItem: 'Request',
        render: () => {
          const requests = this.props.userRequest.find((request) => request.owner === this.props.currentUser);
          return <Tab.Pane>
            <p>
              <span>Location: {requests?.location}</span>
            </p>
            <p>
              <span>Description: {requests?.description}</span>
            </p>
          </Tab.Pane>
        }
      },
      {
        menuItem: 'Random',
        render: () => <Tab.Pane>hi</Tab.Pane>
      },
    ]

    return (
        <div className="white-theme profile">
          <Container>
            <Grid columns={3}>
              <Grid.Column width={4}>
                {this.props.users.map((user) => <User key={user._id} user={user}/>)}
              </Grid.Column>
              <Grid.Column width={12}>
                <div>
                  <Tab panes={panes}/>
                </div>
              </Grid.Column>
            </Grid>
          </Container>
        </div>
    );
  }
}

UserProfile.propTypes = {
  ready: PropTypes.bool.isRequired,
  users: PropTypes.array.isRequired,
  userRequest: PropTypes.array.isRequired,
  currentUser: PropTypes.string.isRequired,
};

export default withTracker(() => {
  const subscription = Meteor.subscribe(Users.userPublicationName) && Meteor.subscribe(Requests.userPublicationName);
  const users = Users.collection.find({}).fetch();
  const userRequest = Requests.collection.find({}).fetch();
  const ready = subscription.ready();
  const currentUser = Meteor.user() ? Meteor.user().username : '';
  console.log(`this is the current user: ${currentUser}`);
  return {
    users,
    userRequest,
    currentUser,
    ready,
  };
})(UserProfile);
