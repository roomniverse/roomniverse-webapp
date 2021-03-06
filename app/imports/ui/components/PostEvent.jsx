import React from 'react';
import { Roles } from 'meteor/alanning:roles';
import { Dropdown, Image, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import swal from 'sweetalert';
import { withTracker } from 'meteor/react-meteor-data';
import { Posts } from '../../api/social/Posts';
import { Users } from '../../api/user/User';

/** Renders a single post item. See pages/Hub.jsx.
 */
class PostEvent extends React.Component {
  constructor() {
    super();
    this.state = { redirectToReferer: false };
  }

  handleDate(date) {
    const curr = new Date().getTime();
    const diff = curr - date;
    const dateString = new Date(date);
    if (diff < 1.8e6) {
      return 'Just now';
    }
    if (diff < 7.2e6) {
      return 'An hour ago';
    }
    if (diff < 8.64e7) {
      return 'Today';
    }
    if (diff < 1.728e8) {
      return 'Yesterday';
    }
    return dateString.toDateString();
  }

  album(images) {
    if (images.length > 3) {
      return (
        images.map((image, index) => <Image alt="image" src={image} key={image._id + index.toString()}/>)
      );
    }
    return (
      images.map((image, index) => <Image src={image} alt="image" key={image._id + index.toString()}/>)
    );
  }

  handleMeta(e, data) {
    console.log(e);
    console.log(data);
    this.props.post.update(this.props.post._id, { $inc: { meta: this.props.post.meta + 1 } },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        }
      });
  }

  deletePost = (username) => {
    if (Meteor.user().username === username || Roles.userIsInRole(Meteor.userId(), 'admin')) {
      Posts.collection.remove(this.props.post._id,
        (error) => {
          if (error) {
            swal('Error', error.message, 'error');
          } else {
            this.setState({ redirectToReferer: true });
          }
        });
    } else {
      swal('Error', `Only user: ${this.props.user.firstName} ${this.props.user.lastName} can remove this post`, 'error');
    }
  }

  postDigest() {
    const date = this.props.post.date;
    const avatar = this.props.post.avatar;
    const summary = this.props.post.summary;
    return (
      <Segment.Group horizontal>
        <Segment>
          <Image src={avatar} avatar href={`/#/profile/${this.props.user._id}`} key={this.props.user._id}/>
          {` ${this.props.user.firstName} ${this.props.user.lastName} `}
          {summary}
          <div style={{ display: 'inline', float: 'right' }}>
            {this.handleDate(date)}
            <Dropdown
              id="edit-post-dropdown"
              icon="ellipsis vertical"
              direction="right"
              inline
              floated="right">
              <Dropdown.Menu>
                <Dropdown.Item
                  id="edit-post-link"
                  icon="edit"
                  text="Edit Post"
                  as={Link}
                  to={{ pathname: `/editpost/${this.props.post._id}` }}
                />
                <Dropdown.Item
                  id="delete-post"
                  icon="trash alternate outline"
                  text="Delete"
                  onClick={() => this.deletePost(this.props.user.owner)}/>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Segment>
      </Segment.Group>
    );
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/hub' } };
    // if correct authentication, redirect to page instead of login screen
    if (this.state.redirectToReferer) {
      return <Redirect to={from}/>;
    }
    if (this.state.redirect) {
      return '';
    }

    if (this.props.post.extraText && this.props.post.extraImages) {
      return (
        <Segment.Group piled stacked>
          {this.postDigest()}
          <Segment.Group>
            <Segment>
              {this.props.post.extraText}
            </Segment>
            <Segment>
              {this.album(this.props.post.extraImages)}
            </Segment>
          </Segment.Group>
        </Segment.Group>
      );
    }
    if (!this.props.post.extraText && this.props.post.extraImages) {
      return (
        <Segment.Group piled stacked>
          {this.postDigest()}
          <Segment.Group>
            {this.album(this.props.post.extraImages)}
          </Segment.Group>
        </Segment.Group>
      );
    }
    if (this.props.post.extraText) {
      return (
        <Segment.Group piled stacked>
          {this.postDigest()}
          <Segment.Group>
            <Segment>
              {this.props.post.extraText}
            </Segment>
          </Segment.Group>
        </Segment.Group>
      );
    }
    return (
      <div>
        <Segment.Group piled stacked>
          {this.postDigest()}
        </Segment.Group>
      </div>
    );

  }
}

// Declare the types of all properties.
PostEvent.propTypes = {
  location: PropTypes.object,
  post: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  users: PropTypes.array,
  posts: PropTypes.array,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
const PostTracker = withTracker(() => ({
  subscription: Meteor.subscribe(Users.userPublicationName) && Meteor.subscribe(Posts.userPublicationName),
  users: Users.collection.find({}).fetch(),
  posts: Posts.collection.find({}).fetch(),
}))(PostEvent);

// Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter
export default withRouter(PostTracker);
