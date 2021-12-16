import React from 'react';
import { Dropdown, Icon, Image, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import swal from 'sweetalert';
import { withTracker } from 'meteor/react-meteor-data';
import { Posts } from '../../api/social/Posts';
import { Users } from '../../api/user/User';

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

  deleteModal(username) {
    if (Meteor.user().username === username) {
      swal('Are you sure you want to delete your post?', {
        buttons: {
          proceed: {
            text: 'Yes',
            value: 'Yes',
          },
          cancel: 'No',
        },
      })
        .then((value) => {
          switch (value) {

          case 'Yes':
            swal('Delete post').then(() => {
              this.deletePost();
            });
            break;

          default:
            swal('Cancel deletion');
            break;
          }
        });

    } else {
      swal('Error', `Only user: ${this.props.user.firstName} ${this.props.user.lastName} can remove this post`, 'error');
    }
  }

  deletePost = () => {
    Posts.collection.remove(this.props.post._id,
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          this.setState({ redirectToReferer: true });
        }
      });
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
                  onClick={() => this.deleteModal(this.props.user.owner, true)}/>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Segment>
      </Segment.Group>
    );
  }

  segmentFooter() {
    return (
      <Segment.Group horizontal>
        <Segment compact>
          <Icon name="heart" onClick={(e, data) => this.handleMeta(e, data)}/>
          {`${this.props.post.meta} Likes`}
        </Segment>
        <Segment compact>
          <Icon name='comments'/>
          Comments
        </Segment>
        <Segment floated="right">
          <Icon name="share square"/>
          Share
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
          {this.segmentFooter()}
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
          {this.segmentFooter()}
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
          {this.segmentFooter()}
        </Segment.Group>
      );
    }
    return (
      <div>
        <Segment.Group piled stacked>
          {this.postDigest()}
          {this.segmentFooter()}
        </Segment.Group>
      </div>
    );

  }
}

PostEvent.propTypes = {
  location: PropTypes.object,
  post: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  users: PropTypes.array,
  posts: PropTypes.array,
};

const PostTracker = withTracker(() => ({
  subscription: Meteor.subscribe(Users.userPublicationName) && Meteor.subscribe(Posts.userPublicationName),
  users: Users.collection.find({}).fetch(),
  posts: Posts.collection.find({}).fetch(),
}))(PostEvent);

export default withRouter(PostTracker);
