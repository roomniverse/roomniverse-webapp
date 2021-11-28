import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, LongTextField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Users } from '../../api/user/User';
import { Requests } from '../../api/social/Requests';

// import { Link } from 'react-router-dom';

const formSchema = new SimpleSchema({
  firstName: String,
  lastName: String,
  gender: {
    type: String,
    allowedValues: ['Male', 'Female', 'Other'],
  },
  location: String,
  image: String,
  description: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class AddRequest extends React.Component {

  submit(data, formRef) {
    const { location, description } = data;
    const firstName = this.props.users.firstName;
    const lastName = this.props.users.lastName;
    const gender = this.props.users.gender;
    const image = this.props.users.image;
    const owner = Meteor.user().username;
    const contactId = Meteor.userId();
    Requests.collection.insert({ firstName, lastName, gender, location, image, description, owner, contactId },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          // eslint-disable-next-line no-undef
          swal('Success', 'Item added successfully', 'success').then(function () { window.location = '/#/find'; });
          formRef.reset();
        }
      });
  }

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  // render() {
  //   return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  // }

  // Render the page once subscriptions have been received.
  render() {
    let fRef = null;
    return (
      <div className="white-theme find-roommate">
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center">Add Request 1{this.props.users.firstName}1</Header>
            <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)}>
              <Segment>
                <TextField name='location'/>
                <LongTextField name='description'/>
                <SubmitField value='Submit'/>
                <ErrorsField/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
// Require an array of Stuff documents in the props.
AddRequest.propTypes = {
  users: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Users.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents
  const users = Users.collection.find({}).fetch();
  return {
    users,
    ready,
  };
})(AddRequest);
