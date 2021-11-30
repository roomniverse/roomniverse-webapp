import React from 'react';
import { Segment } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Posts } from '../../api/social/Posts';
import PropTypes from 'prop-types';

class PostEvent extends React.Component {
  username = this.props.key;
  render() {
    return (
      <Segment>

      </Segment>
    );
  }
}

PostEvent.propTypes = {
  posts: PropTypes.object,
  ready: PropTypes.bool,
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
})(PostEvent);