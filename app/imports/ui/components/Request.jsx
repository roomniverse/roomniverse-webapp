import React from 'react';
import { Item } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Request extends React.Component {
  render() {
    return (
      <Item>
        <Item.Image size='small' src={this.props.request.image}/>
        <Item.Content>
          <Item.Header as='a' color='white'>{this.props.request.name}</Item.Header>
          <Item.Description>
            <p>Gender: {this.props.request.gender}</p>
            <p>Location: {this.props.request.location}</p>
            <p>{this.props.request.description}</p>
          </Item.Description>
          <Item.Extra>
            <p>Link to the profile</p>
            <Link to={`/edit/${this.props.request._id}`}>Edit</Link>
          </Item.Extra>
        </Item.Content>
      </Item>
    );
  }
}

// Require a document to be passed to this component.
Request.propTypes = {
  request: PropTypes.shape({
    name: PropTypes.string,
    gender: PropTypes.string,
    location: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
    owner: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(Request);