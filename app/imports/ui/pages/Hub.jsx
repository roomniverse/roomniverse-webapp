import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Container, Feed, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Posts } from '../../api/social/Posts';

class Hub extends React.Component {
  render() {
    return (
      (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>
    );
  }

  renderPage() {
    return (
      <div className="white-theme hub">
        <Container className="post-feed">
          <div>
            <Button fluid as={Link} to='/add'>
              Create a New Post
            </Button>
          </div>
          <Feed>
            {this.props.posts.map((data) => <Feed.Event
                date={data.date}
                image={data.avatar}
                summary={data.summary}
                meta={data.meta}
                extraText={data.extraText}
                extraImages={data.extraImages}
              />
            )}
          </Feed>
        </Container>
      </div>
    );
  }
}

Hub.propTypes = {
  posts: PropTypes.array,
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
