import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Card, Image, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class User extends React.Component {

  render() {
    const user = this.props.user;

    return (
      <Card>
        <Image src={user.avatar} wrapped ui={false}/>
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
          {
            (this.props.user.owner === this.props.currentUser || Roles.userIsInRole(Meteor.userId(), 'admin')) ?
              <Card.Content>
                <Button id="editprofile-link" floated='right' as={Link} to={`/editprofile/${this.props.user._id}`}>
                      Edit
                </Button>
              </Card.Content> : <a/>
          }
        </Card.Content>
      </Card>
    );
  }
}

// Require a document to be passed to this component.
User.propTypes = {
  user: PropTypes.object.isRequired,
  currentUser: PropTypes.string.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withTracker(() => {
  const currentUser = Meteor.user() ? Meteor.user().username : '';
  return {
    currentUser,
  };
})(User);
