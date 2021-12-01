import React from 'react';
import { Container, Header, Loader } from 'semantic-ui-react';
import { escapeRegExp, filter } from 'lodash';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Users } from '../../api/user/User';
import User from '../components/User';
import { Link } from 'react-router-dom';

class SearchResults extends React.Component {
  filter(value) {
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
    const results = filter(this.props.users, isMatch)
    return (
      <Container>
        <Header as="h2" textAlign="center">Search Results for {this.props.value}</Header>
        <hr />
        {results.map((user) => (
          <Link to='/profile'>
            <User user={user}/>
          </Link>
        ))}
      </Container>
    );
  }
}

SearchResults.propTypes = {
  value: PropTypes.string,
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
