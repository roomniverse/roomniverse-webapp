import React from 'react';
import { Roles } from 'meteor/alanning:roles';
import { Button, Grid, Header, Loader, Segment } from 'semantic-ui-react';
import swal from 'sweetalert';
import { AutoForm, ErrorsField, HiddenField, LongTextField, SubmitField, TextField } from 'uniforms-semantic';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Redirect } from 'react-router-dom';
import { Requests } from '../../api/social/Requests';

const bridge = new SimpleSchema2Bridge(Requests.schema);

/** Renders the page for editing a single Request. */
class EditRequest extends React.Component {
  constructor(props) {
    super(props);
    this.state = { redirectToReferer: false };
  }

  // On successful submit, insert the data.
  submit(data) {
    const { name, gender, location, image, description, _id, owner, gradYear, major } = data;
    if (Meteor.user().username === owner || Roles.userIsInRole(Meteor.userId(), 'admin')) {
      Requests.collection.update(_id, { $set: { name, gender, location, image, description, gradYear, major } },
        (error) => {
          if (error) {
            swal('Error', error.message, 'error');
          } else {
            this.setState({ redirectToReferer: true });
          }
        });
    } else {
      swal('Error', 'Only owner of the request can edit', 'error');
    }
  }

  remove(data) {
    const { _id, owner } = data;
    if (Meteor.user().username === owner || Roles.userIsInRole(Meteor.userId(), 'admin')) {
      Requests.collection.remove(_id,
        (error) => {
          if (error) {
            swal('Error', error.message, 'error');
          } else {
            this.setState({ redirectToReferer: true });
          }
        });
    } else {
      swal('Error', 'Only owner of the request can close request', 'error');
    }
  }

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  renderPage() {
    const { from } = this.props.location.state || { from: { pathname: '/find' } };
    // if correct authentication, redirect to page instead of login screen
    if (this.state.redirectToReferer) {
      return <Redirect to={from}/>;
    }
    return (
      <div id="editrequest-page" className="page-padding">
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center">Edit Request</Header>
            <Segment>
              <AutoForm schema={bridge} onSubmit={data => this.submit(data)} model={this.props.doc}>
                <TextField id="editrequest-location" name='location'/>
                <LongTextField id="editrequest-description" name='description'/>
                <SubmitField id="editrequest-submit" value='Submit'/>
                <ErrorsField/>
                <HiddenField name='owner'/>
              </AutoForm>
            </Segment>
            <Button id={'editrequest-close-request'} onClick={() => this.remove(this.props.doc)} floated='right'>Close Request</Button>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

// Declare the types of all properties.
EditRequest.propTypes = {
  location: PropTypes.object,
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Requests documents.
  const subscription = Meteor.subscribe(Requests.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the document
  const doc = Requests.collection.findOne(documentId);
  return {
    doc,
    ready,
  };
})(EditRequest);
