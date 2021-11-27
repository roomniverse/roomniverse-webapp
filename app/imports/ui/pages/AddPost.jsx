import React from 'react';
import { Container, Header, TextArea, Form, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import { Posts } from '../../api/social/Posts';
import { Users } from '../../api/user/User';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class AddPost extends React.Component {
  // Render the page once subscriptions have been received.
  submit(data, formRef) {
    const { extraText, extraImages } = data;
    const user = Users.collection.owner;
    const image = Users.collection.avatar;
    const date = 1;
    const summary = `${user} posted to their page`;
    const meta = 0;
    Posts.collection.insert({ user, image, date, summary, extraText, extraImages, meta },
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
          <Form ref={ ref => { fRef = ref; } } onSubmit={ data => this.submit(data, fRef) } >
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

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default AddPost;
