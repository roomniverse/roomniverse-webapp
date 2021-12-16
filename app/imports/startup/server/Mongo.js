import { Meteor } from 'meteor/meteor';
import { Posts } from '../../api/social/Posts';
import { Users } from '../../api/user/User';
import { Requests } from '../../api/social/Requests';

/* eslint-disable no-console */

// Initialize the database with a default posts document.
function addData(data) {
  console.log(`  Adding: Data for (${data.owner})`);
  Posts.collection.insert(data);
}

// Initialize the database with a default profiles document.
function addProfile(data) {
  console.log(`  Adding Profile: ${data.lastName} (${data.owner})`);
  Users.collection.insert(data);
}

// Initialize the database with a default requests document.
function addRequests(data) {
  console.log(`  Adding Request: ${data.firstName} (${data.owner})`);
  Requests.collection.insert(data);
}

// Initialize the PostsCollection if empty.
if (Posts.collection.find().count() === 0) {
  if (Meteor.settings.defaultPosts) {
    console.log('Creating default data.');
    Meteor.settings.defaultPosts.map(data => addData(data));
  }
}

// Initialize the UsersCollection if empty.
if (Users.collection.find().count() === 0) {
  if (Meteor.settings.defaultProfileData) {
    console.log('Creating default profile data.');
    Meteor.settings.defaultProfileData.map(data => addProfile(data));
  }
}

// Initialize the RequestsCollection if empty.
if (Requests.collection.find().count() === 0) {
  if (Meteor.settings.defaultRequests) {
    console.log('Creating default requests data.');
    Meteor.settings.defaultRequests.map(data => addRequests(data));
  }
}
