import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, LongTextField, SubmitField, TextField, SelectField } from 'uniforms-semantic';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Requests } from '../../api/social/Requests';

// import { Link } from 'react-router-dom';

const formSchema = new SimpleSchema({
  name: String,
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
    const { name, gender, location, image, description } = data;
    const owner = Meteor.user().username;
    Requests.collection.insert({ name, gender, location, image, description, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success');
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
            <Header as="h2" textAlign="center" inverted>Add Contact</Header>
            <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)}>
              <Segment>
                <TextField name='name'/>
                <SelectField name='gender'/>
                <TextField name='location'/>
                <TextField name='image'/>
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

export default AddRequest;
