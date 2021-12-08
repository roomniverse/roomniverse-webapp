import React from 'react';
import { Button, Icon, Image, Loader, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Users } from '../../api/user/User';
import { withRouter } from 'react-router-dom';

class PostEvent extends React.Component {
  handleDate(date) {
    const curr = new Date().getTime();
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
    return date.toString();

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
    const users = Users.collection.find((user) => user.owner === this.props.post.owner);
    const date = this.props.post.date;
    const avatar = this.props.post.avatar;
    const meta = this.props.post.meta;
    const summary = this.props.post.summary;
    const text = this.props.post.extraText;
    const images = this.props.post.extraImages;
    if (text && images) {
      return (
        <Segment.Group piled stacked>
          <Segment.Group horizontal>
            <Segment>
              <Image src={avatar} avatar href={`/#/profile/${users.key}`}>
                {` ${users.firstName} ${users.lastName} `}
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
              <Image src={avatar} avatar href={`/#/profile/${users.key}`}>
                {` ${users.firstName} ${users.lastName} `}
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
            <Image src={avatar} avatar href={`/#/profile/${users.key}`}>
              {` ${users.firstName} ${users.lastName} `}
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
  post: PropTypes.object.isRequired,
};

export default withRouter(PostEvent);
