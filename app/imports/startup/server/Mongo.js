import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { Posts } from '../../api/social/Posts';
import { Requests } from '../../api/social/Requests';

/* eslint-disable no-console */

// Initialize the database with a default data document.
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.collection.insert(data);
}

// Initialize the database with a default posts document.
function addPosts(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Posts.collection.insert(data);
}

// Initialize the database with a default requests document.
function addRequests(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Requests.collection.insert(data);
}

// Initialize the StuffsCollection if empty.
if (Stuffs.collection.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.map(data => addData(data));
  }
}

// // Initialize the database with a default data document.
// function addPostsData(data) {
//   console.log(`  Adding: ${data.name} (${data.owner})`);
//   Posts.collection.insert(data);
// }

// Initialize the PostsCollection if empty.
if (Posts.collection.find().count() === 0) {
  if (Meteor.settings.defaultPosts) {
    console.log('Creating default data.');
    Meteor.settings.defaultPosts.map(data => addPosts(data));
  }
}

// Initialize the RequestsCollection if empty.
if (Requests.collection.find().count() === 0) {
  if (Meteor.settings.defaultRequests) {
    console.log('Creating default requests data.');
    Meteor.settings.defaultRequests.map(data => addRequests(data));
  }
}
