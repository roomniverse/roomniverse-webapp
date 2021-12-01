import React from 'react';
import { Loader, Segment } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { Posts } from '../../api/social/Posts';

class PostEvent extends React.Component {
  render() {
    return (
      (this.props.ready) ? this.renderComponent() : <Loader active>Getting data</Loader>
    );
  }

  renderComponent() {
    // const username = Accounts.user().username;
    const summary = this.props.posts.summary;
    return (
      <Segment.Group>
        <Segment content={summary} />
      </Segment.Group>
    );
  }
}

PostEvent.propTypes = {
  posts: PropTypes.array,
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
