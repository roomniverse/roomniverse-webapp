import { Selector } from 'testcafe';
import { navBar } from './navbar.component';
import { signupPage } from './signup.page';

class CreateProfilePage {
  constructor() {
    this.pageId = '#createprofile-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.wait(10000).expect(this.pageSelector.exists).ok();
  }

  /** Fills out and submits the form to signin, then checks to see that login was successful. */
  async createprofile(testController, username, password, firstname, lastname, gradyear, avatar) {
    await this.isDisplayed(testController);
    await signupPage.testController.typeText('#signup-form-email', username);
    await signupPage.testController.typeText('#signin-form-password', password);
    await signupPage.testController.click('#signup-form-submit');
    await navBar.isLoggedIn(testController, username);
    await testController.typeText('#createprofile-form-firstname', firstname);
    await testController.typeText('#createprofile-form-lastname', lastname);
    await testController.click('#createprofile-dropdown-gender');
    await testController.click('#createprofile-dropdown-gender-male');
    await testController.click('#createprofile-dropdown-major');
    await testController.click('#createprofile-dropdown-major-ics');
    await testController.typeText('#createprofile-form-gradyear', gradyear);
    await testController.typeText('#createprofile-form-avatar', avatar);
    await testController.click('#createprofile-form-submit');
  }
}

export const createprofilePage = new CreateProfilePage();
