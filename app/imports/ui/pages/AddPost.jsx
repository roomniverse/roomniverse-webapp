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
    const account = Users.collection.find();
    const { extraText, extraImages } = data;
    const user = `${account.firstName} ${account.lastName}`;
    const image = account.avatar;
    const date = 'Just Now';
    const summary = `${user} posted to their page`;
    const meta = 0;
    const owner = account.owner;
    Posts.collection.insert({ date, image, summary, meta, owner, extraText, extraImages },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          formRef.reset();
          swal('Success', 'Item added successfully', 'success').then(function () { window.location = '/#/hub'; });
        }
      });
  }

  render() {
    let fRef = null;
    return (
      <div className="white-theme find-roommate">
        <Container id="addpost-page">
          <Header as="h2" textAlign="center">Create New Post</Header>
          <Form ref={ref => { fRef = ref; }} onSubmit={ data => this.submit(data, fRef) } >
            <TextArea placeholder="What's on your mind?" style={{ minHeight: 750 }}/>
            Post Images:
            <Button value="">Browse</Button>
            <br/>
            <Button type='submit' as={Link} to='/hub'>
              Post
            </Button>
          </Form>
        </Container>
      </div>
    );
  }
}

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default AddPost;
