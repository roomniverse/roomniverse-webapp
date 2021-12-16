import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class User extends React.Component {
  render() {
    const user = this.props.user;
    return (
      <Card>
        <Image as={Link} to={`/profile/${user._id}`} src={user.avatar} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{user.firstName} {user.lastName}</Card.Header>
          <Card.Meta>
            Gender: {user.gender}
          </Card.Meta>
          <Card.Meta>
            Major: {user.major}
          </Card.Meta>
          <Card.Meta>
            Class of {user.gradYear}
          </Card.Meta>
        </Card.Content>
        <Card.Content extra>
          <Link id="editprofile-link" to={`/editprofile/${this.props.user._id}`}>Edit</Link>
        </Card.Content>
      </Card>
    );
  }
}

// Require a document to be passed to this component.
User.propTypes = {
  user: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(User);
