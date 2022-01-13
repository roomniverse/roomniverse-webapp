import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Header, Loader, Grid, Item } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Users } from '../../api/user/User';
import User from '../components/User';
import { Posts } from '../../api/social/Posts';
import PostEvent from '../components/PostEvent';
import { Requests } from '../../api/social/Requests';
import Request from '../components/Request';

/** Renders a page to display the Users, Posts, and Requests Collections with admin permissions. */
class AdminPage extends React.Component {

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    return (
      <div id="admin-three-lists">
        <Header as='h1'
          textAlign='center'
          style={{ padding: '20px 10px 10px 10px' }}>
              Admin Page
        </Header>
        <Grid colummns={3} celled>
          <Grid.Row>
            <Grid.Column width={3} textAlign='center'>
              <Header as='h3'>Users</Header></Grid.Column>
            <Grid.Column width={6} textAlign='center'>
              <Header as='h3'>Posts</Header></Grid.Column>
            <Grid.Column width={7} textAlign='center'>
              <Header as='h3'>Requests</Header></Grid.Column>
          </Grid.Row>
          <Grid.Row stretched>
            <Grid.Column width={3}>
              <div id="users-list-column">
                {this.props.users.map((user, index) => (
                  <div key={index} className="all-positioning">
                    <User id="admin-user" user={user}/>
                  </div>
                ))}
              </div>
            </Grid.Column>
            <Grid.Column width={6}>
              <div id="posts-list-column">
                {<div className="all-positioning">
                  {this.props.posts.slice(0).reverse().map((post) => <PostEvent
                    key={post._id}
                    post={post}
                    user={this.props.users.find((user) => user.owner === post.owner)}
                  />)}
                </div>}
              </div>
            </Grid.Column>
            <Grid.Column width={7}>
              <div id="requests-list-column">
                <Item.Group divided>
                  {this.props.requests.reverse().map((request, index) => (
                    <Request className="all-positioning" key={index} request={request}/>
                  ))}
                </Item.Group>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

// Declare the types of all properties.
AdminPage.propTypes = {
  ready: PropTypes.bool.isRequired,
  users: PropTypes.array.isRequired,
  posts: PropTypes.array.isRequired,
  requests: PropTypes.array.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to users, posts, and requests documents.
  const subscription =
      Meteor.subscribe(Users.userPublicationName)
      && Meteor.subscribe(Posts.userPublicationName)
      && Meteor.subscribe(Requests.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  const sub2 = Meteor.subscribe(Users.userPublicationName);
  const ready2 = sub2.ready();
  // Get the users, posts, and requests documents
  const users = Users.collection.find({}).fetch();
  const posts = Posts.collection.find({}).fetch();
  const requests = Requests.collection.find({}).fetch();
  return {
    users,
    posts,
    requests,
    ready: ready && ready2,
  };
})(AdminPage);
