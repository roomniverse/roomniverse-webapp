import React from 'react';
import { Feed, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class PostEvent extends React.Component {
  render() {
    return (
      <Feed.Event
        image={this.props.post.image}
        user={this.props.post.user}
        summary={this.props.post.summary}
        date={this.props.post.date}
        extraText={this.props.extra.text}
        extraImage={this.props.extra.img}>
        <Feed.Meta>
          <Icon name="like">{this.props.post.meta[0]}</Icon>
        </Feed.Meta>
      </Feed.Event>
    );
  }
}

PostEvent.propTypes = {
  post: PropTypes.shape({
    image: PropTypes.string,
    user: PropTypes.string,
    date: PropTypes.string,
    meta: PropTypes.string,
    summary: PropTypes.array,
    _id: PropTypes.string,
  }).isRequired,
  extra: PropTypes.shape({
    text: PropTypes.string,
    img: PropTypes.string,
  }),
};

export default withRouter(PostEvent);
