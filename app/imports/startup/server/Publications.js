import { Meteor } from 'meteor/meteor';
// import { Roles } from 'meteor/alanning:roles';
import { Posts } from '../../api/social/Posts';
import { Users } from '../../api/user/User';
import { Requests } from '../../api/social/Requests';

// User-level publication.
// If logged in, then publish documents owned by this user. Otherwise publish nothing.

Meteor.publish(Posts.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Posts.collection.find({ owner: username });
  }
  return this.ready();
});

Meteor.publish(Users.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Users.collection.find({ owner: username });
  }
  return this.ready();
});

Meteor.publish(Requests.userPublicationName, () => Requests.collection.find());

// Admin-level publication.
// If logged in and with admin role, then publish all documents from all users. Otherwise publish nothing.

/* Meteor.publish(Posts.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Posts.collection.find();
  }
  return this.ready();
}); */

// alanning:roles publication
// Recommended code to publish roles for each user.
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});
