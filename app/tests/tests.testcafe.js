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
import { editpostPage } from './editpost.page';
/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'john@foo.com', password: 'changeme' };
const firstTime = { username: 'jane@foo.com', password: 'changeme', firstname: 'John', lastname: 'Foo', gradyear: '2024', avatar: 'https://mediamass.net/jdd/public/documents/celebrities/7874.jpg' };
const searchword = 'John';
const requestInfo = { location: 'Manoa', description: 'Looking for roommates' };
const editRequestInfo = { location: 'Makiki', description: 'Also looking for roommates' };
const addPostInfo = { text: 'Anyone wanna hangout with me at 4:30?', image: 'https://cdn.dribbble.com/users/491349/screenshots/10413494/hangout_01_4x.jpg' };
const editPostInfo = { text: "Let's eet at Ala Moana center by 5:00", image: 'https://wpcdn.us-east-1.vip.tn-cloud.net/www.hawaiimagazine.com/content/uploads/2020/12/IMG_1677.jpg' };
const editProfileInfo = { firstName: 'Joseph', lastName: 'Maxwell', gradYaer: '2023', avatar: 'https://petapixel.com/assets/uploads/2019/02/download-4-800x800.jpeg' };

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
  await userprofilePage.gotoEditProfile(testController);
  await editprofilePage.isDisplayed(testController);
  await editprofilePage.submitProfile(testController, editProfileInfo.firstName, editProfileInfo.lastName, editProfileInfo.gradYaer, editProfileInfo.avatar);
  await userprofilePage.isDisplayed(testController);

  await userprofilePage.gotoAddPost(testController);
  await addpostPage.isDisplayed(testController);
  await addpostPage.submitPost(testController, addPostInfo.text, addPostInfo.image);
  await navBar.gotoUserprofilePage(testController);
  await userprofilePage.isDisplayed(testController);

  await userprofilePage.gotoEditPost(testController);
  await editpostPage.submitPost(testController, editPostInfo.text, editPostInfo.image);
  await navBar.gotoUserprofilePage(testController);
  await userprofilePage.isDisplayed(testController);

  await userprofilePage.deletePost(testController);
  await navBar.gotoUserprofilePage(testController);
  await userprofilePage.isDisplayed(testController);
});

test('Test that hubpage, searchresultpage and addpostpage work', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await hubPage.isDisplayed(testController);
  await hubPage.gotoAddPost(testController);
  await addpostPage.isDisplayed(testController);
  await addpostPage.submitPost(testController, addPostInfo.text, addPostInfo.image);
  await hubPage.isDisplayed(testController);
  await hubPage.gotoEditPost(testController);
  await editpostPage.isDisplayed(testController);
  await editpostPage.submitPost(testController, editPostInfo.text, editPostInfo.image);
  await hubPage.isDisplayed(testController);
  await hubPage.deletePost(testController);
  await hubPage.isDisplayed(testController);

  await searchresultPage.typeSearchword(testController, searchword);
  await searchresultPage.isDisplayed(testController);
  await navBar.gotoHubPage(testController);
});

test('Test that signin, findroommate, addrequest, and editrequest showing up correctly', async (testController) => {
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
  await findRoommatePage.gotoEditRequest(testController);
  await editRequestPage.closeRequest(testController);
});
