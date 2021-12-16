import React from 'react';
import { Button, Container, Header, Loader } from 'semantic-ui-react';
import { Link, Redirect } from 'react-router-dom';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, ErrorsField, HiddenField, LongTextField, SubmitField } from 'uniforms-semantic';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Users } from '../../api/user/User';
import { Posts } from '../../api/social/Posts';

const bridge = new SimpleSchema2Bridge(Posts.schema);

/** Renders a page to create a new instance of the Post Collection. */
class AddPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = { redirectToReferer: false };
  }

  submit(data) {
    if (!data.extraText && !data.extraImages) {
      swal('Error', 'Please upload images or write something.', 'error');
    } else {
      Posts.collection.insert(data,
        (error) => {
          if (error) {
            swal('Error', error.message, 'error');
          } else {
            this.setState({ redirectToReferer: true });
          }
        });
    }
  }

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    const { from } = this.props.location.state || { from: { pathname: '/hub' } };
    // if correct authentication, redirect to page instead of login screen
    if (this.state.redirectToReferer) {
      return <Redirect to={from}/>;
    }

    const account = this.props.users.find((user) => user.owner === Meteor.user().username);
    const avatar = account.avatar;
    const date = new Date().getTime();
    const summary = 'posted to their page';
    const meta = 0;
    const owner = account.owner;
    return (
      <div id="addpost-page" className="white-theme page-padding">
        <Container>
          <Header as="h2" textAlign="center">Create New Post</Header>
          <AutoForm schema={bridge} onSubmit={data => this.submit(data)} label={false}>
            <HiddenField name="date" value={date}/>
            <HiddenField name="avatar" value={avatar}/>
            <HiddenField name="meta" value={meta}/>
            <HiddenField name="summary" value={summary}/>
            <HiddenField name="owner" value={owner}/>
            <LongTextField name="extraText" placeholder="What's on your mind?"/>
            <div className="button-style">
              Upload Images:
              <Button name="extraImages" style={{ marginLeft: '10px', display: 'inline' }}>Browse</Button>
            </div>
            <br/>
            <div>
              <SubmitField value='Submit'/>
              <Button style={{ marginLeft: '10px' }} as={Link} to='/hub'>
                Cancel
              </Button>
            </div>
            <ErrorsField/>
          </AutoForm>
        </Container>
      </div>
    );
  }
}

// Declare the types of all properties.
AddPost.propTypes = {
  location: PropTypes.object,
  users: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
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
})(AddPost);
