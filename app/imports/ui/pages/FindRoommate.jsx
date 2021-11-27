import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Item, Header, Loader, Input, Grid, Dropdown } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Stuffs } from '../../api/stuff/Stuff';

// import { Link } from 'react-router-dom';

const majorOptions = [
  {
    key: 'ICS',
    text: 'Sort by ICS Major',
    value: 'ICS',
  },
  {
    key: 'Non-ICS',
    text: 'Sort by Non-ICS Major',
    value: 'Non-ICS',
  },
]

const genderOptions = [
  {
    key: 'Male',
    text: 'Sort by Male',
    value: 'Male',
  },
  {
    key: 'Female',
    text: 'Sort by Female',
    value: 'Sort by Female',
  },
  {
    key: 'Other',
    text: 'Sort by Other',
    value: 'Other',
  },
]

const yearOptions = [
  {
    key: '2021',
    text: 'Sort by Class of 2021',
    value: '2021',
  },
  {
    key: '2022',
    text: 'Sort by Class of 2022',
    value: '2022',
  },
  {
    key: '2023',
    text: 'Sort by Class of 2023',
    value: '2023',
  },
  {
    key: '2024',
    text: 'Sort by Class of 2024',
    value: '2024',
  },
]

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class FindRoommate extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <div className="white-theme find-roommate">
        <Container>
          <Header as="h2" textAlign="center">Find Roommate</Header>
          <Grid columns={3}>
            <Grid.Column>
              <Dropdown
                placeholder='Sort by Major'
                selection
                options={majorOptions}
              />
            </Grid.Column>
            <Grid.Column>
              <Dropdown
                placeholder='Sort by Gender'
                selection
                options={genderOptions}
              />
            </Grid.Column>
            <Grid.Column>
              <Dropdown
                placeholder='Sort by Class Year'
                selection
                options={yearOptions}
              />
            </Grid.Column>
          </Grid>
          <Input fluid icon='search' placeholder='Search...'/>
          <Item.Group divided>
            <Item>
              <Item.Image size='small' src='https://prepsec.org/wp-content/uploads/2017/09/unknown-person-icon-Image-from.png'/>
              <Item.Content>
                <Item.Header as='a' color='white'><p>Name</p></Item.Header>
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
                <Item.Header as='a'><p>Name</p></Item.Header>
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
                <Item.Header as='a'><p>Name</p></Item.Header>
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
      </div>
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
