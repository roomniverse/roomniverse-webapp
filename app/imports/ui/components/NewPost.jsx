import React from 'react';
import { Form } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { Posts } from '../../api/social/Posts';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';

/** Create a new Social Post */
class NewPost extends React.Component {
  submit(data, formRef) {
    const {}
    const owner = Meteor.user().username;
    Posts.collection.insert({ name, quantity, condition, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success');
          formRef.reset();
        }
      });
  }

  render() {
    return (
      <Form>
        <Form.Field control="textarea" rows="5" placeholder="What's on your mind?"/>
        <Form.Field label="Add an Image" control="button">Browse</Form.Field>
      </Form>
    );
  }
}

export default withRouter(NewPost);
