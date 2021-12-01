import { Selector } from 'testcafe';

class EditProfilePage {
  constructor() {
    this.pageId = '#editprofile-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.click('#editprofile-link');
    await testController.expect(this.pageSelector.exists).ok();
  }
}

export const editprofilePage = new EditProfilePage();
