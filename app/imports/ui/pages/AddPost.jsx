import React from 'react';
import { Container, Header, TextArea, Form, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Users } from '../../api/user/User';
import { Posts } from '../../api/social/Posts';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class AddPost extends React.Component {
  // Render the page once subscriptions have been received.
  submit(data, formRef) {
    const { extraText, extraImages } = data;
    const user = `${this.props.user.firstName} ${this.props.user.lastName}`;
    const image = this.props.user.avatar;
    const date = 'Just Now';
    const summary = `${user} posted to their page`;
    const meta = 0;
    let owner;
    if (Meteor.user().username === this.props.user.owner) {
      owner = this.props.user.owner;
    } else {
      owner = 'Unresolved';
    }
    Posts.collection.insert({ date, image, summary, meta, owner, extraText, extraImages },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success');
          formRef.reset();
          this.setState({ error: '', redirectToReferer: true });
        }
      });
  }

  render() {
    let fRef = null;
    return (
      <div className="white-theme find-roommate">
        <Container>
          <Header as="h2" textAlign="center">Create New Post</Header>
          <Form ref={ref => { fRef = ref; }} onSubmit={ data => this.submit(data, fRef) } >
            <TextArea placeholder="What's on your mind?" style={{ minHeight: 750 }}/>
            Post Images:
            <Button value="">Browse</Button>
            <Button type='submit' as={Link} to='/hub'>
              Post
            </Button>
          </Form>
        </Container>
      </div>
    );
  }
}

// Require an array of Stuff documents in the props.
AddPost.propTypes = {
  user: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(({ match }) => {
  // Get access to Stuff documents.
  const documentId = match.params._id;
  const subscription = Meteor.subscribe(Users.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents
  const user = Users.collection.find(documentId);
  return {
    user,
    ready,
  };
})(AddPost);
