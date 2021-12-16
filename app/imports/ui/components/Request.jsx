import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Item, Loader } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Users } from '../../api/user/User';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Request extends React.Component {
  render() {
    return (this.props.ready) ? this.renderComponent() : <Loader active>Getting data</Loader>;
  }

  renderComponent() {
    const user = this.props.users.find((item) => item.owner === this.props.request.owner);
    return (
      <Item>
        <Item.Image size='small' src={this.props.request.avatar}/>
        <Item.Content>
          <Item.Header as='a' color='white'>{this.props.request.firstName} {this.props.request.lastName}</Item.Header>
          <Item.Description>
            <p>Gender: {this.props.request.gender}</p>
            <p>Major: {this.props.request.major}</p>
            <p>Graduation Year: {this.props.request.gradYear}</p>
            <p>Location: {this.props.request.location}</p>
            <p>{this.props.request.description}</p>
          </Item.Description>
          <Item.Extra>
            <Link to={`/profile/${user._id}`}>Link to the profile</Link>
            <Link id={'findroommate-editrequest'} to={`/edit/${this.props.request._id}`}>Edit</Link>
          </Item.Extra>
        </Item.Content>
      </Item>
    );
  }
}

// Require a document to be passed to this component.
Request.propTypes = {
  request: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

const RequestTracker = withTracker(() => {
  const subscription = Meteor.subscribe(Users.userPublicationName);
  const ready = subscription.ready();
  const users = Users.collection.find({}).fetch();
  return {
    ready,
    users,
  };
})(Request);

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(RequestTracker);
