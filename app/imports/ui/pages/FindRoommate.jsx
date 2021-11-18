import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Card, Header, Loader, Image, Input } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Stuffs } from '../../api/stuff/Stuff';

// import { Link } from 'react-router-dom';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class FindRoommate extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <Container>
        <Header as="h2" textAlign="center">Find Roommates</Header>

        <Input fluid icon='search' placeholder='Search...' />

        <Card.Group>
          <Card centered>
            <Image src={'https://prepsec.org/wp-content/uploads/2017/09/unknown-person-icon-Image-from.png'}/>
            <Card.Content>
              <Card.Header>First Name Last Name</Card.Header>
              <Card.Meta>Address or location of the room</Card.Meta>
              <Card.Description>
                Description about the room
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              Link to the Profile
            </Card.Content>
          </Card>

          <Card centered>
            <Image src={'https://prepsec.org/wp-content/uploads/2017/09/unknown-person-icon-Image-from.png'}/>
            <Card.Content>
              <Card.Header>First Name Last Name</Card.Header>
              <Card.Meta>Address or location of the room</Card.Meta>
              <Card.Description>
                Description about the room
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              Link to the Profile
            </Card.Content>
          </Card>

          <Card centered>
            <Image src={'https://prepsec.org/wp-content/uploads/2017/09/unknown-person-icon-Image-from.png'}/>
            <Card.Content>
              <Card.Header>First Name Last Name</Card.Header>
              <Card.Meta>Address or location of the room</Card.Meta>
              <Card.Description>
                Description about the room
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              Link to the Profile
            </Card.Content>
          </Card>

          <Card centered>
            <Image src={'https://prepsec.org/wp-content/uploads/2017/09/unknown-person-icon-Image-from.png'}/>
            <Card.Content>
              <Card.Header>First Name Last Name</Card.Header>
              <Card.Meta>Address or location of the room</Card.Meta>
              <Card.Description>
                Description about the room
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              Link to the Profile
            </Card.Content>
          </Card>
        </Card.Group>
      </Container>
    );
  }
}

// Require an array of Stuff documents in the props.
FindRoommate.propTypes = {
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
})(FindRoommate);
