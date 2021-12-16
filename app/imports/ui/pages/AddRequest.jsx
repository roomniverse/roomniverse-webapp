import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid, Segment, Header, Loader } from 'semantic-ui-react';
import { AutoForm, ErrorsField, LongTextField, SubmitField, TextField, HiddenField } from 'uniforms-semantic';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Redirect } from 'react-router-dom';
import { Users } from '../../api/user/User';
import { Requests } from '../../api/social/Requests';

const bridge = new SimpleSchema2Bridge(Requests.schema);

/** Renders a page to create a new instance of the Request Collection. */
class AddRequest extends React.Component {
  constructor(props) {
    super(props);
    this.state = { redirectToReferer: false };
  }

  submit(data) {
    const { firstName, lastName, avatar, location, gender, description, major, gradYear } = data;
    const owner = Meteor.user().username;
    Requests.collection.insert({ firstName, lastName, avatar, location, gender, description, owner, major, gradYear },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          this.setState({ redirectToReferer: true });
        }
      });
  }

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    const { from } = this.props.location.state || { from: { pathname: '/find' } };
    // if correct authentication, redirect to page instead of login screen
    if (this.state.redirectToReferer) {
      return <Redirect to={from}/>;
    }
    const find = this.props.users.find((user) => user.owner === Meteor.user().username);
    return (
      <div id="addrequest-page" className="white-theme page-padding">
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center">Add Request</Header>
            <Segment>
              <AutoForm schema={bridge} onSubmit={data => this.submit(data)}>
                <TextField id="addrequest-location" name='location'/>
                <LongTextField id="addrequest-description" name='description'/>
                <SubmitField id="addrequest-submit" value='Submit'/>
                <ErrorsField/>
                <HiddenField name='firstName' value={find.firstName}/>
                <HiddenField name='lastName' value={find.lastName}/>
                <HiddenField name='gender' value={find.gender} />
                <HiddenField name='avatar' value={find.avatar}/>
                <HiddenField name='owner' value={find.owner}/>
                <HiddenField name='gradYear' value={find.gradYear}/>
                <HiddenField name='major' value={find.major}/>
              </AutoForm>
            </Segment>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

// Declare the types of all properties.
AddRequest.propTypes = {
  location: PropTypes.object,
  ready: PropTypes.bool.isRequired,
  users: PropTypes.array.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  const subscription = Meteor.subscribe(Users.userPublicationName);
  const ready = subscription.ready();
  const users = Users.collection.find({}).fetch();
  return {
    users,
    ready,
  };
})(AddRequest);
