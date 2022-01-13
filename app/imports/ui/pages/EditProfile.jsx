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

const bridge = new SimpleSchema2Bridge(Users.schema);

/** Renders the Page for editing a single User Profile document. */
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
    const { from } = this.props.location.state || { from: { pathname: `/profile/${this.props.doc._id}` } };
    // if correct authentication, redirect to page instead of login screen
    if (this.state.redirectToReferer) {
      return <Redirect to={from}/>;
    }
    return (
      <div className="page-padding">
        <Grid id="editprofile-page" container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center">Edit Profile</Header>
            <AutoForm schema={bridge} onSubmit={data => this.submit(data)} model={this.props.doc}>
              <Segment>
                <TextField id='editprofile-first-name' name='firstName'/>
                <TextField id='editprofile-last-name' name='lastName'/>
                <SelectField name='gender'/>
                <SelectField name='major'/>
                <TextField id='editprofile-grad-year' name='gradYear'/>
                <TextField id='editprofile-avatar' name='avatar'/>
                <SubmitField id='editprofile-submit' value='Submit'/>
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

// Declare the types of all properties.
EditProfile.propTypes = {
  location: PropTypes.object,
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Users documents.
  const subscription = Meteor.subscribe(Users.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the document
  const doc = Users.collection.findOne(documentId);
  return {
    doc,
    ready,
  };
})(EditProfile);
