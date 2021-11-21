import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Container, Form, Grid, Header, Message, Segment, Radio } from 'semantic-ui-react';
import { Accounts } from 'meteor/accounts-base';

/**
 * Signup component is similar to signin component, but we create a new user instead.
 */
class Signup extends React.Component {
  /* Initialize state fields. */
  constructor(props) {
    super(props);
    this.state = { username: '', gender: '', email: '', password: '', error: '', redirectToReferer: false };
  }

  /* Update the form controls each time the user interacts with them. */
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  radioHandle = (e, { value }) => {
    this.handleChange(e, { name: 'gender', value: value });
  }

  /* Handle Signup submission. Create user account and a profile entry, then redirect to the home page. */
  submit = () => {
    const { username, email, password } = this.state;
    const avatar = 'images/default-image.jpeg';
    Accounts.createUser({ username, avatar, email, password }, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        this.setState({ error: '', redirectToReferer: true });
      }
    });
  }

  /* Display the signup form. Redirect to add page after successful registration and login. */
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/hub' } };
    // if correct authentication, redirect to from: page instead of signup screen
    if (this.state.redirectToReferer) {
      return <Redirect to={from}/>;
    }
    return (
      <div className="grey-theme sign">
        <Container id="signup-page">
          <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
            <Grid.Column>
              <Header as="h2" textAlign="center" style={{ color: 'white' }}>
                Register your account
              </Header>
              <Form onSubmit={this.submit}>
                <Segment stacked>
                  <Form.Input
                    label="Full Name"
                    id="signup-form-name"
                    icon="user"
                    iconPosition="left"
                    name="username"
                    type="username"
                    placeholder="First Last"
                    onChange={this.handleChange}
                    required
                  />
                  <Form.Input
                    label="Email"
                    id="signup-form-email"
                    icon="envelope outline"
                    iconPosition="left"
                    name="email"
                    type="email"
                    placeholder="E-mail address"
                    onChange={this.handleChange}
                    required
                  />
                  <Form.Group label="Gender" inline required>
                    <Form.Field>
                      <Radio
                        label="Male"
                        name="gender"
                        value="Male"
                        checked={this.state.value === 'Male'}
                        onChange={this.radioHandle}
                      />
                    </Form.Field>
                    <Form.Field>
                      <Radio
                        label="Female"
                        name="gender"
                        value="Female"
                        checked={this.state.value === 'Female'}
                        onChange={this.radioHandle}
                      />
                    </Form.Field>
                    <Form.Field control={Radio}>
                      <label>Other</label>
                      <input type="text" id="gender" name="gender"/>
                    </Form.Field>
                  </Form.Group>
                  <Form.Input
                    label="Password"
                    id="signup-form-password"
                    icon="lock"
                    iconPosition="left"
                    name="password"
                    placeholder="Password"
                    type="password"
                    onChange={this.handleChange}
                    required
                  />
                  <Form.Button id="signup-form-submit" content="Submit"/>
                </Segment>
              </Form>
              <Message>
                Already have an account? Login <Link to="/signin">here</Link>
              </Message>
              {this.state.error === '' ? (
                ''
              ) : (
                <Message
                  error
                  header="Registration was not successful"
                  content={this.state.error}
                />
              )}
            </Grid.Column>
          </Grid>
        </Container>
      </div>
    );
  }
}

/* Ensure that the React Router location object is available in case we need to redirect. */
Signup.propTypes = {
  location: PropTypes.object,
};

export default Signup;
