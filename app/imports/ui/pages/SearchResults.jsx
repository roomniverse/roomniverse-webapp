import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader } from 'semantic-ui-react';
import { escapeRegExp, filter } from 'lodash';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Users } from '../../api/user/User';
import User from '../components/User';

class SearchResults extends React.Component {
  constructor(value) {
    super();
    this.value = value;
  }

  render() {
    return (
      (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>
    );
  }

  renderPage() {
    const re = new RegExp(escapeRegExp(this.value), 'i');
    const isMatch = (result) => re.test(`${result.firstName} ${result.lastName}`);
    const results = filter(this.props.users, isMatch);
    const prof = (user) => `/profile/${user._id}`;
    return (
      <Container>
        <Header as="h2" textAlign="center">Search Results for {this.value}</Header>
        <hr />
        {results.map((user) => (
          <Link to={prof(user)} key={user._id}>
            <User user={user} />
          </Link>
        ))}
      </Container>
    );
  }
}

SearchResults.propTypes = {
  users: PropTypes.array,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const subscription = Meteor.subscribe(Users.userPublicationName);
  const ready = subscription.ready();
  const users = Users.collection.find({}).fetch();
  return {
    users,
    ready,
  };
})(SearchResults);
