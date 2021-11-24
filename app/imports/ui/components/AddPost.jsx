import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, TextArea, Form } from 'semantic-ui-react';
import swal from 'sweetalert';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Posts } from '../../api/social/Posts';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class AddPost extends React.Component {
  constructor(props) {
    super(props);
    this.button = this.props.button;
  }

  visibility = () => {
    let vis = 'none';
    if (this.button.display === 'none') {
      vis = 'block';
    }
    return vis;
  }

  postStyle = {
    display: this.visibility,
  }

  submit(data, formRef) {
    const extraText = data;
    const extraImages = '';
    const user = Meteor.user().username;
    const image = Meteor.user().avatar;
    const date = Date.now();
    const summary = `${user} has posted to their page!`;
    const meta = 0;
    Posts.collection.insert({ image, user, date, summary, extraText, extraImages, meta },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          formRef.reset();
          this.setState({ error: '', redirectToReferer: true });
        }
      });
  }

  // Render the page once subscriptions have been received.
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/hub' } };
    // if correct authentication, redirect to page instead of login screen
    if (this.state.redirectToReferer) {
      return <Redirect to={from}/>;
    }

    let fRef = null;
    return (
      <div className="white-theme" style={this.postStyle}>
        <Container>
          <Header as="h2" textAlign="center">Create New Post</Header>
          <Form ref={ref => { fRef = ref; }} onSubmit={data => this.submit(data, fRef)}>
            <TextArea placeholder="What's on your mind?" style={{ minHeight: 750 }} />
            <Form.Button type="submit">Post</Form.Button>
          </Form>
        </Container>
      </div>
    );
  }
}

AddPost.propTypes = {
  button: PropTypes.element,
  location: PropTypes.object,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default AddPost;
