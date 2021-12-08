import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Container, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Posts } from '../../api/social/Posts';
import PostEvent from '../components/PostEvent';
import { Users } from '../../api/user/User';

class Hub extends React.Component {
  render() {
    return (
      (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>
    );
  }

  renderPage() {
    const rend = this.props.posts;
    return (
      <div className="white-theme hub">
        <Container id="hub-page" className="post-feed">
          <div>
            <Button id="addpost-button" fluid as={Link} to='/add'>
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
        </Container>
      </div>
    );
  }
}

Hub.propTypes = {
  posts: PropTypes.array.isRequired,
  users: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Posts.userPublicationName);
  const sub2 = Meteor.subscribe(Users.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  const ready2 = sub2.ready();
  // Get the Stuff documents
  const posts = Posts.collection.find({}).fetch();
  const users = Posts.collection.find({}).fetch();
  return {
    posts,
    users,
    ready: ready && ready2,
  };
})(Hub);
