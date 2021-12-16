import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { signupPage } from './signup.page';
import { navBar } from './navbar.component';
import { createprofilePage } from './createprofile.page';
import { userprofilePage } from './userprofile.page';
import { editprofilePage } from './editprofile.page';
import { findRoommatePage } from './findroommate.page';
import { addRequestPage } from './addrequest.page';
import { editRequestPage } from './editrequest.page';
import { hubPage } from './hub.page';
import { addpostPage } from './addpost.page';
import { searchresultPage } from './searchresult.page';
/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'john@foo.com', password: 'changeme' };
const firstTime = { username: 'jane@foo.com', password: 'changeme', firstname: 'John', lastname: 'Foo', gradyear: '2024', avatar: 'https://mediamass.net/jdd/public/documents/celebrities/7874.jpg' };
const searchword = 'JohnCena';
const requestInfo = { location: 'Manoa', description: 'Looking for roommates' };
const editRequestInfo = { location: 'Makiki', description: 'Also looking for roommates' };

fixture('meteor-application-template-react localhost test with default db')
  .page('http://localhost:3000');

test('Test that landing page shows up', async (testController) => {
  await landingPage.isDisplayed(testController);
});

test('Test that signin and signout work', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test that signup and createprofilepage work', async (testController) => {
  await navBar.gotoSignupPage(testController);
  await signupPage.signupUser(testController, firstTime.username, firstTime.password);
  await createprofilePage.isDisplayed(testController);
  // await createprofilePage.createprofile(testController, firstTime.username, firstTime.password, firstTime.firstname, firstTime.lastname, firstTime.gradyear, firstTime.avatar);
});

test('Test that editprofilepage and userprofilepage work', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.gotoUserprofilePage(testController);
  await userprofilePage.isDisplayed(testController);
  await editprofilePage.isDisplayed(testController);
});

test('Test that hubpage, searchresultpage and addpostpage work', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await hubPage.isDisplayed(testController);
  await searchresultPage.typeSearchword(testController, searchword);
  await searchresultPage.isDisplayed(testController);
  await navBar.gotoHubPage(testController);
  await addpostPage.isDisplayed(testController);
});

test.only('Test that signin, findroommate, addrequest, and editrequest showing up correctly', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoFindRoommatePage(testController);
  await findRoommatePage.isDisplayed(testController);
  await findRoommatePage.gotoAddRequest(testController);
  await addRequestPage.isDisplayed(testController);
  await addRequestPage.submitRequest(testController, requestInfo.location, requestInfo.description);
  await findRoommatePage.gotoEditRequest(testController);
  await editRequestPage.isDisplayed(testController);
  await editRequestPage.submitEditRequest(testController, editRequestInfo.location, editRequestInfo.description);
  await navBar.gotoFindRoommatePage(testController);
  // await findRoommatePage.gotoEditRequest(testController);
  // await editRequestPage.isDisplayed(testController);
});
