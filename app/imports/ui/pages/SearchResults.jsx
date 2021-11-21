import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Accounts } from 'meteor/accounts-base';

class SearchResults extends React.Component {
  render() {
    return (
      (this.props.ready) ? this.renderPage() : <Loader active>Getting Data</Loader>
    );
  }

  renderPage() {
    return (
      <Container>
        <Header as="h2" textAlign="center">Search Results for {this.state}</Header>
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
  const subscription = Meteor.subscribe(Accounts.users);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  const users = Accounts.findUserByUsername({});
  return {
    users,
    ready,
  };
})(SearchResults);
