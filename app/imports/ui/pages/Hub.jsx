import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Container, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Posts } from '../../api/social/Posts';
import PostEvent from '../components/PostEvent';

class Hub extends React.Component {
  render() {
    return (
      (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>
    );
  }

  renderPage() {
    const rend = this.props.posts;
    console.log(rend);
    return (
      <div className="white-theme hub">
        <Container id="hub-page" className="post-feed">
          <div>
            <Button id="addpost-button" fluid as={Link} to='/add'>
              Create a New Post
            </Button>
          </div>
          <div style={{ marginTop: '20px' }}>
            {rend.forEach((post) => <PostEvent key={post._id} />)}
          </div>
        </Container>
      </div>
    );
  }
}

Hub.propTypes = {
  posts: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Posts.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents
  const posts = Posts.collection.find({}).fetch();
  return {
    posts,
    ready,
  };
})(Hub);
