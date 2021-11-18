import React from 'react';
import { Container } from 'semantic-ui-react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {

    return (
      <Container className="footer-container" textAlign="center">
        <hr/>
        Department of Information and Computer Sciences <br/>
        University of Hawaii<br/>
        Honolulu, HI 96822 <br/>
        <a href="http://ics-software-engineering.github.io/meteor-application-template-react">Template Home Page</a>
      </Container>
=======
    return (
      <Container className="footer-container" textAlign="center">
        <hr/>
        Department of Information and Computer Sciences <br/>
        University of Hawaii<br/>
        Honolulu, HI 96822 <br/>
        <a href="http://ics-software-engineering.github.io/meteor-application-template-react">Template Home Page</a>
      </Container>

    );
  }
}

export default Footer;
