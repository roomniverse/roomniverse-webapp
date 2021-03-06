import { Meteor } from 'meteor/meteor';
import { Posts } from '../../api/social/Posts';
import { Users } from '../../api/user/User';
import { Requests } from '../../api/social/Requests';

// User-level publication.
// If logged in, then publish documents owned by this user. Otherwise publish nothing.

Meteor.publish(Posts.userPublicationName, () => Posts.collection.find());

Meteor.publish(Requests.userPublicationName, () => Requests.collection.find());

Meteor.publish(Users.userPublicationName, () => Users.collection.find());

// Admin-level publication.
// If logged in and with admin role, then publish all documents from all users. Otherwise publish nothing.
// Not implemented.

// alanning:roles publication
// Recommended code to publish roles for each user.
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});
