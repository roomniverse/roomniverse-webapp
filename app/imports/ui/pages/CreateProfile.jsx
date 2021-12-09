import React from 'react';
import { Grid, Header, Segment } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SelectField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
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
  constructor(props) {
    super(props);
    this.state = { redirect: false };
  }

  // On submit, insert the data.
  submit(data) {
    const { firstName, lastName, gender, major, gradYear, avatar } = data;
    const _id = Meteor.userId();
    const owner = Meteor.user().username;
    Users.collection.insert({ firstName, lastName, gender, major, gradYear, avatar, owner, _id },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          this.setState({ redirect: true });
        }
      });
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  render() {
    const { from } = this.props.location.state || { from: { pathname: `/profile/${Meteor.user()._id}` } };
    // if correct authentication, redirect to page instead of login screen
    if (this.state.redirect) {
      return <Redirect to={from}/>;
    }

    return (
      <div className="page-padding">
        <Grid id="createprofile-page" container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center">Create Profile</Header>
            <AutoForm schema={bridge} onSubmit={data => this.submit(data)}>
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
      </div>
    );
  }
}

CreateProfile.propTypes = {
  location: PropTypes.object,
};

export default CreateProfile;
