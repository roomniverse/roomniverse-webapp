import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, TextArea, Form, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import { Posts } from '../../api/social/Posts';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class AddPost extends React.Component {
  submit(data, formRef) {
    const extraText = data;
    const user = Meteor.user().username;
    const image = Meteor.user().avatar;
    const date = Date.now();
    const summary = `${user} has posted to their page!`;
    const meta = {
      lname: 'likes',
      lnum: 0,
    };
    Posts.collection.insert({ image, user, date, summary, extraText, meta },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success');
          formRef.reset();
        }
      });
  }

  // Render the page once subscriptions have been received.
  render() {
    return (
      <div className="white-theme find-roommate">
        <Container>
          <Header as="h2" textAlign="center">Create New Post</Header>
          <Form>
            <TextArea placeholder="What's on your mind?" style={{ minHeight: 750 }} />
          </Form>
          <Button as={Link} to='/hub'>
            Submit Post
          </Button>
        </Container>
      </div>
    );
  }
}

// Require an array of Stuff documents in the props.
AddPost.propTypes = {
  stuffs: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Posts.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents
  const stuffs = Posts.collection.find({}).fetch();
  return {
    stuffs,
    ready,
  };
})(AddPost);
