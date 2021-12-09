import React from 'react';
import { Button, Container, Header, Loader } from 'semantic-ui-react';
import { Link, Redirect } from 'react-router-dom';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, ErrorsField, HiddenField, LongTextField, SubmitField } from 'uniforms-semantic';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Users } from '../../api/user/User';
import { Posts } from '../../api/social/Posts';

class EditPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = { redirectToReferer: false };
  }

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    const { from } = this.props.location.state || { from: { pathname: '/hub' } };
    // if correct authentication, redirect to page instead of login screen
    if (this.state.redirectToReferer) {
      return <Redirect to={from}/>;
    }

    return (

    );
  }
}

EditPost.propTypes = {
  location: PropTypes.object,
  users: PropTypes.array,
  ready: PropTypes.bool.isRequired,
  post: PropTypes.object,
}

export default withTracker(() => {
  const subscription = Meteor.subscribe(Users.userPublicationName) && Meteor.subscribe(Posts.userPublicationName);
  const ready = subscription.ready();
  const users = Users.collection.find({}).fetch();
  return {
    users,
    ready,
  };
})(EditPost);
