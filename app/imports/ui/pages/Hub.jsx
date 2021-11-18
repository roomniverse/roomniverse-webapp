import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Container, Feed, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Posts } from '../../api/social/Posts';
import PostEvent from '../components/PostEvent';
import NewPost from '../components/NewPost';

class Hub extends React.Component {
  render() {
    return (
      (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>
    );
  }

  renderPage() {
    return (
      <Container>
        <Button onClick={NewPost} fluid>Create a New Post</Button>
        <Feed events={PostEvent}/>
      </Container>
    );
  }
}

Hub.propTypes = {
  stuffs: PropTypes.array.isRequired,
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
