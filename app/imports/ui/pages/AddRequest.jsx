import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid, Segment, Header, Loader } from 'semantic-ui-react';
import { AutoForm, ErrorsField, LongTextField, SubmitField, TextField, HiddenField } from 'uniforms-semantic';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
// import SimpleSchema from 'simpl-schema';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Users } from '../../api/user/User';
import { Requests } from '../../api/social/Requests';

// import { Link } from 'react-router-dom';

/* const formSchema = new SimpleSchema({
  firstName: String,
  lastName: String,
  gender: {
    type: String,
    allowedValues: ['Male', 'Female', 'Other'],
  },
  location: String,
  avatar: String,
  description: String,
}); */

const bridge = new SimpleSchema2Bridge(Requests.schema);

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class AddRequest extends React.Component {

  submit(data) {
    const { firstName, lastName, avatar, location, gender, description } = data;
    const owner = Meteor.user().username;
    Requests.collection.insert({ firstName, lastName, avatar, location, gender, description, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          // eslint-disable-next-line no-undef
          swal('Success', 'Item added successfully', 'success').then(function () { window.location = '/#/find'; });
        }
      });
  }

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    const find = this.props.users.find((user) => user.owner === Meteor.user().username);
    // let fRef = null;
    return (
      <div id="addrequest-page" className="white-theme find-roommate">
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center">Add Request</Header>
            <Segment>
              <AutoForm schema={bridge} onSubmit={data => this.submit(data)}>
                <TextField name='location'/>
                <LongTextField name='description'/>
                <SubmitField value='Submit'/>
                <ErrorsField/>
                <HiddenField name='firstName' value={find.firstName}/>
                <HiddenField name='lastName' value={find.lastName}/>
                <HiddenField name='gender' value={find.gender}/>
                <HiddenField name='avatar' value={find.avatar}/>
                <HiddenField name='owner' value={find.owner}/>
              </AutoForm>
            </Segment>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

// Require an array of Stuff documents in the props.
AddRequest.propTypes = {
  ready: PropTypes.bool.isRequired,
  users: PropTypes.array.isRequired,
};

export default withTracker(() => {
  const subscription = Meteor.subscribe(Users.userPublicationName);
  const ready = subscription.ready();
  const users = Users.collection.find({}).fetch();
  return {
    users,
    ready,
  };
})(AddRequest);
