import React from 'react';
import { Grid, Icon, Header, Image } from 'semantic-ui-react';

const logo = 'https://i.ibb.co/ZmGqSPQ/logo-transparent.png';
/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
      <div className='landing'>
        <Grid centered stackable columns={3} container>

          <Grid.Column textAlign='center'>
            <Image src={logo} alt="Roomniverse Logo" size="small" centered/>
            <Header as='h1' inverted>Meet New People</Header>
            <Header as='h3' inverted>A social hub created just for students in the UH Manoa dorms!</Header>
          </Grid.Column>

          <Grid.Column textAlign='center'>
            <Icon name='comments' size='huge'/>
            <Header as='h1' inverted>Status Updates</Header>
            <Header as='h3' inverted>A collection of status updates from students through the UH Manoa dorms!</Header>
          </Grid.Column>

          <Grid.Column textAlign='center'>
            <Icon name='user plus' size='huge'/>
            <Header as='h1' inverted>Find New Roommates</Header>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            <Header as='h3' inverted>Use Roomniverse's Advanced Roommate finder, to find people who will best match with you!</Header>
          </Grid.Column>

        </Grid>
      </div>
    );
  }
}

export default Landing;
