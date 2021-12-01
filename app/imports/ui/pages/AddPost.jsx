import React from 'react';
import { Container, Header, TextArea, Form, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import { Posts } from '../../api/social/Posts';
import { Users } from '../../api/user/User';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Requests } from '../../api/social/Requests';

const bridge = new SimpleSchema2Bridge(Requests.schema);

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class AddPost extends React.Component {
  // Render the page once subscriptions have been received.
  submit(data, formRef) {
    const account = Users.collection.find((user) => user.owner === Meteor.user().username).fetch();
    const { extraText, extraImages } = data;
    const user = `${account.firstName} ${account.lastName}`;
    const image = account.avatar;
    const date = 'Just Now'; // new Date().getTime();
    const summary = `${user} posted to their page`;
    const meta = 0;
    const owner = account.owner;
    if (extraImages === null) {
      Posts.collection.insert({ date, image, summary, meta, owner, extraText },
        (error) => {
          if (error) {
            swal('Error', error.message, 'error');
          } else {
            formRef.reset();
            swal('Success', 'Item added successfully', 'success');
            this.setState({ location: '/#/hub' });
          }
        });
    } else if (extraText === null) {
      Posts.collection.insert({ date, image, summary, meta, owner, extraImages },
        (error) => {
          if (error) {
            swal('Error', error.message, 'error');
          } else {
            formRef.reset();
            swal('Success', 'Item added successfully', 'success');
            this.setState({ location: '/#/hub' });
          }
        });
    } else {
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
  }

  // render() {
  //   let fRef = null;
  //   return (
  //     <div id="addpost-page" className="white-theme page-padding">
  //       <Container>
  //         <Header as="h2" textAlign="center">Create New Post</Header>
  //         <Form ref={ref => { fRef = ref; }} onSubmit={ data => this.submit(data, fRef) } >
  //           <TextArea placeholder="What's on your mind?" style={{ minHeight: 750 }}/>
  //           <div className="button-style">
  //             Upload Images:
  //             <Button style={{marginLeft: "10px"}}>Browse</Button>
  //           </div>
  //           <br/>
  //           <div>
  //             <Button type='submit'>
  //               Post
  //             </Button>
  //             <Button style={{ marginLeft: "10px" }} as={Link} to='/hub'>
  //               Cancel
  //             </Button>
  //           </div>
  //         </Form>
  //       </Container>
  //     </div>
  //   );
  render() {
    let fRef = null;
    return (
      <div id="addpost-page" className="white-theme page-padding">
        <Container>
          <Header as="h2" textAlign="center">Create New Post</Header>
          <Form ref={ref => { fRef = ref; }} onSubmit={data => this.submit(data, fRef)}>
            <TextArea placeholder="What's on your mind?" style={{ minHeight: 750 }}/>
            <div className="button-style">
              Upload Images:
              <Button style={{ marginLeft: "10px" }}>Browse</Button>
            </div>
            <br/>
            <div>
              <Button type='submit'>
                Post
              </Button>
              <Button style={{ marginLeft: "10px" }} as={Link} to='/hub'>
                Cancel
              </Button>
            </div>
          </Form>
        </Container>
      </div>
    );
  }
}

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default AddPost;
