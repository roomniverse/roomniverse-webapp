import React from 'react';
import { Button, Icon, Image, Loader, Segment } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import PropTypes from 'prop-types';
import { Posts } from '../../api/social/Posts';
import { Users } from '../../api/user/User';

class PostEvent extends React.Component {
  handleDate(date) {
    const curr = new Date.GetTime();
    const diff = curr - date;
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
    return date.toDateString();

  }

  album(images) {
    if (images.length > 3) {
      return (
        images.map((image) => <Image alt="image" src={image} key={image._id}/>)
      );
    }
    return (
      images.map((image) => <Image src={image} alt="image" key={image._id}/>)
    );
  }

  handleMeta() {
    Users.collection.find(this.props.post._id).update({ meta: this.props.post.meta + 1 });
  }

  render() {
    return (
      (this.props.ready) ? this.renderComponent() : <Loader active>Getting data</Loader>
    );
  }

  renderComponent() {
    this.props.post = Posts.collection.find((post) => post.key === this.props.key);
    this.props.users = Users.collection.find((user) => user.owner === Accounts.user().username);
    const date = this.props.post.date;
    const avatar = this.props.post.avatar;
    const meta = this.props.post.meta;
    const summary = this.props.post.summary;
    const text = this.props.post.extraText;
    const images = this.props.post.extraImages;
    if (text.length > 0 && images.length > 0) {
      return (
        <Segment.Group piled stacked>
          <Segment.Group horizontal>
            <Segment>
              <Image src={avatar} avatar href={`/#/profile/${this.props.users.key}`}>
                {` ${this.props.users.firstName} ${this.props.users.lastName} `}
              </Image>
              {summary}
            </Segment>
            <Segment floated="right" textAlign="right">
              {this.handleDate(date)}
            </Segment>
          </Segment.Group>
          <Segment.Group>
            <Segment>
              {text}
            </Segment>
            <Segment>
              {this.album(images)}
            </Segment>
          </Segment.Group>
          <Segment.Group horizontal>
            <Segment compact>
              <Icon as={Button} name="heart" onClick={this.handleMeta}>
                {`${meta} likes`}
              </Icon>
            </Segment>
            <Segment compact>
              <Icon name='comments'>
                Comments
              </Icon>
            </Segment>
            <Segment floated="right">
              <Icon name="share square">
                Share
              </Icon>
            </Segment>
          </Segment.Group>
        </Segment.Group>
      );
    }
    if (text === '' && images.length > 0) {
      return (
        <Segment.Group>
          <Segment.Group horizontal>
            <Segment>
              <Image src={avatar} avatar href={`/#/profile/${this.props.users.key}`}>
                {` ${this.props.users.firstName} ${this.props.users.lastName} `}
              </Image>
              <Segment content={summary}/>
            </Segment>
            <Segment floated="right" textAlign="right">
              {this.handleDate(date)}
            </Segment>
          </Segment.Group>
          <Segment.Group>
            <Segment content={summary}/>
          </Segment.Group>
          <Segment.Group horizontal>
            <Segment>
              <Button icon name="heart" onClick={this.handleMeta}>
                {`${meta} likes`}
              </Button>
            </Segment>
          </Segment.Group>
        </Segment.Group>
      );
    }
    return (
      <Segment.Group>
        <Segment.Group horizontal>
          <Segment>
            <Image src={avatar} avatar href={`/#/profile/${this.props.users.key}`}>
              {` ${this.props.users.firstName} ${this.props.users.lastName} `}
            </Image>
            <Segment content={summary}/>
          </Segment>
          <Segment floated="right" textAlign="right">
            {this.handleDate(date)}
          </Segment>
        </Segment.Group>
        <Segment.Group>
          {this.album(images)}
        </Segment.Group>
        <Segment.Group horizontal>
          <Segment>
            <Button icon name="heart" onClick={this.handleMeta}>
              {`${meta} likes`}
            </Button>
          </Segment>
        </Segment.Group>
      </Segment.Group>
    );

  }
}

PostEvent.propTypes = {
  key: PropTypes.string,
  post: PropTypes.array,
  ready: PropTypes.bool,
  users: PropTypes.array,
};

export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Posts.userPublicationName);
  const sub2 = Meteor.subscribe(Users.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  const ready2 = sub2.ready();
  return {
    ready: (ready && ready2),
  };
})(PostEvent);
