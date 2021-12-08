import React from 'react';
import { Icon, Image, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class PostEvent extends React.Component {
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
        images.map((image) => <Image alt="image" src={image} key={image._id}/>)
      );
    }
    return (
      images.map((image, index) => <Image src={image} alt="image" key={image._id + index.toString()}/>)
    );
  }

  handleMeta() {
    this.props.post.update({ meta: this.props.post.meta + 1 });
  }

  render() {
    const date = this.props.post.date;
    const avatar = this.props.post.avatar;
    const meta = this.props.post.meta;
    const summary = this.props.post.summary;
    const text = this.props.post.extraText;
    const images = this.props.post.extraImages;
    const length = this.props.post.extraImages.length;
    if (text && length > 0) {
      return (
        <Segment.Group piled stacked>
          <Segment.Group horizontal>
            <Segment>
              <Image src={avatar} avatar href={`/#/profile/${this.props.user._id}`} key={this.props.user._id}/>
              {` ${this.props.user.firstName} ${this.props.user.lastName} `}
              {summary}
              <div style={{ display: 'inline', float: 'right' }}>
                {this.handleDate(date)}
              </div>
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
              <Icon name="heart" onClick={this.handleMeta}/>
              {`${meta} Likes`}
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
        </Segment.Group>
      );
    } if (!text && length > 0) {
      return (
        <Segment.Group piled stacked>
          <Segment.Group horizontal>
            <Segment>
              <Image src={avatar} avatar href={`/#/profile/${this.props.user._id}`} key={this.props.user._id}/>
              {` ${this.props.user.firstName} ${this.props.user.lastName} `}
              {summary}
              <div style={{ display: 'inline', float: 'right' }}>
                {this.handleDate(date)}
              </div>
            </Segment>
          </Segment.Group>
          <Segment.Group>
            {this.album(images)}
          </Segment.Group>
          <Segment.Group horizontal>
            <Segment compact>
              <Icon name="heart" onClick={this.handleMeta}/>
              {`${meta} Likes`}
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
        </Segment.Group>
      );
    } if (text) {
      return (
        <Segment.Group piled stacked>
          <Segment.Group horizontal>
            <Segment>
              <Image src={avatar} avatar href={`/#/profile/${this.props.user._id}`} key={this.props.user._id}/>
              {` ${this.props.user.firstName} ${this.props.user.lastName} `}
              {summary}
              <div style={{ display: 'inline', float: 'right' }}>
                {this.handleDate(date)}
              </div>
            </Segment>
          </Segment.Group>
          <Segment.Group>
            <Segment>
              {text}
            </Segment>
          </Segment.Group>
          <Segment.Group horizontal>
            <Segment compact>
              <Icon name="heart" onClick={this.handleMeta}/>
              {`${meta} Likes`}
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
        </Segment.Group>
      );
    }
    return (
      <Segment.Group piled stacked>
        <Segment.Group horizontal>
          <Segment>
            <Image src={avatar} avatar href={`/#/profile/${this.props.user._id}`} key={this.props.user._id}/>
            {` ${this.props.user.firstName} ${this.props.user.lastName} `}
            {summary}
            <div style={{ display: 'inline', float: 'right' }}>
              {this.handleDate(date)}
            </div>
          </Segment>
        </Segment.Group>
        <Segment.Group horizontal>
          <Segment compact>
            <Icon name="heart" onClick={this.handleMeta}/>
            {`${meta} Likes`}
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
      </Segment.Group>
    );

  }
}

PostEvent.propTypes = {
  post: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default withRouter(PostEvent);
