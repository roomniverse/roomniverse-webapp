import React from 'react';
import { Grid, Header, Loader, Segment } from 'semantic-ui-react';
import swal from 'sweetalert';
import { AutoForm, ErrorsField, HiddenField, SelectField, SubmitField, TextField } from 'uniforms-semantic';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Redirect } from 'react-router-dom';
import { Users } from '../../api/user/User';
import { Posts } from '../../api/social/Posts';

const bridge = new SimpleSchema2Bridge(Users.schema);

/** Renders the Page for editing a single document. */
class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { redirectToReferer: false };
  }

  // On successful submit, insert the data.
  submit(data) {
    const { firstName, lastName, gender, major, gradYear, avatar, _id } = data;
    Users.collection.update(_id, { $set: { firstName, lastName, gender, major, gradYear, avatar } },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          this.setState({ redirectToReferer: true });
        }
      });
  }

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  renderPage() {
    const { from } = this.props.location.state || { from: { pathname: `/profile/${this.props.user._id}` } };
    // if correct authentication, redirect to page instead of login screen
    if (this.state.redirectToReferer) {
      return <Redirect to={from}/>;
    }
    return (
      <div className="page-padding">
        <Grid id="editprofile-page" container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center">Edit Profile</Header>
            <AutoForm schema={bridge} onSubmit={data => this.submit(data)} model={this.props.user}>
              <Segment>
                <TextField name='firstName'/>
                <TextField name='lastName'/>
                <SelectField name='gender'/>
                <SelectField name='major'/>
                <TextField name='gradYear'/>
                <TextField name='avatar'/>
                <SubmitField value='Submit'/>
                <ErrorsField/>
                <HiddenField name='owner'/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

// Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use.
EditProfile.propTypes = {
  location: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
  post: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  const subscription = Meteor.subscribe(Users.userPublicationName) && Meteor.subscribe(Posts.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  return {
    ready,
  };
})(EditProfile);
