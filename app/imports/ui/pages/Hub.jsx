import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Container, Feed, Icon, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Posts } from '../../api/social/Posts';
import PostEvent from '../components/PostEvent';

// import NewPost from '../components/NewPost';

class Hub extends React.Component {
  render() {
    return (
      (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>
    );
  }

  renderPage() {
    return (
      <div className="white-theme hub">
        <Container className="post-feed">
          <Button fluid as={Link} to='/addpost'>
            Create a New Post
          </Button>
          <Feed>
            {this.props.posts.map((post) => <PostEvent key={post._id} post={post}/>)}
            <Feed.Event>
              <Feed.Label image='images/default-image.jpeg'/>
              <Feed.Content>
                <Feed.Summary>
                  <a>User Two</a> posted a new message
                  <Feed.Date>20 minutes ago</Feed.Date>
                </Feed.Summary>
                <Feed.Extra text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. In et mi magna. Fusce
                  ornare venenatis arcu, vitae blandit elit eleifend et. Vivamus suscipit rhoncus
                  nibh sit amet auctor. Proin tempor feugiat ante, a viverra ex vestibulum at. Donec et arcu massa. Ut
                  in felis ut dolor imperdiet tempus sed id nisi. Phasellus maximus sapien non enim rhoncus ultricies.
                </Feed.Extra>
                <Feed.Meta>
                  <Feed.Like>
                    <Icon name='like'/>5 Likes
                  </Feed.Like>
                </Feed.Meta>
              </Feed.Content>
            </Feed.Event>
            <Feed.Event>
              <Feed.Label image='images/default-image.jpeg'/>
              <Feed.Content>
                <Feed.Summary>
                  <Feed.User>User One</Feed.User> added you as a friend
                  <Feed.Date>3 Hours Ago</Feed.Date>
                </Feed.Summary>
                <Feed.Meta>
                  <Feed.Like>
                    <Icon name="like"/>2 Likes
                  </Feed.Like>
                </Feed.Meta>
              </Feed.Content>
            </Feed.Event>
            <Feed.Event>
              <Feed.Label image='images/default-image.jpeg'/>
              <Feed.Content>
                <Feed.Summary>
                  <Feed.User>User Three</Feed.User> added you as a friend
                  <Feed.Date>10 Hours Ago</Feed.Date>
                </Feed.Summary>
                <Feed.Meta>
                  <Feed.Like>
                    <Icon name="like"/>2 Likes
                  </Feed.Like>
                </Feed.Meta>
              </Feed.Content>
            </Feed.Event>
            <Feed.Event>
              <Feed.Label image='images/default-image.jpeg'/>
              <Feed.Content>
                <Feed.Summary>
                  <a>User Two</a> added <a>2 new photos</a> of you
                  <Feed.Date>2 days ago</Feed.Date>
                </Feed.Summary>
                <Feed.Extra images>
                  <a>
                    <img src='https://react.semantic-ui.com/images/wireframe/image.png'/>
                  </a>
                  <a>
                    <img src='https://react.semantic-ui.com/images/wireframe/image.png'/>
                  </a>
                </Feed.Extra>
                <Feed.Meta>
                  <Feed.Like>
                    <Icon name='like'/>
                    41 Likes
                  </Feed.Like>
                </Feed.Meta>
              </Feed.Content>
            </Feed.Event>
            <Feed.Event>
              <Feed.Label image='images/default-image.jpeg'/>
              <Feed.Content>
                <Feed.Summary>
                  <a>User Three</a> posted a new message
                  <Feed.Date>5 days ago</Feed.Date>
                </Feed.Summary>
                <Feed.Extra text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. In et mi magna. Fusce
                  ornare venenatis arcu, vitae blandit elit eleifend et. Vivamus suscipit rhoncus
                  nibh sit amet auctor.
                </Feed.Extra>
                <Feed.Meta>
                  <Feed.Like>
                    <Icon name='like'/>10 Likes
                  </Feed.Like>
                </Feed.Meta>
              </Feed.Content>
            </Feed.Event>
          </Feed>
        </Container>
      </div>
    );
  }
}

Hub.propTypes = {
  posts: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Posts.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents
  const posts = Posts.collection.find({}).fetch();
  return {
    posts,
    ready,
  };
})(Hub);
