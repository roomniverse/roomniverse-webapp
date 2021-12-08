import React from 'react';
import { Button, Grid, Header, Loader, Segment } from 'semantic-ui-react';
import swal from 'sweetalert';
import { AutoForm, ErrorsField, HiddenField, LongTextField, SubmitField, TextField } from 'uniforms-semantic';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
// import { Link } from 'react-router-dom';
import { Requests } from '../../api/social/Requests';

const bridge = new SimpleSchema2Bridge(Requests.schema);

/** Renders the Page for editing a single document. */
class EditRequest extends React.Component {

  // On successful submit, insert the data.
  submit(data) {
    const { name, gender, location, image, description, _id, owner, gradYear, major } = data;
    if (Meteor.user().username === owner) {
      Requests.collection.update(_id, { $set: { name, gender, location, image, description, gradYear, major } },
        (error) => {
          if (error) {
            swal('Error', error.message, 'error');
          } else {
            this.setState({ location: '/#/find' });
          }
        });
    } else {
      swal('Error', 'Only owner can edit it', 'error');
    }
  }

  remove(data) {
    const { _id, owner } = data;
    if (Meteor.user().username === owner) {
      Requests.collection.remove(_id,
        (error) => {
          if (error) {
            swal('Error', error.message, 'error');
          } else {
            this.setState({ location: '/#/find' });
          }
        });
    } else {
      swal('Error', `Only ${owner} can remove`, 'error');
    }
  }

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  renderPage() {
    return (
      <div id="editrequest-page" className="page-padding">
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center">Edit Request</Header>
            <Segment>
              <AutoForm schema={bridge} onSubmit={data => this.submit(data)} model={this.props.doc}>
                <TextField name='location'/>
                <LongTextField name='description'/>
                <SubmitField value='Submit'/>
                <ErrorsField/>
                <HiddenField name='owner'/>
              </AutoForm>
            </Segment>
            <Button onClick={() => this.remove(this.props.doc)} floated='right'>Close Request</Button>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

// Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use.
EditRequest.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Stuff documents.
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
