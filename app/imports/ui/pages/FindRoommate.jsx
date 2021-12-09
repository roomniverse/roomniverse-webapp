import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Item, Header, Loader, Grid, Dropdown, Button } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Requests } from '../../api/social/Requests';
import Request from '../components/Request';
import { Users } from '../../api/user/User';

// import { Link } from 'react-router-dom';

const majorOptions = [
  {
    key: 'ICS/CENG',
    text: 'Sort by ICS/CENG',
    value: 'ICS/CENG',
  },
  {
    key: 'Other',
    text: 'Sort by Other',
    value: 'Other',
  },
  {
    key: '...',
    text: '...',
    value: null,
  },
];

const genderOptions = [
  {
    key: 'Male',
    text: 'Sort by Male',
    value: 'Male',
  },
  {
    key: 'Female',
    text: 'Sort by Female',
    value: 'Female',
  },
  {
    key: 'Other',
    text: 'Sort by Other',
    value: 'Other',
  },
  {
    key: '...',
    text: '...',
    value: null,
  },
];

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
  {
    key: '...',
    text: '...',
    value: null,
  },
];

const linkStyle = {
  color: 'white',
};

const marginTop = {
  marginTop: '1rem',
};

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class FindRoommate extends React.Component {
  state = { genderValue: null, yearValue: null, majorValue: null }

  genderHandleChange = (e, { value }) => this.setState({ genderValue: value })

  majorHandleChange = (e, { value }) => this.setState({ majorValue: value })

  yearHandleChange = (e, { value }) => this.setState({ yearValue: value })

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    const { genderValue, majorValue, yearValue } = this.state;
    // const { yearValue } = this.yearState;
    // const { majorValue } = this.majorState;

    let mapData = this.props.requests;
    switch (true) {
    case (genderValue === null && yearValue != null && majorValue != null):
      mapData = mapData.filter((request) => request.gradYear === yearValue).filter((request) => request.major === majorValue);
      break;
    case (genderValue != null && yearValue === null && majorValue != null):
      mapData = mapData.filter((request) => request.gender === genderValue).filter((request) => request.major === majorValue);
      break;
    case (genderValue != null && yearValue != null && majorValue === null):
      mapData = mapData.filter((request) => request.gender === genderValue).filter((request) => request.gradYear === yearValue);
      break;
    case (genderValue === null && yearValue === null && majorValue != null):
      mapData = mapData.filter((request) => request.major === majorValue);
      break;
    case (genderValue === null && yearValue != null && majorValue === null):
      mapData = mapData.filter((request) => request.gradYear === yearValue);
      break;
    case (genderValue != null && yearValue === null && majorValue === null):
      mapData = mapData.filter((request) => request.gender === genderValue);
      break;
    case (genderValue != null && yearValue != null && majorValue != null):
      mapData = mapData.filter((request) => request.gender === genderValue).filter((request) => request.gradYear === yearValue).filter((request) => request.major === majorValue);
      break;
    default:
      break;
    }
    return (
      <div id="find-roommate-page" className="white-theme page-padding">
        <Container>
          <Header as="h2" textAlign="center">Find Roommate</Header>
          <Grid columns={3}>
            <Grid.Column>
              <Dropdown
                onChange={this.majorHandleChange}
                placeholder='Sort by Major'
                selection
                options={majorOptions}
                value={majorValue}
              />
            </Grid.Column>
            <Grid.Column>
              <Dropdown
                onChange={this.genderHandleChange}
                placeholder='Sort by Gender'
                selection
                options={genderOptions}
                value={genderValue}
              />
            </Grid.Column>
            <Grid.Column>
              <Dropdown
                onChange={this.yearHandleChange}
                placeholder='Sort by Class Year'
                selection
                options={yearOptions}
                value={yearValue}
              />
            </Grid.Column>
          </Grid>
          <Button primary floated='right' style={marginTop}>
            <Link
              id="findroommate-addrequest"
              style={linkStyle}
              to={`/addrequest/${Meteor.userId()}`}
            >Add Request</Link>
          </Button>
          <Item.Group divided>
            {(mapData.length === 0) ?
              <Header as='h1' textAlign='center'> No roommates found </Header> :
              mapData.map((request, index) => <Request key={index} request={request}/>)}
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
  const subscription = Meteor.subscribe(Requests.userPublicationName) && Meteor.subscribe(Users.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents
  const requests = Requests.collection.find({}).fetch();
  return {
    requests,
    ready,
  };
})(FindRoommate);
