import React from 'react';
import { Container, Header, TextArea, Form, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import { Posts } from '../../api/social/Posts';
import { Users } from '../../api/user/User';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class AddPost extends React.Component {
  // Render the page once subscriptions have been received.
  submit(data, formRef) {
    const account = Users.collection.find((user) => user.owner === Meteor.user().username);
    const { extraText, extraImages } = data;
    const user = `${account.firstName} ${account.lastName}`;
    const image = account.avatar;
    const date = 'Just Now'; // new Date().getTime();
    const summary = `${user} posted to their page`;
    const meta = 0;
    const owner = account.owner;
    Posts.collection.insert({ date, image, summary, meta, owner, extraText, extraImages },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          formRef.reset();
          swal('Success', 'Item added successfully', 'success');
          this.setState({ location: '/#/hub' });
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
            <br/>
            <Button className="post" type='submit' as={Link} to='/hub'>
              Post
            </Button>
            <Button className="cancel" as={Link} to='/hub'>
              Cancel
            </Button>
          </Form>
        </Container>
      </div>
    );
  }
}

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default AddPost;
