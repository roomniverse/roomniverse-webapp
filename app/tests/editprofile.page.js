import { Selector } from 'testcafe';

class EditProfilePage {
  constructor() {
    this.pageId = '#editprofile-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.wait(5000).expect(this.pageSelector.exists).ok();
  }

  async submitProfile(testController, firstName, lastName, gradYear, avatar) {
    await testController.click('#editprofile-first-name').pressKey('ctrl+a delete');
    await testController.typeText('#editprofile-first-name', firstName);
    await testController.click('#editprofile-last-name').pressKey('ctrl+a delete');
    await testController.typeText('#editprofile-last-name', lastName);

    await testController.click('#editprofile-grad-year').pressKey('ctrl+a delete');
    await testController.typeText('#editprofile-grad-year', gradYear);

    await testController.click('#editprofile-avatar').pressKey('ctrl+a delete');
    await testController.typeText('#editprofile-avatar', avatar);
    await testController.click('#editprofile-submit');

  }
}

export const editprofilePage = new EditProfilePage();
