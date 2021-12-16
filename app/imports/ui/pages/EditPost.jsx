import React from 'react';
import { Button, Container, Header, Loader } from 'semantic-ui-react';
import { Link, Redirect } from 'react-router-dom';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, ErrorsField, LongTextField, SubmitField, TextField } from 'uniforms-semantic';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Posts } from '../../api/social/Posts';
import { Users } from '../../api/user/User';

const bridge = new SimpleSchema2Bridge(Posts.schema);

class EditPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToReferer: false,
      textValue: '',
      imageValue: [],
    };
  }

  submit(data) {
    const { owner } = data;
    if (Meteor.user().username === owner) {
      if (!data.extraText && !data.extraImages) {
        swal('Error', 'Please upload images or write something.', 'error');
      } else {
        const { extraText, extraImages } = data;
        Posts.collection.update(this.props.docId, { $set: { extraText, extraImages } },
          (error) => {
            if (error) {
              swal('Error', error.message, 'error');
            } else {
              this.setState({ redirectToReferer: true });
            }
          });
      }
    } else {
      swal('Error', 'Only owner can remove this post', 'error');
    }
  }

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    const { from } = this.props.location.state || { from: { pathname: '/hub' } };
    this.user = this.props.userCollection.find((datum) => datum.owner === Meteor.user().username);
    if (this.user.owner !== Meteor.user().username) this.setState({ redirectToReferer: true });
    if (this.state.redirectToReferer) {
      return <Redirect to={from}/>;
    }

    const { textValue, imageValue } = { textValue: this.props.post.extraText, imageValue: this.props.post.extraImages };

    // eslint-disable-next-line react/no-direct-mutation-state
    this.state = { textValue, imageValue };
    return (
      <div id="editpost-page" className="white-theme page-padding">
        <Container>
          <Header as="h2" textAlign="center">Edit Your Post</Header>
          <AutoForm schema={bridge} onSubmit={(data) => this.submit(data)} label={false} model={this.props.post}>
            <LongTextField id='editpost-text' name="extraText" defaultValue={this.state.textValue}/>
            <TextField id='editpost-image' name='extraImages' placeholder='Please enter a URL of image'/>
            <br/>
            <div>
              <SubmitField id='editpost-submit' value='Submit'/>
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

EditPost.propTypes = {
  location: PropTypes.object,
  docId: PropTypes.string.isRequired,
  ready: PropTypes.bool.isRequired,
  post: PropTypes.object,
  user: PropTypes.object,
  userCollection: PropTypes.array,
};

export default withTracker(({ match }) => {
  const docId = match.params._id;
  const subscription = Meteor.subscribe(Posts.userPublicationName) && Meteor.subscribe(Users.userPublicationName);
  const ready = subscription.ready();
  const post = Posts.collection.findOne(docId);
  const userCollection = Users.collection.find({}).fetch();
  return {
    docId,
    ready,
    post,
    userCollection,
  };
})(EditPost);
