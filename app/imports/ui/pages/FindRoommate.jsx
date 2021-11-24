import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Item, Header, Loader, Input, Grid, Dropdown, Button } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Requests } from '../../api/social/Requests';
import Request from '../components/Request';

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

      <div className="white-theme find-roommate">
        <Container>
          <Header as="h2" textAlign="center">Find Roommate</Header>
          <Grid columns={3}>
            <Grid.Column>
              <Dropdown text='Sort by...(Major)'>
                <Dropdown.Menu>
                  <Dropdown.Item text='ICS'/>
                  <Dropdown.Item text='Non-ICS'/>
                </Dropdown.Menu>
              </Dropdown>
            </Grid.Column>
            <Grid.Column>
              <Dropdown text='Sort by...(Gender)'>
                <Dropdown.Menu>
                  <Dropdown.Item text='Male'/>
                  <Dropdown.Item text='Female'/>
                </Dropdown.Menu>
              </Dropdown>
            </Grid.Column>
            <Grid.Column>
              <Dropdown text='Sort by...(Class Year)'>
                <Dropdown.Menu>
                  <Dropdown.Item text='Class of 2021'/>
                  <Dropdown.Item text='Class of 2022'/>
                  <Dropdown.Item text='Class of 2023'/>
                  <Dropdown.Item text='Class of 2024'/>
                  <Dropdown.Item text='Class of 2025'/>
                  <Dropdown.Item text='Class of 2026'/>
                </Dropdown.Menu>
              </Dropdown>
            </Grid.Column>
          </Grid>
          <Input fluid icon='search' placeholder='Search...'/>
          <Container>
            <Button floated="right" as={Link} to='/addrequest'>Add Request</Button>
          </Container>
          <Item.Group divided>
            {this.props.requests.map((request, index) => <Request key={index} request={request}/>)}
          </Item.Group>
        </Container>
      </div>
    );
  }
}

// Require an array of Stuff documents in the props.
FindRoommate.propTypes = {
  requests: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Requests.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents
  const requests = Requests.collection.find({}).fetch();
  return {
    requests,
    ready,
  };
})(FindRoommate);
