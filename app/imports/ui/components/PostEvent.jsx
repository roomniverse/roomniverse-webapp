import React from 'react';
import { Button, Icon, Image, Loader, Segment } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { Posts } from '../../api/social/Posts';

class PostEvent extends React.Component {
  handleDate(date) {
    const curr = new Date.getTime();
    const diff = curr - date;
    if (diff < 1.8e6) {
      return 'Just now';
    } else if (diff < 7.2e6) {
        return 'An hour ago';
    } else if (diff < 8.64e7) {
      return 'Today';
    } else if (diff < 1.728e8) {
      return 'Yesterday';
    } else {
      return date.toDateString();
    }
  }

  album(images) {
    if (images.length > 3) {
      return (
        <></>
      );
    }
    return images.map((image) => (
      <Image src={image} alt="image"/>
    ));
  }

  handleMeta() {
    this.props.post.meta += 1;
  }

  render() {
    return (
      (this.props.ready) ? this.renderComponent() : <Loader active>Getting data</Loader>
    );
  }

  renderComponent() {
    this.props.post = Posts.collection.find((post) => post.key === this.props.key);
    const user = this.props.users.find((user) => user.owner === this.props.post.owner);
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
              <Image src={avatar} avatar href={`/#/profile/${user.key}`}>
                {` ${user.firstName} ${user.lastName} `}
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
            </Segment compact>
            <Segment>
              <Icon name='comments' >
                Comments
              </Icon>
            </Segment>
            <Segment floated="right">
              <Icon name="share square" >
                Share
              </Icon>
            </Segment>
          </Segment.Group>
        </Segment.Group>
      );
    } else if (text === "" && images.length > 0) {
      return (
        <Segment.Group>
          <Segment.Group horizontal>
            <Segment>
              <Image src={avatar} avatar href={`/#/profile/${user.key}`}>
                {` ${user.firstName} ${user.lastName} `}
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
    } else {
      return (
        <Segment.Group>
          <Segment.Group horizontal>
            <Segment>
              <Image src={avatar} avatar href={`/#/profile/${user.key}`}>
                {` ${user.firstName} ${user.lastName} `}
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
}

PostEvent.propTypes = {
  key: PropTypes.string,
  post: PropTypes.object,
  ready: PropTypes.bool,
};

export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Posts.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  return {
    ready,
  };
})(PostEvent);
