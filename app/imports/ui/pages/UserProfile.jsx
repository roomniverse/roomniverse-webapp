import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Grid, Menu, Loader, Input, Feed, Icon } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Stuffs } from '../../api/stuff/Stuff';
import User from '../components/User';
import { Users } from '../../api/user/User';

class UserProfile extends React.Component {

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    return (
      <div className="white-theme profile">
        <Container>
          <Grid columns={3}>
            <Grid.Column width={4}>
              <User user={this.props.users.find((user) => user.owner === Meteor.user().username)}/>
            </Grid.Column>
            <Grid.Column width={12}>
              <Menu pointing secondary borderless>
                <Menu.Item link>Posts</Menu.Item>
                <Menu.Item link>Roommate Inquires</Menu.Item>
                <Menu.Item link>User Information</Menu.Item>
              </Menu>
              <Input fluid placeholder="What's on your mind?" action='Post'/>
              <Feed>
                <Feed.Event>
                  <Feed.Label image='images/default-image.jpeg'/>
                  <Feed.Content>
                    <Feed.Summary>
                      <a>User Two</a> posted a new message
                      <Feed.Date>20 minutes ago</Feed.Date>
                    </Feed.Summary>
                    <Feed.Extra text>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. In et mi magna. Fusce
                      ornare venenatis arcu, vitae blandit elit eleifend et. Vivamus suscipit rhoncus
                      nibh sit amet auctor. Proin tempor feugiat ante, a viverra ex vestibulum at. Donec et arcu massa. Ut in felis ut dolor imperdiet tempus sed id nisi. Phasellus maximus sapien non enim rhoncus ultricies.
                    </Feed.Extra>
                    <Feed.Meta>
                      <Feed.Like>
                        <Icon name='like'/>5 Likes
                      </Feed.Like>
                    </Feed.Meta>
                  </Feed.Content>
                </Feed.Event>
                <Feed.Event>
                  <Feed.Label image='images/default-image.jpeg'/>
                  <Feed.Content>
                    <Feed.Summary>
                      <Feed.User>User One</Feed.User> added you as a friend
                      <Feed.Date>3 Hours Ago</Feed.Date>
                    </Feed.Summary>
                    <Feed.Meta>
                      <Feed.Like>
                        <Icon name="like"/>2 Likes
                      </Feed.Like>
                    </Feed.Meta>
                  </Feed.Content>
                </Feed.Event>
                <Feed.Event>
                  <Feed.Label image='images/default-image.jpeg'/>
                  <Feed.Content>
                    <Feed.Summary>
                      <Feed.User>User Three</Feed.User> added you as a friend
                      <Feed.Date>10 Hours Ago</Feed.Date>
                    </Feed.Summary>
                    <Feed.Meta>
                      <Feed.Like>
                        <Icon name="like"/>2 Likes
                      </Feed.Like>
                    </Feed.Meta>
                  </Feed.Content>
                </Feed.Event>
                <Feed.Event>
                  <Feed.Label image='images/default-image.jpeg'/>
                  <Feed.Content>
                    <Feed.Summary>
                      <a>User Two</a> added <a>2 new photos</a> of you
                      <Feed.Date>2 days ago</Feed.Date>
                    </Feed.Summary>
                    <Feed.Extra images>
                      <a>
                        <img src='https://react.semantic-ui.com/images/wireframe/image.png'/>
                      </a>
                      <a>
                        <img src='https://react.semantic-ui.com/images/wireframe/image.png'/>
                      </a>
                    </Feed.Extra>
                    <Feed.Meta>
                      <Feed.Like>
                        <Icon name='like'/>
                        41 Likes
                      </Feed.Like>
                    </Feed.Meta>
                  </Feed.Content>
                </Feed.Event>
                <Feed.Event>
                  <Feed.Label image='images/default-image.jpeg'/>
                  <Feed.Content>
                    <Feed.Summary>
                      <a>User Three</a> posted a new message
                      <Feed.Date>5 days ago</Feed.Date>
                    </Feed.Summary>
                    <Feed.Extra text>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. In et mi magna. Fusce
                      ornare venenatis arcu, vitae blandit elit eleifend et. Vivamus suscipit rhoncus
                      nibh sit amet auctor.
                    </Feed.Extra>
                    <Feed.Meta>
                      <Feed.Like>
                        <Icon name='like'/>10 Likes
                      </Feed.Like>
                    </Feed.Meta>
                  </Feed.Content>
                </Feed.Event>
              </Feed>
            </Grid.Column>
          </Grid>
        </Container>
      </div>
    );
  }
}

UserProfile.propTypes = {
  stuffs: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
  users: PropTypes.array.isRequired,
};

export default withTracker(() => {
  const subscription = Meteor.subscribe(Stuffs.userPublicationName) && Meteor.subscribe(Users.userPublicationName);
  const ready = subscription.ready();
  const stuffs = Stuffs.collection.find({}).fetch();
  const users = Users.collection.find({}).fetch();
  return {
    stuffs,
    users,
    ready,
  };
})(UserProfile);
