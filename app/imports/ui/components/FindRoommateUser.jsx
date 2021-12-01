import React from 'react';
import { Item } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class FindRoommateUser extends React.Component {
  render() {
    const user = this.props.user;
    return (
      <Item>
        <Item.Image size='small' src={user.avatar}/>
        <Item.Content>
          <Item.Header as='a' color='white'><p>{user.firstName} {user.lastName}</p></Item.Header>
          <Item.Description>
            <p>Gender: {user.gender}</p>
            <p>Major: {user.major}</p>
            <p>Class of {user.gradYear}</p>
          </Item.Description>
          <Item.Extra>
            <p>Link to the profile</p>
          </Item.Extra>
        </Item.Content>
      </Item>
    );
  }
}

// Require a document to be passed to this component.
FindRoommateUser.propTypes = {
  user: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(FindRoommateUser);
