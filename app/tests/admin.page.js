import { Selector } from 'testcafe';

class AdminPage {
  constructor() {
    this.pageId = '#admin-three-lists';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.wait(10000).expect(this.pageSelector.exists).ok();
  }

  async gotoEditRequest(testController) {
    await testController.click('#findroommate-editrequest');
  }
}

export const adminPage = new AdminPage();
