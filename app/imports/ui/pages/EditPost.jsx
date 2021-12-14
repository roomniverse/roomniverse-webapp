import React from 'react';
import { Button, Container, Header, Loader } from 'semantic-ui-react';
import { Link, Redirect } from 'react-router-dom';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, ErrorsField, LongTextField, SubmitField } from 'uniforms-semantic';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Posts } from '../../api/social/Posts';

const bridge = new SimpleSchema2Bridge(Posts.schema);

class EditPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = { redirectToReferer: false };
  }

  submit(data) {
    if (!data.extraText && !data.extraImages) {
      swal('Error', 'Please upload images or write something.', 'error');
    } else {
      const { extraText, extraImages } = data;
      Posts.collection.update(this.props.post._id, { $set: { extraText, extraImages } },
        (error) => {
          if (error) {
            swal('Error', error.message, 'error');
          } else {
            this.setState({ redirectToReferer: true });
          }
        });
    }
  }

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    const { from } = this.props.location.state || { from: { pathname: '/hub' } };
    // if correct authentication, redirect to page instead of login screen
    if (this.state.redirectToReferer) {
      return <Redirect to={from}/>;
    }

    return (
      <div id="editpost-page" className="white-theme page-padding">
        <Container>
          <Header as="h2" textAlign="center">Create New Post</Header>
          <AutoForm schema={bridge} onSubmit={data => this.submit(data)} label={false}>
            <LongTextField name="extraText" defaultValue={this.post.extraText}/>
            <div className="button-style">
              Upload Images:
              {/* <AutoField name="extraImages" /> */}
              <Button name="extraImages" style={{ marginLeft: '10px' }}>Browse</Button>
            </div>
            <br/>
            <div>
              <SubmitField value='Submit'/>
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
  ready: PropTypes.bool.isRequired,
  key: PropTypes.string.isRequired,
  post: PropTypes.object.isRequired,
};

export default withTracker(() => {
  const subscription = Meteor.subscribe(Posts.userPublicationName);
  const ready = subscription.ready();
  const post = Posts.collection.find((item) => item._id === this.props.key);
  return {
    ready,
    post,
  };
})(EditPost);
