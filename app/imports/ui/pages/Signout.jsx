import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

/** After the user clicks the "Signout" link in the NavBar, log them out and display this page. */
export default class Signout extends React.Component {
  render() {
    Meteor.logout();
    return (
      <div className="grey-theme sign">
        <Header id="signout-page" as="h2" textAlign="center" inverted>
          <p>You are signed out.</p>
        </Header>
        <Button as={Link} to="/" content="Back" />
      </div>
    );
  }
}
