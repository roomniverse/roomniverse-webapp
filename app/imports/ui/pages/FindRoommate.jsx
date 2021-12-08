import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Item, Header, Loader, Input, Grid, Dropdown, Button, Segment } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Requests } from '../../api/social/Requests';
import Request from '../components/Request';

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
    const fData = this.props.requests.filter((request) => request.gender === 'Male');
    console.log(fData);
    return (
      <div id="find-roommate-page" className="white-theme page-padding">
        <Container>
          <Header as="h2" textAlign="center">Find Roommate</Header>
          <Grid columns={4}>
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
            <Grid.Column>
              <Segment secondary>
                <pre>Current gender value: {genderValue}</pre>
                <pre>Current major value: {majorValue}</pre>
                <pre>Current year value: {yearValue}</pre>
              </Segment>
            </Grid.Column>
          </Grid>
          <Input fluid icon='search' placeholder='Search...' style={marginTop} />
          <Button primary floated='right' style={marginTop}>
            <Link id="findroommate-addrequest" style={linkStyle} to={`/addrequest/${Meteor.userId()}`}>Add Request</Link>
          </Button>
          <Item.Group divided>
            {(genderValue == null) ? this.props.requests.map((request, index) => <Request key={index} request={request}/>) : this.props.requests.filter((request) => request.gender === genderValue).map((request, index) => <Request key={index} request={request}/>)}
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
