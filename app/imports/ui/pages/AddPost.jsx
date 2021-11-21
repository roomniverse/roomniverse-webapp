import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Input, TextArea, Loader, Form, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Stuffs } from '../../api/stuff/Stuff';

// import { Link } from 'react-router-dom';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class AddPost extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <div className="white-theme find-roommate">
        <Container>
          <Header as="h2" textAlign="center">Create New Post</Header>
          <Input fluid placeholder='Title'/>
          <Form>
            <TextArea placeholder='Write a new post!' style={{ minHeight: 750 }} />
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
  const subscription = Meteor.subscribe(Stuffs.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents
  const stuffs = Stuffs.collection.find({}).fetch();
  return {
    stuffs,
    ready,
  };
})(AddPost);
