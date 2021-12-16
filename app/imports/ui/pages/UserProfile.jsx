import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Container, Grid, Loader, Tab, Segment } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import User from '../components/User';
import { Users } from '../../api/user/User';
import PostEvent from '../components/PostEvent';
import { Posts } from '../../api/social/Posts';
import { Requests } from '../../api/social/Requests';

class UserProfile extends React.Component {

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    const posts = this.props.postCollection.filter((post) => post.owner === this.props.doc.owner);

    const panes = [
      {
        menuItem: 'Posts',
        render: () => <Tab.Pane>
          <div>
            <Button id="addpost-button-profile" fluid as={Link} to='/add' referer={`/profile/${this.props.doc._id}`}>
              Create a New Post
            </Button>
          </div>
          <div style={{ marginTop: '20px' }}>
            {posts.slice(0).reverse().map((post) => <PostEvent
              key={post._id}
              post={post}
              user={this.props.doc}
            />)}
          </div>
        </Tab.Pane>,
      },
      {
        menuItem: 'Request',
        render: () => {
          const requests = this.props.userRequest.find((request) => request.owner === this.props.currentUser);
          return <Tab.Pane>
            <Segment vertical>
              <p>Location: {requests?.location}</p></Segment>
            <Segment vertical>
              <p>Description: {requests?.description}</p></Segment>
          </Tab.Pane>;
        },
      },
    ];
    return (
      <div className="white-theme profile">
        <Container id="userprofile-page">
          <Grid columns={3}>
            <Grid.Column width={4}>
              <User user={this.props.doc}/>
            </Grid.Column>
            <Grid.Column width={12}>
              <div>
                <Tab panes={panes}/>
              </div>
            </Grid.Column>
          </Grid>
        </Container>
      </div>
    );
  }
}

UserProfile.propTypes = {
  postCollection: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
  doc: PropTypes.object,
  userRequest: PropTypes.array.isRequired,
  currentUser: PropTypes.string.isRequired,
};

export default withTracker(({ match }) => {
  const documentId = match.params._id;
  const subscription = Meteor.subscribe(Posts.userPublicationName) && Meteor.subscribe(Users.userPublicationName) && Meteor.subscribe(Requests.userPublicationName);
  const ready = subscription.ready();
  const users = Users.collection.find({}).fetch();
  const doc = users.find((user) => user._id === documentId);
  const postCollection = Posts.collection.find({}).fetch();
  const userRequest = Requests.collection.find({}).fetch();
  const currentUser = Meteor.user() ? Meteor.user().username : '';
  return {
    postCollection,
    ready,
    doc,
    userRequest,
    currentUser,
  };
})(UserProfile);
