import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { Posts } from '../../api/social/Posts';

/* eslint-disable no-console */

// Initialize the database with a default data document.
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.collection.insert(data);
}

// Initialize the StuffsCollection if empty.
if (Stuffs.collection.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.map(data => addData(data));
  }
}

// // Initialize the database with a default data document.
// function addPosts(data) {
//   console.log(`  Adding: ${data.name} (${data.username})`);
//   Posts.collection.insert(data);
// }

// Initialize the PostsCollection if empty.
if (Posts.collection.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default Posts.');
    Meteor.settings.defaultData.map(data => addData(data));
  }
}
