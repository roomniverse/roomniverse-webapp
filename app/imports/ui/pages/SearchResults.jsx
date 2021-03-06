import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Grid, Header, Loader } from 'semantic-ui-react';
import { escapeRegExp, filter } from 'lodash';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Users } from '../../api/user/User';
import User from '../components/User';

class SearchResults extends React.Component {
  render() {
    return (
      (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>
    );
  }

  renderPage() {
    const re = new RegExp(escapeRegExp(this.props.value), 'i');
    const isMatch = (result) => re.test(`${result.firstName} ${result.lastName}`);
    const results = filter(this.props.users, isMatch);
    return (
      <div className="page-padding">
        <Container id="searchresult-page">
          <Header as="h2" textAlign="center">{`Search Results for "${this.props.value}"`}</Header>
          <hr/>
          <Grid padded relaxed stackable stretched columns={3}>
            {results.map((user) => (
              <Grid.Column key={user._id}>
                <User user={user} key={user._id}/>
              </Grid.Column>
            ))}
          </Grid>
        </Container>
      </div>
    );
  }
}

SearchResults.propTypes = {
  users: PropTypes.array,
  value: PropTypes.string,
  ready: PropTypes.bool,
};

export default withTracker(({ match }) => {
  const value = match.params.query;
  const subscription = Meteor.subscribe(Users.userPublicationName);
  const ready = subscription.ready();
  const users = Users.collection.find().fetch();
  return {
    users,
    value,
    ready,
  };
})(SearchResults);
