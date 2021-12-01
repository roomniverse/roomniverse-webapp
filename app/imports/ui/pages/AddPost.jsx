import React from 'react';
import { Button, Container, Header, Loader } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import { Posts } from '../../api/social/Posts';
import { Users } from '../../api/user/User';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, ErrorsField, HiddenField, LongTextField, SubmitField } from 'uniforms-semantic';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

const bridge = new SimpleSchema2Bridge(Posts.schema);

/** Renders a page to ceate a new instance of the Post Collection. */
class AddPost extends React.Component {
  submit(data, formRef) {
    Posts.collection.insert(data,
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success');
          this.setState({ location: '/#/hub' });
        }
      });
  }

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    const account = this.props.users.find((user) => user.owner === Meteor.user().username);
    const user = `${account.firstName} ${account.lastName}`;
    const image = account.avatar;
    const date = 'Just Now'; // new Date().getTime();
    const summary = `${user} posted to their page`;
    const meta = 0;
    const owner = account.owner;
    let fRef = null;
    return (
      <div id="addpost-page" className="white-theme page-padding">
        <Container>
          <Header as="h2" textAlign="center">Create New Post</Header>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data)}>
            <HiddenField name="date" value={date}/>
            <HiddenField name="image" value={image}/>
            <HiddenField name="meta" value={meta}/>
            <HiddenField name="summary" value={summary}/>
            <HiddenField name="owner" value={owner}/>
            <LongTextField name="extraText" extra="What's on your mind?"/>
            <div className="button-style">
              Upload Images:
              <Button name="extraImages" style={{ marginLeft: "10px" }}>Browse</Button>
            </div>
            <br/>
            <div>
              <SubmitField value='Submit'/>
              <Button style={{ marginLeft: "10px" }} as={Link} to='/hub'>
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

AddPost.propTypes = {
  users: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
}

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
