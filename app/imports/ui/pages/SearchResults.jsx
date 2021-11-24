import React from 'react';
import { Container, Header } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Accounts } from 'meteor/accounts-base';

class SearchResults extends React.Component {
  render() {
    return (
      <Container>
        <Header as="h2" textAlign="center">Search Results for {this.props.value}</Header>
        <hr />
        <Header as="h3" textAlign="center">No Results</Header>
      </Container>
    );
  }
}

SearchResults.propTypes = {
  users: PropTypes.array,
  value: PropTypes.object,
  location: PropTypes.object,
};

export default withTracker(() => {
  const users = Accounts.users.find({}).fetch();
  return {
    users,
  };
})(SearchResults);
