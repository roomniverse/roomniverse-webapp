import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Item, Header, Loader, Input } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Stuffs } from '../../api/stuff/Stuff';

// import { Link } from 'react-router-dom';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class FindRoommate2 extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <Container>
        <Header as="h2" textAlign="center">Find Roommates2</Header>

        <Input fluid icon='search' placeholder='Search...'/>

        <Item.Group divided>
          <Item>
            <Item.Image size='small' src='https://prepsec.org/wp-content/uploads/2017/09/unknown-person-icon-Image-from.png'/>
            <Item.Content>
              <Item.Header as='a'>Name</Item.Header>
              <Item.Description>
                <p>Gender: </p>
                <p>Location: </p>
                <p>description of the room</p>
              </Item.Description>
              <Item.Extra>
                <p>Link to the profile</p>
              </Item.Extra>
            </Item.Content>
          </Item>

          <Item>
            <Item.Image size='small' src='https://prepsec.org/wp-content/uploads/2017/09/unknown-person-icon-Image-from.png'/>
            <Item.Content>
              <Item.Header as='a'>Name</Item.Header>
              <Item.Description>
                <p>Gender: </p>
                <p>Location: </p>
                <p>description of the room</p>
              </Item.Description>
              <Item.Extra>
                <p>Link to the profile</p>
              </Item.Extra>
            </Item.Content>
          </Item>

          <Item>
            <Item.Image size='small' src='https://prepsec.org/wp-content/uploads/2017/09/unknown-person-icon-Image-from.png'/>
            <Item.Content>
              <Item.Header as='a'>Name</Item.Header>
              <Item.Description>
                <p>Gender: </p>
                <p>Location: </p>
                <p>description of the room</p>
              </Item.Description>
              <Item.Extra>
                <p>Link to the profile</p>
              </Item.Extra>
            </Item.Content>
          </Item>
        </Item.Group>
      </Container>
    );
  }
}

// Require an array of Stuff documents in the props.
FindRoommate2.propTypes = {
  stuffs: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Stuffs.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents
  const stuffs = Stuffs.collection.find({}).fetch();
  return {
    stuffs,
    ready,
  };
})(FindRoommate2);
