import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Container, Feed, Grid, Icon, Loader, Menu } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import User from '../components/User';
import { Users } from '../../api/user/User';
import PostEvent from '../components/PostEvent';
import { Posts } from '../../api/social/Posts';

class UserProfile extends React.Component {

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    const rend = this.props.posts;
    return (
      <div className="white-theme profile">
        <Container id="userprofile-page">
          <Grid columns={3}>
            <Grid.Column width={4}>
              <User user={this.props.doc}/>
            </Grid.Column>
            <Grid.Column width={12}>
              <Menu pointing secondary borderless>
                <Menu.Item link>Posts</Menu.Item>
                <Menu.Item link>Roommate Inquires</Menu.Item>
                <Menu.Item link>User Information</Menu.Item>
              </Menu>
              <div>
                <Button id="addpost-button-profile" fluid as={Link} to='/add'>
                  Create a New Post
                </Button>
              </div>
              <div style={{ marginTop: '20px' }}>
                {rend.slice(0).reverse().map((post) => <PostEvent
                  key={post._id}
                  post={post}
                  user={this.props.users.find((user) => user.owner === post.owner)}
                />)}
              </div>
            </Grid.Column>
          </Grid>
        </Container>
      </div>
    );
  }
}

UserProfile.propTypes = {
  posts: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
  users: PropTypes.array.isRequired,
  doc: PropTypes.object,
};

export default withTracker(({ match }) => {
  const documentId = match.params._id;
  const subscription = Meteor.subscribe(Posts.userPublicationName) && Meteor.subscribe(Users.userPublicationName);
  const ready = subscription.ready();
  const posts = Posts.collection.find({}).fetch();
  const users = Users.collection.find({}).fetch();
  const doc = users.find((user) => user.owner === documentId);
  return {
    posts,
    users,
    ready,
    doc,
  };
})(UserProfile);
