import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SubmitField, TextField, SelectField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Users } from '../../api/user/User';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  firstName: String,
  lastName: String,
  gender: {
    type: String,
    allowedValues: ['Male', 'Female', 'Other'],
    defaultValue: 'Male',
  },
  major: {
    type: String,
    allowedValues: ['ICS/CENG', 'Other'],
    defaultValue: 'ICS/CENG',
  },
  gradYear: String,
  avatar: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class CreateProfile extends React.Component {

  // On submit, insert the data.
  submit(data, formRef) {
    const { firstName, lastName, gender, major, gradYear, avatar } = data;
    const _id = Meteor.userId();
    const owner = Meteor.user().username;
    Users.collection.insert({ firstName, lastName, gender, major, gradYear, avatar, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          // eslint-disable-next-line no-undef
          swal('Success', 'Item added successfully', 'success').then(function () { window.location = `/#/profile/${_id}`; });
          formRef.reset();
        }
      });
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  render() {
    let fRef = null;
    return (
      <Grid container centered>
        <Grid.Column>
          <Header as="h2" textAlign="center">Create Profile</Header>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
            <Segment>
              <TextField name='firstName'/>
              <TextField name='lastName'/>
              <SelectField name='gender'/>
              <SelectField name='major'/>
              <TextField name='gradYear'/>
              <TextField name='avatar'/>
              <SubmitField value='Submit'/>
              <ErrorsField/>
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

export default CreateProfile;
