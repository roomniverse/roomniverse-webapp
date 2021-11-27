// import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';

/* eslint-disable no-console */

function createUser(username, avatar, gender, email, password, role) {
  console.log(`  Creating user ${username}.`);
  const userID = Accounts.createUser({
    username: username,
    gender: gender,
    email: email,
    password: password,
  });

  if (role === 'admin') {
    Roles.createRole(role, { unlessExists: true });
    Roles.addUsersToRoles(userID, 'admin');
  }
}

// // When running app for first time, pass a settings file to set up a default user account.
// if (Meteor.users.find().count() === 0) {
//   if (Meteor.settings.defaultAccounts) {
//     console.log('Creating the default user(s)');
//     Meteor.settings.defaultAccounts.map(({ username, email, password, role }) => createUser(username, email, password, role));
//   } else {
//     console.log('Cannot initialize the database!  Please invoke meteor with a settings file.');
//   }
// }
