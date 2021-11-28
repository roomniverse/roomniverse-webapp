import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Container, Feed, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Posts } from '../../api/social/Posts';
import PostEvent from '../components/PostEvent';
import NewPost from '../components/NewPost';
import UserProfile from './UserProfile';

class SearchResults extends React.Component {
  render() {
    return (
      (this.props.ready) ? this.renderPage() : <Loader active>Getting Data</Loader>
    );
  }

  renderPage() {
    return (
      <Container>
        <Header as="h2" textAlign="center">Search Results for {this.props.children}</Header>
        <hr />
        <Header as="h3" textAlign="center">No Results</Header>
      </Container>
    );
  }
}

SearchResults.propTypes = {
  users: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const users = Meteor.users;
  // Determine if the subscription is ready
  const ready = subscription.ready();
  return {
    users,
    ready,
  };
})(SearchResults);
