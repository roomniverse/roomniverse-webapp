import React from 'react';
import { Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';

class PostButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = () => {
    this.setState(
      this.display = 'none',
    );
  }

  render() {
    return (
      <div>
        <Button
          id="new-post-button"
          onClick={this.handleClick}
          fluid
        >Create a new post</Button>
        {this.props.render(this.state)}
      </div>
    );
  }
}

PostButton.propTypes = {
  render: PropTypes.func.isRequired,
};

export default PostButton;
